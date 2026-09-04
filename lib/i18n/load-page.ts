import { getDictionary } from "./get-dictionary";
import { resolveLocale } from "./resolve-locale";
import { bodyFontClass } from "./body-font";

export async function loadPage<T extends { locale: string }>(params: Promise<T>) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  return { locale, dict, bodyFont: bodyFontClass(locale) };
}
