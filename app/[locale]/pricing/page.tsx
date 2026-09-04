import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";
import { PriceRow } from "@/components/price-row";
import { SectionLabel } from "@/components/section-label";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/pricing", dict.pricing.meta);
}

export default async function PricingPage({ params }: { params: LocaleParams }) {
  const { dict, bodyFont } = await loadPage(params);
  const { pricing } = dict;

  return (
    <PageShell>
      <PageTitle className="mb-3">{pricing.title}</PageTitle>
      <p className={`${bodyFont} text-base leading-[1.55] max-w-[640px] mb-12`}>{pricing.sub}</p>

      <SectionLabel size="md">{pricing.packagesLabel}</SectionLabel>
      <div className="border-t border-ink mb-14 grid grid-cols-1 md:grid-cols-[max-content_max-content_minmax(0,1fr)]">
        {pricing.packages.map((pkg) => (
          <PriceRow
            key={pkg.name}
            name={pkg.name}
            meta={pkg.includes}
            trailing={pkg.price}
            nameColor={pkg.color}
            bodyFont={bodyFont}
            layout="price-desc"
          />
        ))}
      </div>

      <SectionLabel size="md">{pricing.retainerLabel}</SectionLabel>
      <div className="border-t border-ink mb-12 grid grid-cols-1 md:grid-cols-[max-content_max-content_minmax(0,1fr)]">
        {pricing.retainers.map((retainer) => (
          <PriceRow
            key={retainer.name}
            name={retainer.name}
            meta={retainer.desc}
            trailing={retainer.price}
            bodyFont={bodyFont}
            layout="price-desc"
          />
        ))}
      </div>

      <div className={`${bodyFont} text-[13px] leading-[1.7] max-w-[640px]`}>
        {pricing.rules.map((rule) => (
          <p key={rule} className="mb-1.5 last:mb-0">
            {rule}
          </p>
        ))}
      </div>
    </PageShell>
  );
}
