import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { accents } from "@/lib/design/accents";
import { ServiceDetail } from "@/components/service-detail";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/services/ai", dict.serviceAi.meta);
}

export default async function AiServicePage({ params }: { params: LocaleParams }) {
  const { locale, dict, bodyFont } = await loadPage(params);
  return (
    <ServiceDetail
      content={dict.serviceAi}
      accent={accents.red}
      bodyFont={bodyFont}
      locale={locale}
      path="/services/ai"
      backLabel={dict.services.allServices}
    />
  );
}
