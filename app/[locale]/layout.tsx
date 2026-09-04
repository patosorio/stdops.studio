import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { accentHex } from "@/lib/design/accents";
import { fontMono, fontThai } from "@/lib/fonts";
import { locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/resolve-locale";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: accentHex.paper,
  colorScheme: "light",
};

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
    <html
      lang={locale}
      className={`${fontMono.variable} ${fontThai.variable}`}
    >
      <body className="min-h-screen min-h-dvh flex flex-col font-mono">
        <JsonLd data={organizationJsonLd(dict.meta.description)} />
        <JsonLd data={websiteJsonLd()} />
        <Nav dict={dict.nav} locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}
