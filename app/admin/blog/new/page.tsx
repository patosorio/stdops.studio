import { BlogPostForm } from "@/components/admin/blog-post-form";

export const dynamic = "force-dynamic";

export default function AdminNewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">New post</h1>
      <BlogPostForm mode="create" />
    </div>
  );
}
