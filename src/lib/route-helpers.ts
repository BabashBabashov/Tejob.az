import { NextResponse } from "next/server";
import { UnauthorizedError } from "./errors";

export function handleAuthError(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
