"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries/types";

export function ContactForm({ dict }: { dict: Dictionary["contact"] }) {
  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
        {dict.nameLabel}
        <input
          type="text"
          name="name"
          autoComplete="name"
          className="px-3 py-3 border border-ink bg-paper rounded-none w-full"
        />
      </label>
      <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
        {dict.bizLabel}
        <input
          type="text"
          name="business"
          autoComplete="organization"
          className="px-3 py-3 border border-ink bg-paper rounded-none w-full"
        />
      </label>
      <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
        {dict.msgLabel}
        <textarea
          name="message"
          rows={4}
          className="px-3 py-3 border border-ink bg-paper rounded-none resize-y w-full"
        />
      </label>
      <button
        type="submit"
        className="justify-self-start border border-ink bg-paper px-7 py-3.5 text-sm hover:border-accent-green transition-colors"
      >
        {dict.sendLabel}
      </button>
    </form>
  );
}
