"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BlogPostBody } from "@/components/blog-post-body";
import { parsePost } from "@/lib/blog/parse-post";
import { BLOG_ACCENTS, type BlogAccent, type BlogPost } from "@/lib/blog/types";
import { accents } from "@/lib/design/accents";

type FormStatus = "idle" | "sending" | "success" | "error";

const BODY_HELP =
  'JSON array of blocks: { "type": "p", "text": "…" } | { "type": "h2", "text": "…" } | { "type": "ul", "items": ["…"] }';

const EMPTY_BODY_JSON = `[
  { "type": "p", "text": "" }
]`;

function stringifyBody(post: BlogPost | undefined, locale: "th" | "en"): string {
  if (!post) return EMPTY_BODY_JSON;
  return JSON.stringify(post[locale].body, null, 2);
}

function todayIsoDate(): string {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function BlogPostForm({
  mode,
  initialValue,
}: {
  mode: "create" | "edit";
  initialValue?: BlogPost;
}) {
  const router = useRouter();
  const editing = mode === "edit";

  const [slug, setSlug] = useState(initialValue?.slug ?? "");
  const [publishedAt, setPublishedAt] = useState(initialValue?.publishedAt ?? todayIsoDate());
  const [accent, setAccent] = useState<BlogAccent>(initialValue?.accent ?? "blue");
  const [draft, setDraft] = useState(initialValue?.draft === true);
  const [thTitle, setThTitle] = useState(initialValue?.th.title ?? "");
  const [thExcerpt, setThExcerpt] = useState(initialValue?.th.excerpt ?? "");
  const [thBody, setThBody] = useState(stringifyBody(initialValue, "th"));
  const [enTitle, setEnTitle] = useState(initialValue?.en.title ?? "");
  const [enExcerpt, setEnExcerpt] = useState(initialValue?.en.excerpt ?? "");
  const [enBody, setEnBody] = useState(stringifyBody(initialValue, "en"));
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const inputClass = "px-3 py-3 border border-ink bg-paper rounded-none w-full font-mono text-sm";
  const labelClass = "grid gap-1.5 text-xs uppercase tracking-[0.02em]";

  function assembledPayload(): unknown {
    return {
      slug: slug.trim(),
      publishedAt,
      accent,
      draft,
      th: {
        title: thTitle.trim(),
        excerpt: thExcerpt.trim(),
        body: JSON.parse(thBody) as unknown,
      },
      en: {
        title: enTitle.trim(),
        excerpt: enExcerpt.trim(),
        body: JSON.parse(enBody) as unknown,
      },
    };
  }

  function parseFormPost(): BlogPost {
    let payload: unknown;
    try {
      payload = assembledPayload();
    } catch {
      throw new Error("th.body and en.body must be valid JSON arrays");
    }
    return parsePost(payload, editing ? "admin:edit" : "admin:create");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);

    let post: BlogPost;
    try {
      post = parseFormPost();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid post");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(
        editing ? `/api/admin/blog/${encodeURIComponent(post.slug)}` : "/api/admin/blog",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        },
      );
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) {
        if (response.status === 409) {
          setError(result.error ?? `A post with slug "${post.slug}" already exists.`);
        } else if (response.status === 401) {
          setError("Session expired. Sign in again.");
        } else {
          setError(result.error ?? "Save failed. Check the JSON bodies and required fields.");
        }
        setStatus("error");
        return;
      }
      setStatus("success");
      if (!editing) {
        router.push("/admin/blog");
        router.refresh();
        return;
      }
      router.refresh();
    } catch {
      setError("Save failed. Try again.");
      setStatus("error");
    }
  }

  let previewPost: BlogPost | null = null;
  let previewError: string | null = null;
  if (preview) {
    try {
      previewPost = parseFormPost();
    } catch (err) {
      previewError = err instanceof Error ? err.message : "Invalid post";
    }
  }

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <label className={labelClass}>
        Slug
        <input
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          required
          disabled={editing}
          autoComplete="off"
          className={`${inputClass} disabled:opacity-60`}
        />
        <span className="normal-case tracking-normal text-xs opacity-70">
          {editing
            ? "Slug is the document ID and cannot be renamed in v1."
            : "Lowercase kebab-case. Becomes the URL and the Firestore document ID."}
        </span>
      </label>

      <div className="grid gap-6 md:grid-cols-3">
        <label className={labelClass}>
          Published date
          <input
            type="date"
            value={publishedAt}
            onChange={(event) => setPublishedAt(event.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Accent
          <select
            value={accent}
            onChange={(event) => {
              const value = event.target.value;
              if ((BLOG_ACCENTS as readonly string[]).includes(value)) {
                setAccent(value as BlogAccent);
              }
            }}
            className={inputClass}
          >
            {BLOG_ACCENTS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3 cursor-pointer self-end pb-1 text-xs uppercase tracking-[0.02em]">
          <input
            type="checkbox"
            checked={draft}
            onChange={(event) => setDraft(event.target.checked)}
            className="size-4 shrink-0 border border-ink accent-ink cursor-pointer"
          />
          <span>
            <span className="block">Draft</span>
            <span className="block normal-case tracking-normal opacity-70">
              {draft ? "Hidden on the public site" : "Published on the public site"}
            </span>
          </span>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          TH title
          <input
            type="text"
            value={thTitle}
            onChange={(event) => setThTitle(event.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          EN title
          <input
            type="text"
            value={enTitle}
            onChange={(event) => setEnTitle(event.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          TH excerpt
          <input
            type="text"
            value={thExcerpt}
            onChange={(event) => setThExcerpt(event.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          EN excerpt
          <input
            type="text"
            value={enExcerpt}
            onChange={(event) => setEnExcerpt(event.target.value)}
            required
            className={inputClass}
          />
        </label>
      </div>

      <p className="text-xs leading-[1.5] opacity-70">{BODY_HELP}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          TH body (JSON)
          <textarea
            value={thBody}
            onChange={(event) => setThBody(event.target.value)}
            required
            rows={18}
            spellCheck={false}
            className={`${inputClass} resize-y font-mono text-xs leading-[1.5]`}
          />
        </label>
        <label className={labelClass}>
          EN body (JSON)
          <textarea
            value={enBody}
            onChange={(event) => setEnBody(event.target.value)}
            required
            rows={18}
            spellCheck={false}
            className={`${inputClass} resize-y font-mono text-xs leading-[1.5]`}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-ink bg-paper px-7 py-3.5 text-sm hover:border-accent-green transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Saving…" : editing ? "Save changes" : "Create post"}
        </button>
        <button
          type="button"
          onClick={() => setPreview((open) => !open)}
          className="border border-ink bg-paper px-7 py-3.5 text-sm hover:border-accent-blue transition-colors"
        >
          {preview ? "Hide preview" : "Preview"}
        </button>
        {status === "success" ? (
          <p className="text-sm">Saved.</p>
        ) : null}
      </div>

      {error ? <p className="font-en text-sm leading-[1.5]">{error}</p> : null}

      {preview ? (
        <div className="border-t border-ink pt-8 grid gap-10">
          {previewError ? (
            <p className="font-en text-sm leading-[1.5]">{previewError}</p>
          ) : previewPost ? (
            <>
              <section>
                <p className="text-xs uppercase tracking-[0.03em] mb-4">TH preview</p>
                <h2 className="text-xl font-bold mb-4">{previewPost.th.title}</h2>
                <BlogPostBody
                  blocks={previewPost.th.body}
                  color={accents[previewPost.accent]}
                  bodyFont="font-thai"
                />
              </section>
              <section>
                <p className="text-xs uppercase tracking-[0.03em] mb-4">EN preview</p>
                <h2 className="text-xl font-bold mb-4">{previewPost.en.title}</h2>
                <BlogPostBody
                  blocks={previewPost.en.body}
                  color={accents[previewPost.accent]}
                  bodyFont="font-en"
                />
              </section>
            </>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
