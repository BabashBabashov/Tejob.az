import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Şirkətlər yüklənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
