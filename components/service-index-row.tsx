import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceEntry } from "@/lib/i18n/dictionaries/types";
import { AccentDot } from "./accent-dot";

export function ServiceIndexRow({
  service,
  locale,
  bodyFont,
}: {
  service: ServiceEntry;
  locale: Locale;
  bodyFont: string;
}) {
  return (
    <Link
      href={`/${locale}${service.href}`}
      className="grid grid-cols-1 md:col-span-3 md:grid-cols-subgrid gap-x-6 gap-y-2 py-6 border-b border-ink no-underline items-baseline"
    >
      <span className="font-bold text-lg flex items-center gap-2 text-left">
        <AccentDot color={service.color} />
        {service.name}
      </span>
      <span className={`${bodyFont} text-sm leading-[1.5] text-left`}>{service.desc}</span>
      <span className="tabular-nums text-sm text-left whitespace-nowrap">{service.price}</span>
    </Link>
  );
}
