import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

const jobSchema = z.object({
  title: z.string().min(3),
  companyId: z.string(),
  regionId: z.string(),
  sectorName: z.string().min(1),
  categoryIds: z.array(z.string()).optional(),
  description: z.string().min(10),
  salary: z.string().optional(),
  workType: z.string().optional(),
  deadline: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  isPremium: z.boolean().default(false),
  isInternship: z.boolean().default(false),
  isWomenOnly: z.boolean().default(false),
  showViews: z.boolean().default(true),
  views: z.number().int().default(0),
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

export async function GET() {
  try {
    await requireAuth();
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        region: true,
        position: true,
        sector: true,
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs.map(formatJob));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const validated = jobSchema.parse(body);

    const baseSlug = slugify(validated.title);
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.job.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const [position, sector] = await Promise.all([
      findOrCreatePosition(validated.title),
      findOrCreateSector(validated.sectorName),
    ]);

    const job = await prisma.job.create({
      data: {
        id: `job_${Date.now()}`,
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
        views: validated.views,
        company: { connect: { id: validated.companyId } },
        region: { connect: { id: validated.regionId } },
        position: { connect: { id: position.id } },
        sector: { connect: { id: sector.id } },
        categories: {
          connect: (validated.categoryIds || []).map((id) => ({ id })),
        },
      },
      include: {
        company: true,
        region: true,
        position: true,
        sector: true,
        categories: true,
      },
    });

    return NextResponse.json(formatJob(job), { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => {
        const path = issue.path.join(".");
        switch (path) {
          case "title":
            return "Vəzifə adı ən azı 3 simvol olmalıdır";
          case "companyId":
            return "Şirkət seçilməlidir";
          case "regionId":
            return "Region seçilməlidir";
          case "sectorName":
            return "Sektor adı daxil edilməlidir";
          case "description":
            return "İş haqqında məlumat ən azı 10 simvol olmalıdır";
          case "contactEmail":
            return "Düzgün e-poçt ünvanı daxil edin";
          case "views":
            return "Baxış sayı düzgün formatda deyil";
          default:
            return issue.message;
        }
      });
      return NextResponse.json(
        { error: "Validasiya xətası", messages },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Elan əlavə edilərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
