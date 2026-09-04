export function ImagePlaceholder({
  label,
  ratio = "video",
}: {
  label: string;
  ratio?: "video" | "photo" | "case";
}) {
  const aspect =
    ratio === "photo" ? "aspect-[4/5]" : ratio === "case" ? "aspect-[4/3]" : "aspect-video";

  return (
    <div
      className={`w-full border border-ink ${aspect} flex items-center justify-center px-4 text-center text-xs uppercase tracking-[0.03em] opacity-60`}
    >
      {label}
    </div>
  );
}
