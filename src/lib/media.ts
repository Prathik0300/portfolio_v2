import type { Block, Figure, Project } from "@/content/types";

/** Every picture on a page in reading order: single figures and gallery items. */
export function figuresOf(p: Project): Figure[] {
  const out: Figure[] = [];
  for (const s of p.sections)
    for (const b of s.blocks) {
      if (b.type === "figure") out.push(b);
      else if (b.type === "gallery") out.push(...b.items);
    }
  return out;
}

/** `Fig. n` numbers, keyed by the figure object so the renderer can look them up. */
export function numberFigures(p: Project): Map<Figure, number> {
  return new Map(figuresOf(p).map((f, i) => [f, i + 1]));
}

const hasVideo = (b: Block) => b.type === "video";

/** "2 diagrams · 3 screenshots · demo video", counted from the page itself so it never goes stale. */
export function mediaSummary(p: Project): string {
  const figs = figuresOf(p);
  const d = figs.filter((f) => f.kind === "diagram").length;
  const s = figs.filter((f) => f.kind === "screenshot").length;
  const parts: string[] = [];
  if (d) parts.push(`${d} diagram${d === 1 ? "" : "s"}`);
  if (s) parts.push(`${s} screenshot${s === 1 ? "" : "s"}`);
  if (p.sections.some((sec) => sec.blocks.some(hasVideo))) parts.push("demo video");
  return parts.join(" · ");
}

export const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
