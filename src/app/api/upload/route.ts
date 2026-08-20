import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB for base64

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Fayl seçilməyib" }, { status: 400 });
    }

    const originalName = file.name.toLowerCase();
    const ext = originalName.split(".").pop();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: "Yalnız JPG, JPEG və PNG faylları icazə verilir" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fayl ölçüsü 2 MB-dan çox ola bilməz" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const mimeType = file.type || (ext === "png" ? "image/png" : "image/jpeg");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({ url: dataUrl });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Upload xətası" }, { status: 500 });
  }
}
