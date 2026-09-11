import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";
import { ServiceIndexRow } from "@/components/service-index-row";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/services", dict.services.meta);
}

export default async function ServicesPage({ params }: { params: LocaleParams }) {
  const { locale, dict, bodyFont } = await loadPage(params);

  return (
    <PageShell>
      <PageTitle>{dict.services.title}</PageTitle>
      <div className="border-t border-ink grid grid-cols-1 md:grid-cols-[max-content_minmax(0,1fr)]">
        {dict.services.items.map((service) => (
          <ServiceIndexRow
            key={`${service.href}-${service.name}`}
            service={service}
            locale={locale}
            bodyFont={bodyFont}
          />
        ))}
      </div>
    </PageShell>
  );
}
