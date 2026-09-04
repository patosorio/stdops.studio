import type { BlogBlock } from "@/lib/blog/types";
import { AccentDot } from "./accent-dot";

export function BlogPostBody({
  blocks,
  color,
  bodyFont,
}: {
  blocks: BlogBlock[];
  color: string;
  bodyFont: string;
}) {
  return (
    <div className="border-t border-ink pt-10">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index} className={`${bodyFont} text-base leading-[1.6] mb-5 last:mb-0`}>
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="text-lg uppercase tracking-[0.03em] mt-10 mb-4 first:mt-0 flex items-center gap-2"
            >
              <AccentDot color={color} />
              {block.text}
            </h2>
          );
        }
        return (
          <ul key={index} className={`${bodyFont} text-base leading-[1.6] mb-5 last:mb-0 pl-5 list-disc`}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
