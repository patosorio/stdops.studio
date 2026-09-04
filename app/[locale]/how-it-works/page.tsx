import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { HowStep } from "@/components/how-step";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/how-it-works", dict.howItWorks.meta);
}

export default async function HowItWorksPage({ params }: { params: LocaleParams }) {
  const { dict, bodyFont } = await loadPage(params);

  return (
    <PageShell width="narrow">
      <PageTitle>{dict.howItWorks.title}</PageTitle>
      <div className="border-t border-ink">
        {dict.howItWorks.steps.map((step) => (
          <HowStep key={step.n} step={step} bodyFont={bodyFont} />
        ))}
      </div>
    </PageShell>
  );
}
