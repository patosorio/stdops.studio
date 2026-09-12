import { FieldValue } from "firebase-admin/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAlreadyExistsError, MAX_ADMIN_BLOG_BODY_BYTES, parseAdminPost } from "@/lib/admin/parse-body";
import { getAdminSession } from "@/lib/admin/session";
import { BLOG_POSTS_TAG } from "@/lib/blog/load-posts";
import { blogPostDocument } from "@/lib/blog/post-document";
import { blogPostsCollection } from "@/lib/content/storage";
import { getContentFirestore } from "@/lib/firebase/admin";
import { contentLengthAllowed, isJsonContentType, readJsonBody } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

function fail(status: 400 | 401 | 409 | 503, error?: string): NextResponse {
  return NextResponse.json(error ? { ok: false, error } : { ok: false }, { status, headers: noStore });
}

function ok(): NextResponse {
  return NextResponse.json({ ok: true }, { headers: noStore });
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getAdminSession();
  if (!session) {
    return fail(401);
  }
  if (!isJsonContentType(request) || !contentLengthAllowed(request, MAX_ADMIN_BLOG_BODY_BYTES)) {
    return fail(400);
  }

  const body = await readJsonBody(request, MAX_ADMIN_BLOG_BODY_BYTES);
  if (body === undefined) {
    return fail(400);
  }

  const parsed = parseAdminPost(body, "admin:create");
  if (!parsed.ok) {
    return fail(400, parsed.reason);
  }

  const post = blogPostDocument(parsed.value);

  try {
    await getContentFirestore()
      .collection(blogPostsCollection)
      .doc(post.slug)
      .create({
        ...post,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    revalidateTag(BLOG_POSTS_TAG);
    return ok();
  } catch (error) {
    if (isAlreadyExistsError(error)) {
      return fail(409, `slug "${post.slug}" already exists`);
    }
    const reason = error instanceof Error ? error.message : "unknown";
    console.error(JSON.stringify({ msg: "admin_blog_create_failed", reason }));
    return fail(503);
  }
}
