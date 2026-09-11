import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

/** Liveness only — does not touch Firestore or Storage. */
export function GET(): NextResponse {
  return NextResponse.json({ ok: true }, { headers: noStore });
}

export function HEAD(): NextResponse {
  return new NextResponse(null, { status: 200, headers: noStore });
}
