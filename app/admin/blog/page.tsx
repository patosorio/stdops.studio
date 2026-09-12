import Link from "next/link";
import { listAdminPosts } from "@/lib/blog/admin-posts";

export const dynamic = "force-dynamic";

const ROW =
  "grid grid-cols-[minmax(8rem,1.1fr)_minmax(10rem,1.5fr)_6.5rem_7rem_7rem] gap-x-4 items-baseline";

function formatEditedDate(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(new Date(iso));
}

export default async function AdminBlogListPage() {
  const posts = await listAdminPosts();

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          href="/admin/blog/new"
          className="border border-ink bg-paper px-5 py-2.5 text-sm no-underline hover:border-accent-green transition-colors"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="font-en text-base leading-[1.6]">No posts in Firestore yet. Run the JSON sync or create one.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[44rem]">
            <div
              className={`${ROW} border-b border-ink py-3 text-xs uppercase tracking-[0.03em]`}
            >
              <span>Slug</span>
              <span>Title</span>
              <span>Status</span>
              <span>Published</span>
              <span>Edited</span>
            </div>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/admin/blog/${post.slug}/edit`}
                className={`${ROW} border-b border-ink py-4 no-underline hover:opacity-70`}
              >
                <span className="font-mono text-sm break-all">{post.slug}</span>
                <span className="font-en text-sm">{post.en.title}</span>
                <span className="text-xs uppercase tracking-[0.03em]">
                  {post.draft === true ? "Draft" : "Published"}
                </span>
                <span className="tabular-nums text-xs">{post.publishedAt}</span>
                <span className="tabular-nums text-xs">{formatEditedDate(post.updatedAtIso)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
