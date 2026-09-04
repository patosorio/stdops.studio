export function PageTitle({
  children,
  className = "mb-12",
}: {
  children: string;
  className?: string;
}) {
  return (
    <h1 className={`text-[clamp(32px,5vw,52px)] tracking-[-0.02em] font-bold ${className}`}>
      {children}
    </h1>
  );
}
