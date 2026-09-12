import type { BlogPost } from "./types";

/** Firestore payload for a blog post — BlogPost fields only, no timestamps. */
export function blogPostDocument(post: BlogPost): BlogPost {
  return {
    slug: post.slug,
    publishedAt: post.publishedAt,
    accent: post.accent,
    draft: post.draft === true,
    th: post.th,
    en: post.en,
  };
}
