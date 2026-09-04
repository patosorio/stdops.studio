import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate } from "@/lib/blog/format-date";
import { getPublishedPost, listPublishedPosts } from "@/lib/blog/load-posts";
import { postCopy } from "@/lib/blog/types";
import { accents } from "@/lib/design/accents";
import { loadPage } from "@/lib/i18n/load-page";
import { resolveLocale } from "@/lib/i18n/resolve-locale";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteName } from "@/lib/site";
import { AccentDot } from "@/components/accent-dot";
import { BlogPostBody } from "@/components/blog-post-body";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";

type BlogPostParams = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: BlogPostParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const copy = postCopy(post, locale);
  return pageMetadata(
    locale,
    `/blog/${slug}`,
    {
      title: `${copy.title} | stdops`,
      description: copy.excerpt,
    },
    { ogType: "article", publishedTime: post.publishedAt },
  );
}

export default async function BlogPostPage({ params }: { params: BlogPostParams }) {
  const { locale, dict, bodyFont } = await loadPage(params);
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const copy = postCopy(post, locale);
  const color = accents[post.accent];

  return (
    <PageShell width="narrow">
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: siteName, path: "/" },
          { name: dict.blog.title, path: "/blog" },
          { name: copy.title, path: `/blog/${slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd(locale, `/blog/${slug}`, {
          title: copy.title,
          description: copy.excerpt,
          publishedAt: post.publishedAt,
        })}
      />
      <Link
        href={`/${locale}/blog`}
        className="inline-block text-xs uppercase tracking-[0.03em] no-underline mb-8 border-b border-transparent hover:border-ink"
      >
        {dict.blog.allPosts}
      </Link>
      <time className="block tabular-nums text-xs uppercase tracking-[0.03em] mb-4">
        {formatPostDate(post.publishedAt, locale)}
      </time>
      <div className="flex gap-3 mb-5">
        <AccentDot color={color} />
      </div>
      <PageTitle className="mb-12">{copy.title}</PageTitle>
      <BlogPostBody blocks={copy.body} color={color} bodyFont={bodyFont} />
    </PageShell>
  );
}
