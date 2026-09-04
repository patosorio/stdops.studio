import type { Locale } from "@/lib/i18n/config";

export const siteName = "stdops";
export const siteLegalName = "standard operations studio";
export const siteFounder = "Patricia Osorio";
export const siteCity = "Bangkok";
export const siteCountryCode = "TH";
export const siteCountryName = "Thailand";

/** Paths that exist in both locales, excluding blog posts. */
export const staticPagePaths = [
  "/",
  "/services",
  "/services/workspace",
  "/services/web",
  "/services/ai",
  "/services/data",
  "/work",
  "/blog",
  "/pricing",
  "/how-it-works",
  "/about",
  "/contact",
] as const;

export type StaticPagePath = (typeof staticPagePaths)[number];

export const ogLocale: Record<Locale, string> = {
  th: "th_TH",
  en: "en_US",
};

export function localePath(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `/${locale}${suffix}`;
}

export function absoluteUrl(siteUrl: string, locale: Locale, path: string): string {
  return `${siteUrl}${localePath(locale, path)}`;
}

export function organizationId(siteUrl: string): string {
  return `${siteUrl}/#organization`;
}

export function websiteId(siteUrl: string): string {
  return `${siteUrl}/#website`;
}
