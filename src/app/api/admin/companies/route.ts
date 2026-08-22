import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { handleAuthError } from "@/lib/route-helpers";

const companySchema = z.object({
  name: z.string().min(2),
  sector: z.string().min(2),
  description: z.string().min(10).max(2000),
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
      { error: "Şirkət əlavə edilərkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
