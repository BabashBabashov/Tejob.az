import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const job = await prisma.job.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ views: job.views });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Baxış sayı artırılarkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
