import { NextResponse } from "next/server";
import {
  allowContactFrom,
  canWriteContact,
  contactContentLengthAllowed,
  isAllowedContactOrigin,
  isJsonContentType,
  parseContactBody,
  readContactJsonBody,
  saveContactMessage,
} from "@/lib/contact/submit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

function fail(status: 400 | 429 | 503): NextResponse {
  return NextResponse.json({ ok: false }, { status, headers: noStore });
}

function ok(): NextResponse {
  return NextResponse.json({ ok: true }, { headers: noStore });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!isAllowedContactOrigin(request)) {
    return fail(400);
  }
  if (!isJsonContentType(request) || !contactContentLengthAllowed(request)) {
    return fail(400);
  }
  if (!allowContactFrom(clientIp(request))) {
    return fail(429);
  }

  const body = await readContactJsonBody(request);
  if (body === undefined) {
    return fail(400);
  }

  const parsed = parseContactBody(body);
  if (!parsed.ok) {
    return fail(400);
  }

  if (parsed.spam) {
    return ok();
  }

  if (!canWriteContact()) {
    return fail(503);
  }

  try {
    await saveContactMessage(parsed.value);
    return ok();
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    console.error(JSON.stringify({ msg: "contact_write_failed", reason }));
    return fail(503);
  }
}
