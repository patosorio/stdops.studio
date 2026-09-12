import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionCookie,
} from "@/lib/admin/session";
import { MAX_ADMIN_SESSION_BODY_BYTES } from "@/lib/admin/parse-body";
import { contentLengthAllowed, isJsonContentType, readJsonBody } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function fail(): NextResponse {
  return NextResponse.json({ ok: false }, { status: 401, headers: noStore });
}

function ok(): NextResponse {
  return NextResponse.json({ ok: true }, { headers: noStore });
}

function idTokenFromBody(body: unknown): string | undefined {
  if (!body || typeof body !== "object" || Array.isArray(body)) return undefined;
  const token = (body as { idToken?: unknown }).idToken;
  if (typeof token !== "string" || token.trim() === "") return undefined;
  return token;
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!isJsonContentType(request) || !contentLengthAllowed(request, MAX_ADMIN_SESSION_BODY_BYTES)) {
    return fail();
  }

  const body = await readJsonBody(request, MAX_ADMIN_SESSION_BODY_BYTES);
  const idToken = idTokenFromBody(body);
  if (!idToken) {
    return fail();
  }

  try {
    const sessionCookie = await createAdminSessionCookie(idToken);
    const response = ok();
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionCookie, {
      ...cookieBase,
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    console.error(JSON.stringify({ msg: "admin_session_create_failed", reason }));
    return fail();
  }
}

export async function DELETE(): Promise<NextResponse> {
  const response = ok();
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...cookieBase,
    maxAge: 0,
  });
  return response;
}
