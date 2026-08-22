import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { handleAuthError } from "@/lib/route-helpers";

const jobUpdateSchema = z.object({
  title: z.string().min(3),
  companyId: z.string(),
  regionId: z.string(),
  positionName: z.string().min(1),
  sectorName: z.string().min(1),
  categoryIds: z.array(z.string()).optional(),
  description: z.string().min(10).max(5000),
  salary: z.string().optional(),
  workType: z.string().optional(),
  deadline: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  isPremium: z.boolean().default(false),
  isInternship: z.boolean().default(false),
  isWomenOnly: z.boolean().default(false),
  showViews: z.boolean().default(true),
});

function formatJob(job: any) {
  return {
    ...job,
    createdAt: job.createdAt.toISOString(),
  };
}

async function findOrCreatePosition(name: string) {
  const slug = slugify(name);
  const existing = await prisma.position.findUnique({ where: { slug } });
  if (existing) return existing;
  return prisma.position.create({
    data: { id: `pos_${Date.now()}`, slug, name },
  });
}

async function findOrCreateSector(name: string) {
  const slug = slugify(name);
  const existing = await prisma.sector.findUnique({ where: { slug } });
  if (existing) return existing;
  return prisma.sector.create({
    data: { id: `sector_${Date.now()}`, slug, name },
  });
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: { company: true, region: true, position: true, sector: true, categories: true },
    });

    if (!job) {
      return NextResponse.json({ error: "Elan tapılmadı" }, { status: 404 });
    }

    return NextResponse.json(formatJob(job));
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error(error);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const validated = jobUpdateSchema.parse(body);

    const existing = await prisma.job.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Elan tapılmadı" }, { status: 404 });
    }

    let slug = existing.slug;
    if (validated.title !== existing.title) {
      const baseSlug = slugify(validated.title);
      slug = baseSlug;
      let counter = 1;
      while (
        await prisma.job.findFirst({
          where: { slug, id: { not: id } },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const [position, sector] = await Promise.all([
      findOrCreatePosition(validated.positionName),
      findOrCreateSector(validated.sectorName),
    ]);

    const updateData: any = {
      slug,
      title: validated.title,
      description: validated.description,
      salary: validated.salary || "Razılaşma yolu ilə",
      workType: validated.workType || null,
      deadline: validated.deadline || null,
      contactPhone: validated.contactPhone || null,
      contactEmail: validated.contactEmail || null,
      isPremium: validated.isPremium,
      isInternship: validated.isInternship,
      isWomenOnly: validated.isWomenOnly,
      showViews: validated.showViews,
      company: { connect: { id: validated.companyId } },
      region: { connect: { id: validated.regionId } },
      position: { connect: { id: position.id } },
      sector: { connect: { id: sector.id } },
      categories: {
        set: (validated.categoryIds || []).map((id) => ({ id })),
      },
    };

    const job = await prisma.job.update({
      where: { id },
      data: updateData,
      include: {
        company: true,
        region: true,
        position: true,
        sector: true,
        categories: true,
      },
    });

    return NextResponse.json(formatJob(job));
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validasiya xətası", details: error.issues },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Elan yenilənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;

    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error(error);
    return NextResponse.json(
      { error: "Elan silinərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}