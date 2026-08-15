import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Regionlar yüklənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
