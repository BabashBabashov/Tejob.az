import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase() || "";

    const positions = await prisma.position.findMany({
      where: q ? { name: { contains: q, mode: "insensitive" } } : undefined,
      orderBy: { name: "asc" },
      take: 10,
    });

    return NextResponse.json(positions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}