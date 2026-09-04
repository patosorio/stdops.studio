import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import type { PageMeta } from "@/lib/i18n/dictionaries/types";
import { getGoogleSiteVerification, getSiteUrl } from "@/lib/env";
import { absoluteUrl, ogLocale, siteFounder, siteLegalName, siteName } from "@/lib/site";

export interface PageMetadataOptions {
  ogType?: "website" | "article";
  publishedTime?: string;
}

export function pageMetadata(
  locale: Locale,
  path: string,
  meta: PageMeta,
  options: PageMetadataOptions = {},
): Metadata {
  const siteUrl = getSiteUrl();
  const url = absoluteUrl(siteUrl, locale, path);
  const thUrl = absoluteUrl(siteUrl, "th", path);
  const enUrl = absoluteUrl(siteUrl, "en", path);
  const google = getGoogleSiteVerification();

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: siteName,
    authors: [{ name: siteFounder }],
    creator: siteFounder,
    publisher: siteLegalName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(google ? { verification: { google } } : {}),
    alternates: {
      canonical: url,
      languages: {
        th: thUrl,
        en: enUrl,
        "x-default": thUrl,
      },
    },
    openGraph: {
      type: options.ogType ?? "website",
      locale: ogLocale[locale],
      alternateLocale: locale === "th" ? [ogLocale.en] : [ogLocale.th],
      url,
      siteName: siteLegalName,
      title: meta.title,
      description: meta.description,
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}
