import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog/load-posts";
import { getSiteUrl } from "@/lib/env";
import { locales, type Locale } from "@/lib/i18n/config";
import { absoluteUrl, staticPagePaths } from "@/lib/site";

function languageAlternates(path: string): Record<string, string> {
  const siteUrl = getSiteUrl();
  return {
    th: absoluteUrl(siteUrl, "th", path),
    en: absoluteUrl(siteUrl, "en", path),
    "x-default": absoluteUrl(siteUrl, "th", path),
  };
}

function entry(
  locale: Locale,
  path: string,
  extras: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority" | "lastModified">,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(getSiteUrl(), locale, path),
    alternates: { languages: languageAlternates(path) },
    ...extras,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublishedPosts();

  const pages = staticPagePaths.flatMap((path) =>
    locales.map((locale) =>
      entry(locale, path, {
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : path.startsWith("/services") ? 0.9 : 0.7,
      }),
    ),
  );

  const articles = posts.flatMap((post) =>
    locales.map((locale) =>
      entry(locale, `/blog/${post.slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
        lastModified: post.publishedAt,
      }),
    ),
  );

  return [...pages, ...articles];
}
