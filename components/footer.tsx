import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { LineCta } from "./line-cta";

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary["footer"];
  locale: Locale;
}) {
  const linkClass =
    "uppercase tracking-[0.03em] no-underline border-b border-transparent hover:border-ink";

  return (
    <>
      <footer className="border-t border-ink px-5 py-4 md:px-12 flex items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
          <span>{dict.copyright}</span>
          <span aria-hidden>·</span>
          <span>{dict.nap}</span>
          <span aria-hidden>·</span>
          <Link href={`/${locale}/privacy`} className={linkClass}>
            {dict.privacyLabel}
          </Link>
          <span aria-hidden>·</span>
          <Link href={`/${locale}/terms`} className={linkClass}>
            {dict.termsLabel}
          </Link>
        </div>
        <span className="hidden lg:inline-flex shrink-0">
          <LineCta label={dict.line} />
        </span>
      </footer>
      <LineCta label={dict.line} variant="sticky" />
      <div
        className="h-[calc(var(--spacing-sticky-cta)+var(--spacing-safe-bottom))] lg:hidden"
        aria-hidden
      />
    </>
  );
}
