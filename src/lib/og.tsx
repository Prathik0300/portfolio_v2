import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const font = (weight: 400 | 600) => readFile(path.join(process.cwd(), `src/assets/fonts/IBMPlexMono-${weight}.ttf`));

/** Social card styled like the site: a prompt, then the page as the output. Rendered at build time. */
export async function ogCard({ command, title, lines }: { command: string; title: string; lines: string[] }) {
  const [regular, bold] = await Promise.all([font(400), font(600)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#1d2021",
          color: "#ebdbb2",
          fontFamily: "Plex",
          fontSize: 30,
        }}
      >
        <div style={{ display: "flex" }}>
          <span style={{ color: "#b8bb26", fontWeight: 600 }}>prathik@chicago</span>
          <span style={{ color: "#9a8c7c" }}>:</span>
          <span style={{ color: "#83a598" }}>~</span>
          <span>$ {command}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: title.length > 34 ? 58 : 76, fontWeight: 600, lineHeight: 1.12 }}>{title}</div>
          <div style={{ display: "flex", flexDirection: "column", color: "#bdae93", fontSize: 30, gap: 6 }}>
            {lines.map((l) => (
              <div key={l} style={{ display: "flex" }}>
                {l}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", color: "#9a8c7c", fontSize: 26 }}>prathikpugazhenthi.dev</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Plex", data: regular, weight: 400, style: "normal" },
        { name: "Plex", data: bold, weight: 600, style: "normal" },
      ],
    },
  );
}
