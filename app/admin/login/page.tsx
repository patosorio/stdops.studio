"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailPassword } from "@/lib/firebase/client";

type FormStatus = "idle" | "sending" | "error";

function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
      ? error.code
      : "";
  if (
    code === "auth/invalid-credential" ||
    code === "auth/user-not-found" ||
    code === "auth/wrong-password"
  ) {
    return "Email or password is wrong.";
  }
  if (code === "auth/invalid-email") {
    return "That email address is not valid.";
  }
  if (code === "auth/too-many-requests") {
    return "Too many attempts. Wait a minute and try again.";
  }
  if (code === "auth/operation-not-allowed") {
    return "Email/password sign-in is not enabled in Firebase Authentication.";
  }
  return "Sign-in failed. Try again.";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setStatus("sending");
    setError(null);

    try {
      const idToken = await signInWithEmailPassword(email, password);
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!response.ok) {
        setError("Sign-in was rejected. This email is not on the admin allowlist.");
        setStatus("error");
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(authErrorMessage(err));
      setStatus("error");
    }
  }

  const inputClass = "px-3 py-3 border border-ink bg-paper rounded-none w-full font-mono text-sm";

  return (
    <div className="min-h-screen px-5 md:px-12 py-10 max-w-[1100px] flex flex-col justify-center">
      <p className="text-xs uppercase tracking-[0.03em] mb-4">Admin</p>
      <h1 className="text-2xl font-bold mb-8">Sign in to edit the blog</h1>
      <form className="grid gap-5 max-w-[420px]" onSubmit={onSubmit}>
        <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
          Email
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            className={inputClass}
          />
        </label>
        <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
          Password
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </label>
        {error ? <p className="font-en text-sm leading-[1.5] normal-case tracking-normal">{error}</p> : null}
        <button
          type="submit"
          disabled={status === "sending"}
          className="justify-self-start border border-ink bg-paper px-7 py-3.5 text-sm hover:border-accent-green transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
