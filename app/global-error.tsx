"use client";

import { useEffect } from "react";
import { SystemPage } from "@/components/system-page";
import { fontMono, fontThai } from "@/lib/fonts";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { bodyFontClass } from "@/lib/i18n/body-font";
import { en } from "@/lib/i18n/dictionaries/en";
import { th } from "@/lib/i18n/dictionaries/th";
import "./globals.css";

function localeFromLocation(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const segment = window.location.pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(JSON.stringify({ msg: "global_error", digest: error.digest }));
  }, [error.digest]);

  const locale = localeFromLocation();
  const dict = locale === "th" ? th : en;

  return (
    <html lang={locale} className={`${fontMono.variable} ${fontThai.variable}`}>
      <body className="min-h-screen min-h-dvh flex flex-col font-mono bg-paper text-ink">
        <main className="flex-1">
          <SystemPage
            title={dict.system.errorTitle}
            body={dict.system.errorBody}
            bodyFont={bodyFontClass(locale)}
            homeHref={`/${locale}`}
            homeLabel={dict.system.homeLabel}
            lineLabel={dict.footer.line}
            retryLabel={dict.system.retryLabel}
            onRetry={reset}
          />
        </main>
      </body>
    </html>
  );
}
