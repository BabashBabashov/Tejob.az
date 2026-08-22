import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { handleAuthError } from "@/lib/route-helpers";

const ALLOWED_MIMES = ["image/jpeg", "image/png"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

// Magic bytes for validation
const MAGIC_BYTES: Record<string, number[]> = {
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47],
};

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Fayl seçilməyib" }, { status: 400 });
    }

    // Check MIME type
    if (!ALLOWED_MIMES.includes(file.type)) {
      return NextResponse.json(
        { error: "Yalnız JPG və PNG faylları icazə verilir" },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fayl ölçüsü 2 MB-dan çox ola bilməz" },
        { status: 400 }
      );
    }

    // Read first bytes to validate magic bytes
    const bytes = await file.arrayBuffer();
    const header = new Uint8Array(bytes.slice(0, 8));
    const expectedMagic = MAGIC_BYTES[file.type];

    if (expectedMagic) {
      const valid = expectedMagic.every((byte, i) => header[i] === byte);
      if (!valid) {
        return NextResponse.json(
          { error: "Fayl məzmunu düzgün formatda deyil" },
          { status: 400 }
        );
      }
    }

    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({ url: dataUrl });
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error(error);
    return NextResponse.json({ error: "Upload xətası" }, { status: 500 });
  }
}
