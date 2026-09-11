import type { Metadata } from "next";
import Image from "next/image";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { personJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { loadContentImages } from "@/lib/content/load-images";
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
  const images = await loadContentImages();

  return (
    <PageShell width="copy">
      <JsonLd data={personJsonLd(locale, about.p1, images.aboutPhotoUrl)} />
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
        <figure className="m-0 md:-mt-8">
          <div className="relative w-full aspect-[3/4] border border-ink">
            {images.aboutPhotoUrl ? (
              <Image
                src={images.aboutPhotoUrl}
                alt={about.photoPlaceholder}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs uppercase tracking-[0.03em] opacity-60">
                {about.photoPlaceholder}
              </div>
            )}
          </div>
          <figcaption className={`${bodyFont} text-xs mt-2.5`}>
            {about.photoCaption}
          </figcaption>
        </figure>
      </div>
    </PageShell>
  );
}
