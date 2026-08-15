import { NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getAuthAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    id: admin.id,
    username: admin.username,
  });
}
