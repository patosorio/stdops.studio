import type { Locale } from "./config";

export function bodyFontClass(locale: Locale): string {
  return locale === "th" ? "font-thai" : "font-en";
}
