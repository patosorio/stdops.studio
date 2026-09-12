import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { initializeApp, getApps } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { parsePost } from "../lib/blog/parse-post";
import { blogPostDocument } from "../lib/blog/post-document";
import { blogPostsCollection, firebaseProjectId } from "../lib/content/storage";

async function main(): Promise<void> {
  const projectId =
    process.env.GOOGLE_CLOUD_PROJECT?.trim() ||
    process.env.GCLOUD_PROJECT?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ||
    firebaseProjectId;

  if (getApps().length === 0) {
    initializeApp({ projectId });
  }

  const db = getFirestore();
  const dir = resolve(process.cwd(), "content/blog");
  const names = await readdir(dir);
  let written = 0;

  for (const name of names) {
    if (!name.endsWith(".json") || name.startsWith("_")) continue;

    const source = `content/blog/${name}`;
    const raw = await readFile(resolve(dir, name), "utf8");
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

    const ref = db.collection(blogPostsCollection).doc(post.slug);
    const existing = await ref.get();
    const document = blogPostDocument(post);

    if (!existing.exists) {
      await ref.set({
        ...document,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      console.log(`created blogPosts/${post.slug}`);
    } else {
      await ref.set(
        {
          ...document,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
      console.log(`updated blogPosts/${post.slug}`);
    }
    written += 1;
  }

  console.log(`synced ${written} post(s) to ${blogPostsCollection}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "sync failed";
  console.error(message);
  process.exit(1);
});
