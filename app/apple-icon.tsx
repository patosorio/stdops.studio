import { ImageResponse } from "next/og";
import { accentHex } from "@/lib/design/accents";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>
          std.ops
        </div>
        <div
          style={{
            width: 72,
            height: 4,
            background: accentHex.blue,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <div style={{ fontSize: 22, fontWeight: 100, letterSpacing: 2, lineHeight: 1 }}>
          studio_
        </div>
      </div>
    ),
    { ...size },
  );
}
