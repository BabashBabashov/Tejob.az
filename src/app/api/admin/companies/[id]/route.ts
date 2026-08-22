import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { handleAuthError } from "@/lib/route-helpers";

const companyUpdateSchema = z.object({
  name: z.string().min(2),
  sector: z.string().min(2),
  description: z.string().min(10).max(2000),
  logo: z.string().default("/logo.png"),
  banner: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Şirkət tapılmadı" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error(error);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;
    const body = await request.json();
    const validated = companyUpdateSchema.parse(body);

    const existing = await prisma.company.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Şirkət tapılmadı" }, { status: 404 });
    }

    let slug = existing.slug;
    if (validated.name !== existing.name) {
      const baseSlug = slugify(validated.name);
      slug = baseSlug;
      let counter = 1;
      while (
        await prisma.company.findFirst({
          where: { slug, id: { not: id } },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const company = await prisma.company.update({
      where: { id },
      data: {
        slug,
        name: validated.name,
        sector: validated.sector,
        description: validated.description,
        logo: validated.logo,
        banner: validated.banner || null,
        email: validated.email || null,
        phone: validated.phone || null,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validasiya xətası", details: error.issues },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Şirkət yenilənərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth();
    const { id } = await params;

    // Delete all jobs associated with this company first
    await prisma.job.deleteMany({
      where: { companyId: id },
    });

    await prisma.company.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error(error);
    return NextResponse.json(
      { error: "Şirkət silinərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
