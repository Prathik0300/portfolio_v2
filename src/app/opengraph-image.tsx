import { ogCard, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Prathik Pugazhenthi, software engineer";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogCard({
    command: "cat README.md",
    title: "Prathik Pugazhenthi",
    lines: ["Software engineer in Chicago.", "Infrastructure for AI systems."],
  });
}
