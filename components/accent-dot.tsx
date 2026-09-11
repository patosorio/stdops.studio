export function AccentDot({ color }: { color: string }) {
  return (
    <span
      className="w-2 h-2 rounded-full inline-block shrink-0 ring-1 ring-ink"
      style={{ background: color }}
    />
  );
}
