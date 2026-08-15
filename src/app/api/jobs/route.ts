import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        region: true,
        categories: true,
      },
      orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(jobs.map(formatJob));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Elanlar yüklənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
