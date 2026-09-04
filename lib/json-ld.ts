import type { Locale } from "@/lib/i18n/config";
import type { FaqEntry } from "@/lib/i18n/dictionaries/types";
import { getSiteUrl } from "@/lib/env";
import {
  absoluteUrl,
  organizationId,
  siteCity,
  siteCountryCode,
  siteCountryName,
  siteFounder,
  siteLegalName,
  siteName,
  websiteId,
} from "@/lib/site";

export type JsonLdNode =
  | string
  | number
  | boolean
  | null
  | JsonLdObject
  | JsonLdNode[];

export interface JsonLdObject {
  [key: string]: JsonLdNode | undefined;
}

export function serializeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function plainFaqText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function organizationJsonLd(description: string): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId(siteUrl),
    name: siteLegalName,
    alternateName: siteName,
    url: siteUrl,
    description,
    founder: {
      "@type": "Person",
      name: siteFounder,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteCity,
      addressCountry: siteCountryCode,
    },
    areaServed: {
      "@type": "Country",
      name: siteCountryName,
    },
    availableLanguage: ["th", "en", "es"],
  };
}

export function websiteJsonLd(): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(siteUrl),
    name: siteName,
    url: siteUrl,
    inLanguage: ["th", "en"],
    publisher: { "@id": organizationId(siteUrl) },
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  crumbs: readonly { name: string; path: string }[],
): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(siteUrl, locale, crumb.path),
    })),
  };
}

export function serviceJsonLd(
  locale: Locale,
  path: string,
  service: { title: string; intro: string },
): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    url: absoluteUrl(siteUrl, locale, path),
    provider: { "@id": organizationId(siteUrl) },
    areaServed: {
      "@type": "Country",
      name: siteCountryName,
    },
  };
}

export function articleJsonLd(
  locale: Locale,
  path: string,
  article: { title: string; description: string; publishedAt: string },
): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(siteUrl, locale, path),
    author: {
      "@type": "Person",
      name: siteFounder,
    },
    publisher: { "@id": organizationId(siteUrl) },
  };
}

export function personJsonLd(locale: Locale, description: string): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteFounder,
    description,
    url: absoluteUrl(siteUrl, locale, "/about"),
    worksFor: { "@id": organizationId(siteUrl) },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteCity,
      addressCountry: siteCountryCode,
    },
  };
}

export function faqPageJsonLd(items: FaqEntry[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: plainFaqText(item.a),
      },
    })),
  };
}
