"use client";

import { useRouter } from "next/navigation";
import { signOutOfFirebase } from "@/lib/firebase/client";

export function SignOutButton() {
  const router = useRouter();

  async function onSignOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    try {
      await signOutOfFirebase();
    } catch {
      // Cookie is already cleared; client Auth sign-out is best-effort.
    }
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onSignOut}
      className="border border-ink bg-paper px-4 py-2 text-xs uppercase tracking-[0.03em] hover:border-accent-green transition-colors"
    >
      Sign out
    </button>
  );
}
