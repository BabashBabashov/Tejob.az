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
    const companySlug = searchParams.get("company") || undefined;

    const where: any = {};
    if (ids) {
      where.id = { in: ids };
    }
    if (companySlug) {
      where.company = { slug: companySlug };
    }

    const jobs = await prisma.job.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
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
