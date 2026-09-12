import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { accentHex } from "@/lib/design/accents";
import { getGoogleSiteVerification } from "@/lib/env";
import { fontMono, fontThai } from "@/lib/fonts";
import { defaultLocale } from "@/lib/i18n/config";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: accentHex.paper,
  colorScheme: "light",
};

export function generateMetadata(): Metadata {
  const google = getGoogleSiteVerification();
  return google ? { verification: { google } } : {};
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={defaultLocale}
      className={`${fontMono.variable} ${fontThai.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen min-h-dvh flex flex-col font-mono">{children}</body>
    </html>
  );
}
