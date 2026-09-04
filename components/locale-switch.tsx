"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

export function LocaleSwitch({ current }: { current: Locale }) {
  const pathname = usePathname();
  const other: Locale = current === "th" ? "en" : "th";
  const rest = pathname.replace(/^\/(th|en)(?=\/|$)/, "") || "";

  return (
    <Link
      href={`/${other}${rest}`}
      className="text-xs tracking-[0.03em] no-underline"
      aria-label={`Switch to ${other === "th" ? "Thai" : "English"}`}
    >
      <span className={current === "th" ? "font-bold underline" : ""}>TH</span>
      {" / "}
      <span className={current === "en" ? "font-bold underline" : ""}>EN</span>
    </Link>
  );
}
