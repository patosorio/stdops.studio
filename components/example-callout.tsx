import { AccentDot } from "./accent-dot";

export function ExampleCallout({
  text,
  num,
  color,
  bodyFont,
}: {
  text: string;
  num: string;
  color: string;
  bodyFont: string;
}) {
  return (
    <div className="border border-ink p-5 md:p-7 mb-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] items-center">
      <p className={`${bodyFont} text-[15px] leading-[1.55] m-0 min-w-0`}>{text}</p>
      <span className="tabular-nums text-[clamp(28px,8vw,40px)] font-bold flex items-center gap-2 min-w-0">
        <AccentDot color={color} />
        {num}
      </span>
    </div>
  );
}
