export function ProofStat({
  value,
  label,
  borderColor,
}: {
  value: string;
  label: string;
  borderColor: string;
}) {
  return (
    <div className="pl-4 min-w-0" style={{ borderLeft: `1px solid ${borderColor}` }}>
      <div
        className="tabular-nums font-bold text-[clamp(28px,8vw,40px)]"
        style={{ color: borderColor }}
      >
        {value}
      </div>
      <div className="text-xs uppercase tracking-[0.03em] mt-1.5">{label}</div>
    </div>
  );
}
