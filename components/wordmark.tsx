export function Wordmark({
  variant = "compact",
  inverted = false,
  className = "",
}: {
  variant?: "compact" | "full";
  inverted?: boolean;
  className?: string;
}) {
  const inkClass = inverted ? "text-paper" : "text-ink";
  const full = variant === "full";

  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${full ? "gap-wordmark" : "gap-wordmark-compact"} ${className}`}
    >
      <span
        className={`font-mono font-bold tracking-wordmark ${inkClass} ${full ? "text-wordmark" : "text-wordmark-compact"}`}
      >
        std.ops
      </span>
      <span
        className={`shrink-0 bg-accent-blue ${full ? "w-wordmark-rule" : "w-wordmark-rule-compact"} h-wordmark-rule`}
        aria-hidden
      />
      <span
        className={`font-mono font-thin tracking-wordmark-studio ${inkClass} ${full ? "text-wordmark-studio" : "text-wordmark-studio-compact"}`}
      >
        studio_
      </span>
    </span>
  );
}
