import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ServicePageCopy } from "@/lib/i18n/dictionaries/types";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { siteName } from "@/lib/site";
import { AccentDot } from "./accent-dot";
import { ExampleCallout } from "./example-callout";
import { Faq } from "./faq";
import { ImagePlaceholder } from "./image-placeholder";
import { JsonLd } from "./json-ld";
import { PageShell } from "./page-shell";
import { PriceRow } from "./price-row";
import { SectionLabel } from "./section-label";
import { StartingPrice } from "./starting-price";

export function ServiceDetail({
  content,
  accent,
  bodyFont,
  locale,
  path,
  backLabel,
}: {
  content: ServicePageCopy;
  accent: string;
  bodyFont: string;
  locale: Locale;
  path: string;
  backLabel: string;
}) {
  return (
    <PageShell width="copy">
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: siteName, path: "/" },
          { name: backLabel, path: "/services" },
          { name: content.title, path },
        ])}
      />
      <JsonLd data={serviceJsonLd(locale, path, content)} />
      <Link
        href={`/${locale}/services`}
        className="inline-block text-xs uppercase tracking-[0.03em] no-underline mb-8 border-b border-transparent hover:border-ink"
      >
        {backLabel}
      </Link>
      <div className="flex gap-3 mb-5">
        <AccentDot color={accent} />
      </div>
      <h1 className="text-[clamp(32px,5.5vw,58px)] tracking-[-0.02em] font-bold mb-5">
        {content.title}
      </h1>
      <p className={`${bodyFont} text-[17px] leading-[1.6] max-w-[640px] mb-12`}>
        {content.intro}
      </p>

      <SectionLabel>{content.listLabel}</SectionLabel>
      <div className="border-t border-ink mb-12">
        {content.offer.kind === "bullets"
          ? content.offer.items.map((item) => (
              <div
                key={item}
                className={`${bodyFont} text-[15px] py-4 border-b border-ink`}
              >
                {item}
              </div>
            ))
          : content.offer.items.map((item) => (
              <PriceRow
                key={item.name}
                name={item.name}
                meta={item.desc}
                trailing={item.price}
                bodyFont={bodyFont}
              />
            ))}
      </div>

      <SectionLabel>{content.exampleLabel}</SectionLabel>
      <ExampleCallout
        text={content.exampleText}
        num={content.exampleNum}
        color={accent}
        bodyFont={bodyFont}
      />

      <div className={content.starting ? "mb-12" : undefined}>
        <ImagePlaceholder label={content.shotPlaceholder} />
      </div>

      {content.starting ? (
        <StartingPrice label={content.starting.label} price={content.starting.price} />
      ) : null}

      {content.faq && content.faq.length > 0 && content.faqLabel ? (
        <Faq label={content.faqLabel} items={content.faq} bodyFont={bodyFont} />
      ) : null}
    </PageShell>
  );
}
