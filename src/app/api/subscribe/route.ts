import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const subscribeSchema = z.object({
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = subscribeSchema.parse(body);

    const existing = await prisma.subscriber.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Bu e-poçt ünvanı artıq abunədir" },
        { status: 409 }
      );
    }

    await prisma.subscriber.create({
      data: { email: validated.email },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Düzgün e-poçt ünvanı daxil edin" },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Abunə olarkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
