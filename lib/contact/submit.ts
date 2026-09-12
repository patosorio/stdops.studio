import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { getSiteUrl } from "@/lib/env";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContentFirestore, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { contactMessagesCollection } from "@/lib/content/storage";

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const BUSINESS_MAX = 120;
const MESSAGE_MAX = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Name + business + 2000-char message + JSON overhead, with headroom for UTF-8. */
export const MAX_CONTACT_BODY_BYTES = 16 * 1024;

/**
 * In-memory limiter is per Cloud Run instance. App Hosting does not share this
 * Map across replicas. `minInstances: 1` keeps one warm instance; a deploy or
 * crash still resets the Map. It is a burst brake, not a global quota.
 * Same-origin + honeypot still apply when the Map is empty. Unique spoofed IPs
 * cannot grow memory without bound (key cap).
 */
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX_PER_IP = 5;
const RATE_MAX_PER_INSTANCE = 40;
const RATE_MAX_KEYS = 512;

const hitsByIp = new Map<string, number[]>();
let instanceHits: number[] = [];

export type ContactInput = {
  name: string;
  email: string;
  business: string;
  message: string;
  locale: Locale;
};

export type ContactParseResult =
  | { ok: true; value: ContactInput; spam: boolean }
  | { ok: false; reason: "invalid" };

function clip(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length < 1 || trimmed.length > max) return undefined;
  return trimmed;
}

function parseEmail(value: unknown): string | undefined {
  const email = clip(value, EMAIL_MAX)?.toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) return undefined;
  return email;
}

function originOf(urlLike: string): string | undefined {
  try {
    const url = new URL(urlLike);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

function requestHostOrigin(request: Request): string | undefined {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "")
    .split(",")[0]
    ?.trim()
    .toLowerCase();
  if (!host || /[\s\\/@]/.test(host)) return undefined;

  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim()
    .toLowerCase();
  let proto: "http" | "https";
  if (forwardedProto === "http" || forwardedProto === "https") {
    proto = forwardedProto;
  } else {
    try {
      const parsed = new URL(request.url).protocol.replace(":", "");
      proto = parsed === "https" ? "https" : "http";
    } catch {
      proto = process.env.NODE_ENV === "production" ? "https" : "http";
    }
  }

  return originOf(`${proto}://${host}`);
}

function allowedOrigins(request: Request): Set<string> {
  const allowed = new Set<string>();
  const site = originOf(getSiteUrl());
  if (site) allowed.add(site);
  const hostOrigin = requestHostOrigin(request);
  if (hostOrigin) allowed.add(hostOrigin);
  return allowed;
}

/** Origin wins when present; otherwise Referer. `Origin: null` is rejected. */
export function isAllowedContactOrigin(request: Request): boolean {
  const allowed = allowedOrigins(request);
  if (allowed.size === 0) return false;

  const originHeader = request.headers.get("origin")?.trim();
  if (originHeader) {
    if (originHeader === "null") return false;
    const origin = originOf(originHeader);
    return origin !== undefined && allowed.has(origin);
  }

  const referer = request.headers.get("referer")?.trim();
  if (!referer) return false;
  const origin = originOf(referer);
  return origin !== undefined && allowed.has(origin);
}

export function parseContactBody(body: unknown): ContactParseResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, reason: "invalid" };
  }
  const record = body as Record<string, unknown>;
  const honeypot = typeof record.website === "string" ? record.website.trim() : "";
  const name = clip(record.name, NAME_MAX);
  const email = parseEmail(record.email);
  const business = clip(record.business, BUSINESS_MAX);
  const message = clip(record.message, MESSAGE_MAX);
  const localeRaw = typeof record.locale === "string" ? record.locale : "";
  if (!name || !email || !business || !message || !isLocale(localeRaw)) {
    return { ok: false, reason: "invalid" };
  }
  return {
    ok: true,
    spam: honeypot.length > 0,
    value: { name, email, business, message, locale: localeRaw },
  };
}

function ipKey(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function pruneHitMap(now: number): void {
  for (const [key, times] of hitsByIp) {
    const recent = times.filter((time) => now - time < RATE_WINDOW_MS);
    if (recent.length === 0) hitsByIp.delete(key);
    else hitsByIp.set(key, recent);
  }
  instanceHits = instanceHits.filter((time) => now - time < RATE_WINDOW_MS);
}

export function allowContactFrom(ip: string): boolean {
  const now = Date.now();
  pruneHitMap(now);

  const key = ipKey(ip);
  const recent = hitsByIp.get(key) ?? [];
  if (recent.length >= RATE_MAX_PER_IP) {
    hitsByIp.set(key, recent);
    return false;
  }

  if (instanceHits.length >= RATE_MAX_PER_INSTANCE) {
    return false;
  }

  if (!hitsByIp.has(key) && hitsByIp.size >= RATE_MAX_KEYS) {
    return false;
  }

  recent.push(now);
  hitsByIp.set(key, recent);
  instanceHits.push(now);
  return true;
}

export function canWriteContact(): boolean {
  return process.env.NODE_ENV === "production" || hasFirebaseAdminCredentials();
}

export async function saveContactMessage(input: ContactInput): Promise<void> {
  await getContentFirestore()
    .collection(contactMessagesCollection)
    .add({
      name: input.name,
      email: input.email,
      business: input.business,
      message: input.message,
      locale: input.locale,
      createdAt: FieldValue.serverTimestamp(),
    });
}
