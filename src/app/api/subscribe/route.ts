import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const subscribeSchema = z.object({
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin"),
});

// Simple in-memory rate limit
const subscribeCounts = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "127.0.0.1";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();

    // Rate limit check
    const timestamps = subscribeCounts.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW);

    if (recent.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Çox sorğu. Bir az gözləyin." },
        { status: 429 }
      );
    }

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

    recent.push(now);
    subscribeCounts.set(ip, recent);

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
