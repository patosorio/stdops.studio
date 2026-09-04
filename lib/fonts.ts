import { IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted via next/font so Safari/Chrome do not wait on fonts.googleapis.com.
 * Explicit weights (not a naked variable font) so Safari maps font-thin / font-bold
 * onto real faces instead of synthesizing them.
 */
export const fontMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "400", "700"],
  variable: "--font-jetbrains",
  display: "swap",
  adjustFontFallback: true,
});

export const fontThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-thai",
  display: "swap",
  adjustFontFallback: true,
});
