export function AccentDot({ color }: { color: string }) {
  return (
    <span
      className="w-2 h-2 rounded-full inline-block shrink-0"
      style={{ background: color }}
    />
  );
}
