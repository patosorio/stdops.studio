import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocumentLang } from "@/components/document-lang";
import { Footer } from "@/components/footer";
import { GaTag } from "@/components/ga-tag";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/resolve-locale";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  return pageMetadata(locale, "/", dict.meta);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);

  return (
    <>
      <DocumentLang locale={locale} />
      <GaTag />
      <JsonLd data={organizationJsonLd(dict.meta.description)} />
      <JsonLd data={websiteJsonLd()} />
      <Nav dict={dict.nav} locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
