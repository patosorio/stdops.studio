import type { Metadata } from "next";
import { listPublishedPosts } from "@/lib/blog/load-posts";
import { formatPostDate } from "@/lib/blog/format-date";
import { postCopy } from "@/lib/blog/types";
import { accents } from "@/lib/design/accents";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { BlogPostRow } from "@/components/blog-post-row";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/blog", dict.blog.meta);
}

export default async function BlogPage({ params }: { params: LocaleParams }) {
  const { locale, dict, bodyFont } = await loadPage(params);
  const posts = await listPublishedPosts();

  return (
    <PageShell width="copy">
      <PageTitle className={posts.length === 0 ? "mb-6" : "mb-12"}>{dict.blog.title}</PageTitle>
      {posts.length === 0 ? (
        <p className={`${bodyFont} text-base leading-[1.6]`}>{dict.blog.empty}</p>
      ) : (
        <div className="border-t border-ink">
          {posts.map((post) => {
            const copy = postCopy(post, locale);
            return (
              <BlogPostRow
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                date={formatPostDate(post.publishedAt, locale)}
                title={copy.title}
                excerpt={copy.excerpt}
                color={accents[post.accent]}
                bodyFont={bodyFont}
              />
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
