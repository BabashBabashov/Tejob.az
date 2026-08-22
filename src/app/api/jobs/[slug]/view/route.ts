import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple in-memory rate limit: IP → timestamps
const viewCounts = new Map<string, number[]>();
const RATE_LIMIT = 5; // max 5 views per hour per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, timestamps] of viewCounts) {
    const valid = timestamps.filter((t) => now - t < RATE_WINDOW);
    if (valid.length === 0) viewCounts.delete(ip);
    else viewCounts.set(ip, valid);
  }
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "127.0.0.1";
}

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();

    cleanupOldEntries();

    const timestamps = viewCounts.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW);

    if (recent.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Çox sorğu. Bir az gözləyin." },
        { status: 429 }
      );
    }

    recent.push(now);
    viewCounts.set(ip, recent);

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
