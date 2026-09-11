import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  matcher: ["/((?!_next|api|sitemap\\.xml|robots\\.txt|icon(?:\\.png)?|apple-icon(?:\\.png)?|.*\\..*).*)"],
};
