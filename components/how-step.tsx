import type { HowStep as HowStepEntry } from "@/lib/i18n/dictionaries/types";
import { AccentDot } from "./accent-dot";

export function HowStep({ step, bodyFont }: { step: HowStepEntry; bodyFont: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[80px_minmax(0,1fr)_auto] gap-x-6 gap-y-2 py-7 border-b border-ink items-baseline">
      <span className="tabular-nums text-[32px] font-bold flex items-center gap-2">
        <AccentDot color={step.color} />
        {step.n}
      </span>
      <span className={`${bodyFont} text-base leading-[1.5] min-w-0`}>{step.text}</span>
      <span className="col-start-2 lg:col-start-auto text-xs uppercase tracking-[0.02em]">
        {step.time}
      </span>
    </div>
  );
}
