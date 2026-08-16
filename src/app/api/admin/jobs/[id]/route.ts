import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

const jobUpdateSchema = z.object({
  title: z.string().min(3),
  companyId: z.string(),
  regionId: z.string(),
  categoryIds: z.array(z.string()).min(1),
  description: z.string().min(10),
  requirements: z.array(z.string()).min(1),
  salary: z.string().optional(),
  workType: z.string().optional(),
  deadline: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  isPremium: z.boolean().default(false),
  showViews: z.boolean().default(false),
  views: z.number().int().default(0),
});

function formatJob(job: any) {
  return {
    ...job,
    requirements:
      typeof job.requirements === "string"
        ? JSON.parse(job.requirements)
        : job.requirements,
    createdAt: job.createdAt.toISOString(),
  };
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
      include: { company: true, region: true, categories: true },
    });

    if (!job) {
      return NextResponse.json({ error: "Elan tapılmadı" }, { status: 404 });
    }

    return NextResponse.json(formatJob(job));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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

    const job = await prisma.job.update({
      where: { id },
      data: {
        slug,
        title: validated.title,
        description: validated.description,
        requirements: JSON.stringify(validated.requirements),
        salary: validated.salary || null,
        workType: validated.workType || null,
        deadline: validated.deadline || null,
        contactPhone: validated.contactPhone || null,
        contactEmail: validated.contactEmail || null,
        isPremium: validated.isPremium,
        showViews: validated.showViews,
        views: validated.views,
        company: { connect: { id: validated.companyId } },
        region: { connect: { id: validated.regionId } },
        categories: {
          set: validated.categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        company: true,
        region: true,
        categories: true,
      },
    });

    return NextResponse.json(formatJob(job));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Elan silinərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
