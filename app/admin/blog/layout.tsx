import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { getAdminSession } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function AdminBlogLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen px-5 md:px-12 py-10 max-w-[1100px]">
      <header className="flex items-center justify-between gap-4 mb-10 border-b border-ink pb-4">
        <Link href="/admin/blog" className="text-sm uppercase tracking-[0.03em] no-underline">
          Admin · Blog
        </Link>
        <div className="flex items-center gap-4">
          {session.email ? <span className="text-xs">{session.email}</span> : null}
          <SignOutButton />
        </div>
      </header>
      {children}
    </div>
  );
}
