import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { AccentDot } from "./accent-dot";

export function WorkCase({
  entry,
  problemLabel,
  builtLabel,
  bodyFont,
}: {
  entry: Dictionary["work"]["cases"][number];
  problemLabel: string;
  builtLabel: string;
  bodyFont: string;
}) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 py-10 border-b border-ink items-start">
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.03em] font-bold mb-2.5 flex items-center gap-2">
          <AccentDot color={entry.color} />
          {entry.industry}
        </div>
        <p className={`${bodyFont} text-[15px] leading-[1.6] mb-4`}>
          <strong className="font-[inherit]">{problemLabel}:</strong> {entry.problem}
        </p>
        <p className={`${bodyFont} text-[15px] leading-[1.6] mb-4`}>
          <strong className="font-[inherit]">{builtLabel}:</strong> {entry.built}
        </p>
        <div className="tabular-nums text-[clamp(24px,7vw,32px)] font-bold flex items-center gap-2 min-w-0">
          <AccentDot color={entry.color} />
          {entry.result}
        </div>
      </div>
      <div className="relative w-full aspect-[4/3] border border-ink">
        <Image
          src={`/work/${entry.id}.png`}
          alt={entry.shotLabel}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
