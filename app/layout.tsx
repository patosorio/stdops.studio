import type { ReactNode } from "react";

/**
 * Required by the App Router. `<html>` / `<body>` live on the locale layout so
 * `lang` can follow the URL. Do not add chrome here.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
