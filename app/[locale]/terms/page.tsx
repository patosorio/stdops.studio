import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { LegalDoc } from "@/components/legal-doc";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/terms", dict.terms.meta);
}

export default async function TermsPage({ params }: { params: LocaleParams }) {
  const { dict, bodyFont } = await loadPage(params);
  return <LegalDoc content={dict.terms} bodyFont={bodyFont} />;
}
