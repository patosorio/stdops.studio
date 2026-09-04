import { getLineAddFriendUrl } from "@/lib/env";

type LineCtaVariant = "inline" | "sticky" | "big" | "full";

export function LineCta({
  label,
  variant = "inline",
}: {
  label: string;
  variant?: LineCtaVariant;
}) {
  const href = getLineAddFriendUrl();
  const isExternal = href.startsWith("https://");
  const externalProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const dot = <span className="w-2 h-2 rounded-full bg-accent-green inline-block" />;

  if (variant === "sticky") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-ink bg-paper p-3 pb-[max(0.75rem,var(--spacing-safe-bottom))] lg:hidden">
        <a
          href={href}
          className="flex items-center justify-center gap-2 border border-ink px-4 py-3 text-sm tracking-[0.02em]"
          {...externalProps}
        >
          {dot}
          {label}
        </a>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <a
        href={href}
        className="flex items-center justify-center gap-2.5 border border-ink px-4 py-5 text-base tracking-[0.02em] hover:border-accent-green transition-colors"
        {...externalProps}
      >
        {dot}
        {label}
      </a>
    );
  }

  const sizing = variant === "big" ? "px-7 py-3.5 text-sm gap-2.5" : "px-3.5 py-2 text-xs gap-2";

  return (
    <a
      href={href}
      className={`inline-flex items-center border border-ink tracking-[0.02em] hover:border-accent-green transition-colors ${sizing}`}
      {...externalProps}
    >
      {dot}
      {label}
    </a>
  );
}
