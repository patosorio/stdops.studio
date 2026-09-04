import type { ReactNode } from "react";
import type { FaqEntry } from "@/lib/i18n/dictionaries/types";
import { faqPageJsonLd } from "@/lib/json-ld";
import { isSafeHref } from "@/lib/safe-url";
import { JsonLd } from "./json-ld";
import { SectionLabel } from "./section-label";

function linkedText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const full = match[0];
    const label = match[1];
    const href = match[2];
    const index = match.index;
    if (label === undefined || href === undefined) continue;
    if (index > cursor) {
      nodes.push(text.slice(cursor, index));
    }
    if (!isSafeHref(href)) {
      nodes.push(label);
      key += 1;
      cursor = index + full.length;
      continue;
    }
    const external = href.startsWith("http://") || href.startsWith("https://");
    nodes.push(
      <a
        key={key}
        href={href}
        className="underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>,
    );
    key += 1;
    cursor = index + full.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }
  return nodes;
}

export function Faq({
  label,
  items,
  bodyFont,
}: {
  label: string;
  items: FaqEntry[];
  bodyFont: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <JsonLd data={faqPageJsonLd(items)} />
      <SectionLabel>{label}</SectionLabel>
      <div className="border-t border-ink">
        {items.map((item) => (
          <div key={item.q} className="py-4 border-b border-ink">
            <h3 className="text-[15px] font-bold mb-2">{item.q}</h3>
            <p className={`${bodyFont} text-[15px] leading-[1.55] m-0`}>
              {linkedText(item.a)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
