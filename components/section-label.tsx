export function SectionLabel({
  children,
  size = "sm",
}: {
  children: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "text-lg" : "text-sm";
  return (
    <h2 className={`${sizeClass} uppercase tracking-[0.03em] mb-4`}>{children}</h2>
  );
}
