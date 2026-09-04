import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

export type LocaleParams = Promise<{ locale: string }>;

export async function resolveLocale<T extends { locale: string }>(
  params: Promise<T>
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
