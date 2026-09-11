"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { LineCta } from "./line-cta";
import { SectionLabel } from "./section-label";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm({
  dict,
  locale,
  bodyFont,
}: {
  dict: Dictionary["contact"];
  locale: Locale;
  bodyFont: string;
}) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business: data.get("business"),
          message: data.get("message"),
          website: data.get("website"),
          locale,
        }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-3">{dict.successTitle}</h2>
        <p className={`${bodyFont} text-base leading-[1.6] mb-8 max-w-[640px]`}>
          {dict.successBody}
        </p>
        <LineCta label={dict.lineBig} variant="full" />
      </div>
    );
  }

  const inputClass =
    "px-3 py-3 border border-ink bg-paper rounded-none w-full font-mono text-sm";

  return (
    <div>
      <SectionLabel>{dict.formLabel}</SectionLabel>
      <form className="grid gap-5" onSubmit={onSubmit}>
        <label className="absolute w-px h-px overflow-hidden opacity-0">
          website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
          {dict.nameLabel}
          <input
            type="text"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
          {dict.emailLabel}
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            inputMode="email"
            className={inputClass}
          />
        </label>
        <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
          {dict.bizLabel}
          <input
            type="text"
            name="business"
            required
            maxLength={120}
            autoComplete="organization"
            className={inputClass}
          />
        </label>
        <label className="grid gap-1.5 text-xs uppercase tracking-[0.02em]">
          {dict.msgLabel}
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={4}
            className={`${inputClass} resize-y`}
          />
        </label>
        {status === "error" ? (
          <p className={`${bodyFont} text-sm leading-[1.5]`}>{dict.errorText}</p>
        ) : null}
        <button
          type="submit"
          disabled={status === "sending"}
          className="justify-self-start border border-ink bg-paper px-7 py-3.5 text-sm hover:border-accent-green transition-colors disabled:opacity-50"
        >
          {status === "sending" ? dict.sendingLabel : dict.sendLabel}
        </button>
      </form>
    </div>
  );
}
