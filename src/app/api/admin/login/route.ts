import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, verifyPassword, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "İstifadəçi adı və şifrə tələb olunur" },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!admin || !(await verifyPassword(password, admin.password))) {
      return NextResponse.json(
        { error: "Yanlış istifadəçi adı və ya şifrə" },
        { status: 401 }
      );
    }

    const token = signToken({ id: admin.id, username: admin.username });
    await setAuthCookie(token);

    return NextResponse.json({ success: true, username: admin.username });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Daxil olarkən xəta baş verdi" },
      { status: 500 }
    );
  }
}
