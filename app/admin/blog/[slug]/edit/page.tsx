import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getAdminPost } from "@/lib/blog/admin-posts";

export const dynamic = "force-dynamic";

type EditParams = Promise<{ slug: string }>;

export default async function AdminEditPostPage({ params }: { params: EditParams }) {
  const { slug } = await params;
  const post = await getAdminPost(slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit {post.slug}</h1>
      <BlogPostForm mode="edit" initialValue={post} />
    </div>
  );
}
