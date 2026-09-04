import { ImageResponse } from "next/og";
import { accentHex } from "@/lib/design/accents";
import { isLocale } from "@/lib/i18n/config";
import { siteLegalName } from "@/lib/site";

export const alt = siteLegalName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "th";
  const kicker = locale === "th" ? "กรุงเทพฯ · ไทย" : "Bangkok · Thailand";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: accentHex.paper,
          color: accentHex.ink,
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
          std.ops
        </div>
        <div
          style={{
            width: 96,
            height: 4,
            background: accentHex.blue,
            marginTop: 20,
            marginBottom: 20,
          }}
        />
        <div style={{ fontSize: 36, fontWeight: 100, letterSpacing: 4, lineHeight: 1 }}>
          studio_
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>
      </div>
    ),
    { ...size },
  );
}
