import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { LineCta } from "./line-cta";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <>
      <footer className="border-t border-ink px-5 py-8 md:px-12 flex items-center justify-between flex-wrap gap-4 text-xs">
        <span>{dict.copyright}</span>
        <span className="hidden lg:inline-flex">
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
