import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SystemPage } from "@/components/system-page";
import { defaultLocale } from "@/lib/i18n/config";
import { bodyFontClass } from "@/lib/i18n/body-font";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function RootNotFound() {
  const dict = await getDictionary(defaultLocale);
  const locale = defaultLocale;

  return (
    <>
      <Nav dict={dict.nav} locale={locale} />
      <main className="flex-1">
        <SystemPage
          title={dict.system.notFoundTitle}
          body={dict.system.notFoundBody}
          bodyFont={bodyFontClass(locale)}
          homeHref={`/${locale}`}
          homeLabel={dict.system.homeLabel}
          lineLabel={dict.footer.line}
        />
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
