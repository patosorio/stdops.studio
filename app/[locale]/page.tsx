import { loadPage } from "@/lib/i18n/load-page";
import type { LocaleParams } from "@/lib/i18n/resolve-locale";
import { ProofStat } from "@/components/proof-stat";
import { ServiceRow } from "@/components/service-row";
import { LineCta } from "@/components/line-cta";
import { accents } from "@/lib/design/accents";

const DOT_COLORS = [accents.blue, accents.yellow, accents.green, accents.red] as const;

export default async function HomePage({ params }: { params: LocaleParams }) {
  const { locale, dict, bodyFont } = await loadPage(params);
  const { home } = dict;

  return (
    <section className="px-5 md:px-12 pt-10 md:pt-20 pb-16 max-w-[1400px]">
      <div className="flex gap-3 mb-7">
        {DOT_COLORS.map((color) => (
          <span
            key={color}
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: color }}
          />
        ))}
      </div>

      <h1 className="text-[clamp(36px,6.5vw,72px)] leading-[1.05] tracking-[-0.02em] font-bold mb-6">
        {home.headline}
      </h1>

      <p className={`${bodyFont} text-[clamp(16px,2vw,18px)] leading-[1.55] max-w-[640px] mb-10`}>
        {home.sub}
      </p>

      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-8 mb-10">
        <ProofStat
          value={home.proofValue}
          label={home.proofLabel}
          borderColor={accents.blue}
        />
        <ProofStat
          value={home.priceValue}
          label={home.priceLabel}
          borderColor={accents.ink}
        />
      </div>

      <LineCta label={home.lineCta} variant="big" />

      <div id="services">
        <h2 className="text-2xl font-bold mt-20 mb-2">{home.servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-[max-content_minmax(0,max-content)_max-content]">
          {home.services.map((service) => (
            <ServiceRow key={service.href} service={service} locale={locale} />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-20 mb-6">{home.proofTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {home.proofs.map((proof) => (
          <ProofStat
            key={proof.desc}
            value={proof.num}
            label={proof.desc}
            borderColor={proof.color}
          />
        ))}
      </div>
    </section>
  );
}
