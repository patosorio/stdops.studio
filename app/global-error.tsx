"use client";

import { useEffect } from "react";
import { SystemPage } from "@/components/system-page";
import { fontMono, fontThai } from "@/lib/fonts";
import { defaultLocale } from "@/lib/i18n/config";
import { bodyFontClass } from "@/lib/i18n/body-font";
import { th } from "@/lib/i18n/dictionaries/th";
import "./globals.css";

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

  const locale = defaultLocale;
  const dict = th;

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
