import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "tejob-secret";
const COOKIE_NAME = "tejob-admin-token";

export interface AdminTokenPayload {
  id: string;
  username: string;
}

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return compare(password, hashed);
}

export function signToken(payload: AdminTokenPayload) {
  return sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminTokenPayload {
  return verify(token, JWT_SECRET) as AdminTokenPayload;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const payload = verifyToken(token);
    const admin = await prisma.adminUser.findUnique({
      where: { id: payload.id },
    });
    return admin;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const admin = await getAuthAdmin();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
