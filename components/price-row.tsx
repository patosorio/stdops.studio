import type { ReactNode } from "react";
import { AccentDot } from "./accent-dot";

export function PriceRow({
  name,
  meta,
  trailing,
  nameColor,
  bodyFont,
  layout = "desc-price",
}: {
  name: string;
  meta: ReactNode;
  trailing: string;
  nameColor?: string;
  bodyFont: string;
  layout?: "desc-price" | "price-desc";
}) {
  const isPriceFirst = layout === "price-desc";
  const gridClass = isPriceFirst
    ? "grid grid-cols-1 md:col-span-3 md:grid-cols-subgrid"
    : "grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)_auto]";

  const nameCell = (
    <span className="font-bold text-[15px] flex items-center gap-2 min-w-0 text-left">
      {nameColor ? <AccentDot color={nameColor} /> : null}
      {name}
    </span>
  );
  const metaCell = (
    <span className={`${bodyFont} text-sm leading-[1.5] min-w-0 text-left`}>{meta}</span>
  );
  const priceCell = (
    <span
      className={`tabular-nums text-sm text-left ${isPriceFirst ? "whitespace-nowrap" : "md:text-right"}`}
    >
      {trailing}
    </span>
  );

  return (
    <div className={`${gridClass} gap-x-6 gap-y-2 py-5 border-b border-ink items-baseline`}>
      {nameCell}
      {isPriceFirst ? (
        <>
          {priceCell}
          {metaCell}
        </>
      ) : (
        <>
          {metaCell}
          {priceCell}
        </>
      )}
    </div>
  );
}
