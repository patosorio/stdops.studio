import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin is not part of the TH/EN site. /th/admin and /en/admin 404 inside
  // [locale] and never show the login form — send them to /admin.
  for (const locale of locales) {
    const prefixed = `/${locale}/admin`;
    if (pathname === prefixed || pathname.startsWith(`${prefixed}/`)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.slice(`/${locale}`.length) || "/";
      return NextResponse.redirect(url);
    }
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) {
    const locale = pathname.split("/").filter(Boolean)[0] ?? defaultLocale;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Thai-first: unprefixed paths always resolve to /th, never browser-language sniffed.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin|sitemap\\.xml|robots\\.txt|icon(?:\\.png)?|apple-icon(?:\\.png)?|.*\\..*).*)"],
};
