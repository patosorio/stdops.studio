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
  return pageMetadata(locale, "/services/web", dict.serviceWeb.meta);
}

export default async function WebServicePage({ params }: { params: LocaleParams }) {
  const { locale, dict, bodyFont } = await loadPage(params);
  return (
    <ServiceDetail
      content={dict.serviceWeb}
      accent={accents.yellow}
      bodyFont={bodyFont}
      locale={locale}
      path="/services/web"
      backLabel={dict.services.allServices}
    />
  );
}
