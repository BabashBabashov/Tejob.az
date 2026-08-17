import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return NextResponse.json({ error: "Elan tapılmadı" }, { status: 404 });
    }

    const updated = await prisma.job.update({
      where: { id },
      data: { showViews: !job.showViews },
    });

    return NextResponse.json({ showViews: updated.showViews, views: updated.views });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Baxış sayı dəyişilərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
