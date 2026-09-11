import type { LegalPageCopy } from "@/lib/i18n/dictionaries/types";
import { PageShell } from "./page-shell";
import { PageTitle } from "./page-title";
import { SectionLabel } from "./section-label";

export function LegalDoc({
  content,
  bodyFont,
}: {
  content: LegalPageCopy;
  bodyFont: string;
}) {
  return (
    <PageShell width="narrow">
      <PageTitle className="mb-3">{content.title}</PageTitle>
      <p className="text-xs uppercase tracking-[0.03em] mb-10">{content.updated}</p>
      <div className="grid gap-10">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <SectionLabel>{section.heading}</SectionLabel>
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={`${section.heading}-${index}`}
                className={`${bodyFont} text-[15px] leading-[1.6] mb-4 last:mb-0`}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </PageShell>
  );
}
