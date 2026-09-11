"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import { th } from "@/lib/i18n/dictionaries/th";
import { PageShell } from "./page-shell";

export function PageLoading() {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = locale === "th" ? th : en;

  return (
    <PageShell width="copy">
      <div
        role="status"
        aria-live="polite"
        aria-label={dict.system.loadingLabel}
        className="relative grid gap-4 max-w-[640px]"
      >
        <span className="absolute w-px h-px overflow-hidden opacity-0">
          {dict.system.loadingLabel}
        </span>
        <div className="h-10 w-3/5 border border-ink bg-paper" />
        <div className="h-4 w-full border border-ink bg-paper" />
        <div className="h-4 w-4/5 border border-ink bg-paper" />
      </div>
    </PageShell>
  );
}
