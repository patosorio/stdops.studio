import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ServicePageCopy } from "@/lib/i18n/dictionaries/types";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { siteName } from "@/lib/site";
import { AccentDot } from "./accent-dot";
import { ExampleCallout } from "./example-callout";
import { Faq } from "./faq";
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
  imageSrc,
}: {
  content: ServicePageCopy;
  accent: string;
  bodyFont: string;
  locale: Locale;
  path: string;
  backLabel: string;
  imageSrc?: string;
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

      <div
        className={`relative w-full aspect-[4/3] border border-ink ${
          content.starting ? "mb-12" : ""
        }`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={content.shotPlaceholder}
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs uppercase tracking-[0.03em] opacity-60">
            {content.shotPlaceholder}
          </div>
        )}
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
