export const accents = {
  blue: "var(--color-accent-blue)",
  yellow: "var(--color-accent-yellow)",
  red: "var(--color-accent-red)",
  green: "var(--color-accent-green)",
  ink: "var(--color-ink)",
} as const;

/** Hex copies of the CSS tokens — Satori / OG images cannot resolve `var()`. */
export const accentHex = {
  blue: "#4600FD",
  yellow: "#F8FF28",
  red: "#FF00FA",
  green: "#00FF3A",
  ink: "#000000",
  paper: "#ffffff",
} as const;

export type Accent = keyof typeof accents;
