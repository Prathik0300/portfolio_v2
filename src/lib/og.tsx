import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

/** Shared 1200x630 card, rendered at build time for static routes. */
export function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0d0e",
          backgroundImage: "radial-gradient(900px 420px at 90% -10%, rgba(45,212,196,0.22), rgba(10,13,14,0))",
          color: "#e9eeed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#2dd4c4", fontSize: 30, fontFamily: "monospace" }}>
          <div style={{ width: 36, height: 2, background: "#2dd4c4" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 48 ? 64 : 80, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a3afad", fontFamily: "monospace" }}>
          <span>~/prathik.dev</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
