import { FieldValue } from "firebase-admin/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { MAX_ADMIN_BLOG_BODY_BYTES, parseAdminPost } from "@/lib/admin/parse-body";
import { getAdminSession } from "@/lib/admin/session";
import { BLOG_POSTS_TAG } from "@/lib/blog/load-posts";
import { blogPostDocument } from "@/lib/blog/post-document";
import { blogPostsCollection } from "@/lib/content/storage";
import { getContentFirestore } from "@/lib/firebase/admin";
import { contentLengthAllowed, isJsonContentType, readJsonBody } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

type BlogSlugParams = Promise<{ slug: string }>;

function fail(status: 400 | 401 | 404 | 503, error?: string): NextResponse {
  return NextResponse.json(error ? { ok: false, error } : { ok: false }, { status, headers: noStore });
}

function ok(): NextResponse {
  return NextResponse.json({ ok: true }, { headers: noStore });
}

export async function PUT(
  request: Request,
  { params }: { params: BlogSlugParams },
): Promise<NextResponse> {
  const session = await getAdminSession();
  if (!session) {
    return fail(401);
  }
  if (!isJsonContentType(request) || !contentLengthAllowed(request, MAX_ADMIN_BLOG_BODY_BYTES)) {
    return fail(400);
  }

  const { slug } = await params;
  const body = await readJsonBody(request, MAX_ADMIN_BLOG_BODY_BYTES);
  if (body === undefined) {
    return fail(400);
  }

  const parsed = parseAdminPost(body, `admin:update:${slug}`);
  if (!parsed.ok) {
    return fail(400, parsed.reason);
  }
  if (parsed.value.slug !== slug) {
    return fail(400, "slug cannot be changed");
  }

  const post = blogPostDocument(parsed.value);
  const ref = getContentFirestore().collection(blogPostsCollection).doc(slug);
  const existing = await ref.get();
  if (!existing.exists) {
    return fail(404);
  }

  try {
    await ref.set(
      {
        ...post,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    revalidateTag(BLOG_POSTS_TAG);
    return ok();
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    console.error(JSON.stringify({ msg: "admin_blog_update_failed", reason }));
    return fail(503);
  }
}
