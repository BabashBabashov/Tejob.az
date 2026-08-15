import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

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

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const job = await prisma.job.findUnique({
      where: { slug },
      include: {
        company: true,
        region: true,
        categories: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Elan tapılmadı" }, { status: 404 });
    }

    return NextResponse.json(formatJob(job));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Elan yüklənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
