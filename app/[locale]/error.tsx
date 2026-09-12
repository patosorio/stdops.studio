"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { SystemPage } from "@/components/system-page";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { bodyFontClass } from "@/lib/i18n/body-font";
import { en } from "@/lib/i18n/dictionaries/en";
import { th } from "@/lib/i18n/dictionaries/th";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(JSON.stringify({ msg: "render_error", digest: error.digest }));
  }, [error.digest]);

  const params = useParams();
  const raw = typeof params?.locale === "string" ? params.locale : "";
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = locale === "th" ? th : en;

  return (
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
  );
}
