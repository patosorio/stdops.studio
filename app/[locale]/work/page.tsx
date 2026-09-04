import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";
import { WorkCase } from "@/components/work-case";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/work", dict.work.meta);
}

export default async function WorkPage({ params }: { params: LocaleParams }) {
  const { dict, bodyFont } = await loadPage(params);

  return (
    <PageShell width="copy">
      <PageTitle>{dict.work.title}</PageTitle>

      <div className="border-t border-ink">
        {dict.work.cases.map((entry) => (
          <WorkCase
            key={entry.id}
            entry={entry}
            problemLabel={dict.work.problemLabel}
            builtLabel={dict.work.builtLabel}
            bodyFont={bodyFont}
          />
        ))}
      </div>
    </PageShell>
  );
}
