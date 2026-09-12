import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getContentFirestore, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { blogPostsCollection } from "@/lib/content/storage";
import { parsePost } from "./parse-post";
import type { BlogPost } from "./types";

export const BLOG_POSTS_TAG = "blog-posts";

const fetchAllPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    // GitHub Actions has no ADC / FIREBASE_CONFIG. Skip so `next build` can
    // typecheck the pages. App Hosting injects FIREBASE_CONFIG and reads live.
    if (!hasFirebaseAdminCredentials()) {
      return [];
    }

    const snapshot = await getContentFirestore().collection(blogPostsCollection).get();
    const posts = snapshot.docs.map((doc) => {
      const post = parsePost(doc.data(), `blogPosts/${doc.id}`);
      if (post.slug !== doc.id) {
        throw new Error(`blogPosts/${doc.id}: slug "${post.slug}" must match document id`);
      }
      return post;
    });
    posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
    return posts;
  },
  ["blog-posts"],
  { tags: [BLOG_POSTS_TAG] },
);

export const listPosts = cache(fetchAllPosts);

export async function listPublishedPosts(): Promise<BlogPost[]> {
  const posts = await listPosts();
  return posts.filter((post) => post.draft !== true);
}

export async function getPublishedPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await listPublishedPosts();
  return posts.find((post) => post.slug === slug);
}
