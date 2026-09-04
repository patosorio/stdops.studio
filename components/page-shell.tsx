import type { ReactNode } from "react";

type PageShellWidth = "wide" | "copy" | "narrow";

const WIDTH: Record<PageShellWidth, string> = {
  wide: "max-w-[1400px]",
  copy: "max-w-[1100px]",
  narrow: "max-w-[900px]",
};

export function PageShell({
  children,
  width = "wide",
}: {
  children: ReactNode;
  width?: PageShellWidth;
}) {
  return (
    <section className={`px-5 md:px-12 py-10 md:py-20 ${WIDTH[width]}`}>
      {children}
    </section>
  );
}
