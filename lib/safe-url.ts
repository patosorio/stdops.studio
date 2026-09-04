const FALLBACK_SITE_ORIGIN = "https://your-domain.com";

function parsedUrl(value: string): URL | undefined {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export function isHttpUrl(value: string): boolean {
  const url = parsedUrl(value);
  return url?.protocol === "https:" || url?.protocol === "http:";
}

export function isHttpsUrl(value: string): boolean {
  return parsedUrl(value)?.protocol === "https:";
}

/** Links we will render in HTML — no javascript:, data:, or protocol-relative URLs. */
export function isSafeHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  return isHttpUrl(href);
}

export function parseSiteOrigin(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return FALLBACK_SITE_ORIGIN;
  const url = parsedUrl(raw);
  if (!url) return FALLBACK_SITE_ORIGIN;
  if (url.protocol === "https:") return url.origin;
  if (url.protocol === "http:" && process.env.NODE_ENV !== "production") {
    return url.origin;
  }
  return FALLBACK_SITE_ORIGIN;
}

export function safeHttpsUrl(value: string | undefined, fallback: string): string {
  const raw = value?.trim();
  if (raw && isHttpsUrl(raw)) return raw;
  return fallback;
}
