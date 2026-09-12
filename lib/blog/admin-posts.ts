import "server-only";
import { Timestamp } from "firebase-admin/firestore";
import { getContentFirestore } from "@/lib/firebase/admin";
import { blogPostsCollection } from "@/lib/content/storage";
import { parsePost } from "./parse-post";
import type { BlogPost } from "./types";

export type BlogPostRecord = BlogPost & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type AdminPostListItem = BlogPost & {
  updatedAtIso: string | null;
};

function timestampToIso(value: unknown): string | null {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  return null;
}

export async function listAdminPosts(): Promise<AdminPostListItem[]> {
  const snapshot = await getContentFirestore().collection(blogPostsCollection).get();
  const posts = snapshot.docs.map((doc) => {
    const data = doc.data();
    const post = parsePost(data, `blogPosts/${doc.id}`);
    if (post.slug !== doc.id) {
      throw new Error(`blogPosts/${doc.id}: slug "${post.slug}" must match document id`);
    }
    return {
      ...post,
      updatedAtIso: timestampToIso(data.updatedAt),
    };
  });
  posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
  return posts;
}

export async function getAdminPost(slug: string): Promise<BlogPost | undefined> {
  const doc = await getContentFirestore().collection(blogPostsCollection).doc(slug).get();
  if (!doc.exists) return undefined;
  const post = parsePost(doc.data(), `blogPosts/${doc.id}`);
  if (post.slug !== doc.id) {
    throw new Error(`blogPosts/${doc.id}: slug "${post.slug}" must match document id`);
  }
  return post;
}
