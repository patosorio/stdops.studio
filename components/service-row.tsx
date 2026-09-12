import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceEntry } from "@/lib/i18n/dictionaries/types";
import { AccentDot } from "./accent-dot";

export function ServiceRow({
  service,
  locale,
}: {
  service: ServiceEntry;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}${service.href}`}
      className="group grid grid-cols-1 md:col-span-3 md:grid-cols-subgrid gap-x-6 gap-y-1 py-5 border-t border-ink last:border-b no-underline items-baseline"
    >
      <span className="font-bold text-base flex items-center gap-2 min-w-0 text-left">
        <AccentDot color={service.color} />
        {service.name}
      </span>
      <span className="text-xs opacity-70 min-w-0 text-left">{service.desc}</span>
      <span className="tabular-nums text-sm text-left whitespace-nowrap">{service.price}</span>
    </Link>
  );
}
