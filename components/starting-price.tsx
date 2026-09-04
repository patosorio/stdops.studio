export function StartingPrice({ label, price }: { label: string; price: string }) {
  return (
    <div className="flex items-baseline gap-4 flex-wrap border-t border-ink pt-6">
      <span className="text-[13px] uppercase tracking-[0.03em]">{label}</span>
      <span className="tabular-nums text-[28px] font-bold">{price}</span>
    </div>
  );
}
