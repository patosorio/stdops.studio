"use client";

import Link from "next/link";
import { LineCta } from "./line-cta";
import { PageShell } from "./page-shell";
import { PageTitle } from "./page-title";

export function SystemPage({
  title,
  body,
  bodyFont,
  homeHref,
  homeLabel,
  lineLabel,
  retryLabel,
  onRetry,
}: {
  title: string;
  body: string;
  bodyFont: string;
  homeHref: string;
  homeLabel: string;
  lineLabel: string;
  retryLabel?: string;
  onRetry?: () => void;
}) {
  return (
    <PageShell width="copy">
      <PageTitle className="mb-5">{title}</PageTitle>
      <p className={`${bodyFont} text-[17px] leading-[1.6] max-w-[640px] mb-10`}>{body}</p>
      <div className="flex flex-col items-start gap-6">
        {onRetry && retryLabel ? (
          <button
            type="button"
            onClick={onRetry}
            className="border border-ink bg-paper px-7 py-3.5 text-sm hover:border-accent-green transition-colors"
          >
            {retryLabel}
          </button>
        ) : (
          <Link
            href={homeHref}
            className="inline-block text-xs uppercase tracking-[0.03em] no-underline border-b border-transparent hover:border-ink"
          >
            {homeLabel}
          </Link>
        )}
        <LineCta label={lineLabel} variant="big" />
      </div>
    </PageShell>
  );
}
