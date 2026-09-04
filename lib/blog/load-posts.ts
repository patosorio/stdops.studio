import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { parsePost } from "./parse-post";
import type { BlogPost } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

async function readPostFiles(): Promise<BlogPost[]> {
  let names: string[];
  try {
    names = await readdir(BLOG_DIR);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const posts: BlogPost[] = [];
  for (const name of names) {
    if (!name.endsWith(".json") || name.startsWith("_")) continue;

    const source = `content/blog/${name}`;
    const raw = await readFile(path.join(BLOG_DIR, name), "utf8");
    let data: unknown;
    try {
      data = JSON.parse(raw) as unknown;
    } catch {
      throw new Error(`${source}: invalid JSON`);
    }

    const post = parsePost(data, source);
    const expected = name.slice(0, -".json".length);
    if (post.slug !== expected) {
      throw new Error(`${source}: slug "${post.slug}" must match filename "${expected}"`);
    }
    posts.push(post);
  }

  posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
  return posts;
}

export const listPosts = cache(async (): Promise<BlogPost[]> => readPostFiles());

export async function listPublishedPosts(): Promise<BlogPost[]> {
  const posts = await listPosts();
  return posts.filter((post) => post.draft !== true);
}

export async function getPublishedPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await listPublishedPosts();
  return posts.find((post) => post.slug === slug);
}
