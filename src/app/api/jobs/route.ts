import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatJob(job: any) {
  return {
    ...job,
    createdAt: job.createdAt.toISOString(),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");
    const ids = idsParam ? idsParam.split(",") : undefined;

    const jobs = await prisma.job.findMany({
      where: ids ? { id: { in: ids } } : undefined,
      include: {
        company: true,
        region: true,
        position: true,
        sector: true,
        categories: true,
      },
      orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ jobs: jobs.map(formatJob) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Elanlar yüklənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
