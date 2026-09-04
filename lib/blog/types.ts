import type { Locale } from "@/lib/i18n/config";

export const BLOG_ACCENTS = ["blue", "yellow", "red", "green"] as const;
export type BlogAccent = (typeof BLOG_ACCENTS)[number];

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogLocaleCopy {
  title: string;
  excerpt: string;
  body: BlogBlock[];
}

export interface BlogPost {
  slug: string;
  publishedAt: string;
  accent: BlogAccent;
  draft?: boolean;
  th: BlogLocaleCopy;
  en: BlogLocaleCopy;
}

export function postCopy(post: BlogPost, locale: Locale): BlogLocaleCopy {
  return post[locale];
}
