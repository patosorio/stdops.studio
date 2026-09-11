import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getGoogleSiteVerification } from "@/lib/env";

/**
 * Required by the App Router. `<html>` / `<body>` live on the locale layout so
 * `lang` can follow the URL. Do not add chrome here.
 */
export function generateMetadata(): Metadata {
  const google = getGoogleSiteVerification();
  return google ? { verification: { google } } : {};
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
