import type { Metadata } from "next";
import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { LineCta } from "@/components/line-cta";
import { MessengerLink } from "@/components/messenger-link";
import { PageShell } from "@/components/page-shell";
import { PageTitle } from "@/components/page-title";
import { SectionLabel } from "@/components/section-label";

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, "/contact", dict.contact.meta);
}

export default async function ContactPage({ params }: { params: LocaleParams }) {
  const { dict, bodyFont } = await loadPage(params);
  const { contact } = dict;

  return (
    <PageShell width="narrow">
      <PageTitle className="mb-3">{contact.title}</PageTitle>
      <p className={`${bodyFont} text-base leading-[1.55] mb-10`}>{contact.sub}</p>

      <div className="mb-4">
        <LineCta label={contact.lineBig} variant="full" />
      </div>
      <div className="mb-12 text-center">
        <MessengerLink label={contact.messengerLabel} bodyFont={bodyFont} />
      </div>

      <div className="border-t border-ink pt-8">
        <SectionLabel>{contact.formLabel}</SectionLabel>
        <ContactForm dict={contact} />
      </div>
    </PageShell>
  );
}
