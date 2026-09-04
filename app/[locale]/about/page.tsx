import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { personJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/about", dict.about.meta);
}

export default async function AboutPage({ params }: { params: LocaleParams }) {
  const { locale, dict, bodyFont } = await loadPage(params);
  const { about } = dict;

  return (
    <PageShell width="copy">
      <JsonLd data={personJsonLd(locale, about.p1)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <div className="min-w-0">
          <PageTitle className="mb-6">{about.title}</PageTitle>
          <p className={`${bodyFont} text-base leading-[1.6] mb-4`}>{about.p1}</p>
          <p className={`${bodyFont} text-base leading-[1.6] mb-8`}>{about.p2}</p>
          <div className="border-t border-ink pt-5">
            <div className="text-xs uppercase tracking-[0.03em] mb-2.5">{about.langLabel}</div>
            <p className={`${bodyFont} text-sm m-0`}>{about.languages}</p>
          </div>
        </div>
        <ImagePlaceholder label={about.photoPlaceholder} ratio="photo" />
      </div>
    </PageShell>
  );
}
