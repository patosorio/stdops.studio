import "server-only";
import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_EXPIRES_MS = 5 * 24 * 60 * 60 * 1000;
export const ADMIN_SESSION_MAX_AGE_SECONDS = 5 * 24 * 60 * 60;

export function allowedAdminEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);
}

export async function createAdminSessionCookie(idToken: string): Promise<string> {
  const auth = getFirebaseAdminAuth();
  const decoded = await auth.verifyIdToken(idToken);
  const email = decoded.email?.trim().toLowerCase();
  if (!email || !allowedAdminEmails().includes(email)) {
    throw new Error("unauthorized");
  }
  return auth.createSessionCookie(idToken, { expiresIn: ADMIN_SESSION_EXPIRES_MS });
}

export async function getAdminSession(): Promise<DecodedIdToken | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!session) return null;
    return await getFirebaseAdminAuth().verifySessionCookie(session, true);
  } catch {
    return null;
  }
}
