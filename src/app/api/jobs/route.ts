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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const idsParam = searchParams.get("ids");
    const companySlug = searchParams.get("company") || undefined;
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const now = new Date();
    const where: any = {
      OR: [
        { expiresAt: null },
        { expiresAt: { gte: now } },
      ],
    };

    if (idsParam) {
      where.id = { in: idsParam.split(",") };
    }
    if (companySlug) {
      where.company = { slug: companySlug };
    }

    const skip = offset || (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          company: true,
          region: true,
          position: true,
          sector: true,
          categories: true,
        },
        orderBy: [{ isPremium: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({
      jobs: jobs.map((job: any) => ({
        ...formatJob(job),
        isPremium: job.isPremium && job.premiumExpiresAt && new Date(job.premiumExpiresAt) > now,
      })),
      total,
      page,
      hasMore: skip + jobs.length < total,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Elanlar yüklənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
