import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

const jobSchema = z.object({
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

export async function GET() {
  try {
    await requireAuth();
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        region: true,
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

    const job = await prisma.job.create({
      data: {
        id: `job_${Date.now()}`,
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
        views: validated.views,
        company: { connect: { id: validated.companyId } },
        region: { connect: { id: validated.regionId } },
        categories: {
          connect: validated.categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        company: true,
        region: true,
        categories: true,
      },
    });

    return NextResponse.json(formatJob(job), { status: 201 });
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
      { error: "Elan əlavə edilərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
