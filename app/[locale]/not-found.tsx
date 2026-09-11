import { headers } from "next/headers";
import { SystemPage } from "@/components/system-page";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { bodyFontClass } from "@/lib/i18n/body-font";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function LocaleNotFound() {
  const headerList = await headers();
  const raw = headerList.get("x-locale") ?? "";
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <SystemPage
      title={dict.system.notFoundTitle}
      body={dict.system.notFoundBody}
      bodyFont={bodyFontClass(locale)}
      homeHref={`/${locale}`}
      homeLabel={dict.system.homeLabel}
      lineLabel={dict.footer.line}
    />
  );
}
