import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

const companySchema = z.object({
  name: z.string().min(2),
  sector: z.string().min(2),
  description: z.string().min(10),
  logo: z.string().default("/logo.png"),
  banner: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const validated = companySchema.parse(body);

    const baseSlug = slugify(validated.name);
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.company.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const company = await prisma.company.create({
      data: {
        id: `comp_${Date.now()}`,
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

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validasiya xətası", details: error.issues },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      {
        error: "Şirkət əlavə edilərkən xəta baş verdi",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
