import Link from "next/link";
import { AccentDot } from "./accent-dot";

export function BlogPostRow({
  href,
  date,
  title,
  excerpt,
  color,
  bodyFont,
}: {
  href: string;
  date: string;
  title: string;
  excerpt: string;
  color: string;
  bodyFont: string;
}) {
  return (
    <Link
      href={href}
      className="grid grid-cols-1 md:grid-cols-[minmax(140px,auto)_minmax(0,1fr)] gap-x-8 gap-y-2 py-8 border-b border-ink no-underline items-baseline"
    >
      <time className="tabular-nums text-xs uppercase tracking-[0.03em]">{date}</time>
      <div>
        <div className="font-bold text-lg mb-2 flex items-center gap-2 min-w-0">
          <AccentDot color={color} />
          {title}
        </div>
        <p className={`${bodyFont} text-sm leading-[1.5] m-0`}>{excerpt}</p>
      </div>
    </Link>
  );
}
