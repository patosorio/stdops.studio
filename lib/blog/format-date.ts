import type { Locale } from "@/lib/i18n/config";

export function formatPostDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH-u-ca-gregory" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${isoDate}T00:00:00`));
}
