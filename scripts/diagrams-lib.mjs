// Shared drawing primitives for scripts/diagrams.mjs: plain SVG in the site's own colors and mono type.

export const C = {
  bg: "#1d2021", card: "#282828", fg: "#ebdbb2", dim: "#bdae93", faint: "#9a8c7c", line: "#3c3836",
  yellow: "#fabd2f", purple: "#d3869b", aqua: "#8ec07c", blue: "#83a598", orange: "#fe8019", green: "#b8bb26",
};
const FONT = `ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const text = (x, y, s, { size = 13, fill = C.fg, weight = 400, anchor = "start", rotate } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}"${
    rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : ""
  }>${esc(s)}</text>`;

/** A step: colored border, numbered title, dim detail lines. */
export function box(x, y, w, h, { color = C.faint, num, title, lines = [] }) {
  const out = [`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${C.card}" stroke="${color}" stroke-width="1.5"/>`];
  const head = (num ? `${num}  ` : "") + title;
  if (num) out.push(text(x + 14, y + 28, num, { fill: C.yellow, weight: 600, size: 15 }));
  out.push(text(x + 14 + (num ? 28 : 0), y + 28, title, { fill: C.fg, weight: 600, size: 15 }));
  void head;
  lines.forEach((l, i) => out.push(text(x + 14, y + 52 + i * 18, l, { fill: C.dim, size: 13 })));
  return out.join("\n");
}

/** A line with an arrowhead at the end (and at the start if `both`). */
const HEAD = { [C.orange]: "ao", [C.aqua]: "am", [C.green]: "ag" };
export function arrow(points, { color = C.faint, both = false, dash = false } = {}) {
  const d = points.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const id = HEAD[color] ?? "a";
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.5"${dash ? ' stroke-dasharray="5 4"' : ""} marker-end="url(#${id})"${both ? ' marker-start="url(#b)"' : ""}/>`;
}

export function svg({ w, h, title, desc, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="${FONT}">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="${C.faint}"/></marker>
<marker id="b" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="${C.faint}"/></marker>
${[["ao", C.orange], ["am", C.aqua], ["ag", C.green]].map(([id, c]) => `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="${c}"/></marker>`).join("\n")}
</defs>
<rect width="${w}" height="${h}" fill="${C.bg}"/>
${body}
</svg>
`;
}

export const legend = (x, y, items) =>
  items
    .map(([color, label], i) => `<rect x="${x}" y="${y + i * 24}" width="14" height="14" rx="2" fill="none" stroke="${color}" stroke-width="1.5"/>\n${text(x + 24, y + 12 + i * 24, label, { fill: C.dim, size: 13 })}`)
    .join("\n");


// ---------------------------------------------------------------- flowcharts

/** Anchor points of a rectangle given by its center: t, b, l, r are [x, y]. */
export function anchors(cx, cy, w, h) {
  return { cx, cy, w, h, t: [cx, cy - h / 2], b: [cx, cy + h / 2], l: [cx - w / 2, cy], r: [cx + w / 2, cy] };
}

const KIND = {
  box: { color: C.faint },
  pill: { color: C.faint },
  decision: { color: C.yellow },
  error: { color: C.orange },
  bad: { color: C.orange },
  good: { color: C.green },
  ai: { color: C.purple },
  lane: { color: C.aqua },
  fe: { color: C.blue },
};

/** A centered-label node. `kind` picks the shape (pill, decision) or the border color (error, good, ai...). */
export function flowNode(cx, cy, w, h, label, { kind = "box", color, dash = false } = {}) {
  const lines = Array.isArray(label) ? label : [label];
  const stroke = color ?? KIND[kind]?.color ?? C.faint;
  const dashAttr = dash ? ' stroke-dasharray="5 4"' : "";
  let shape;
  if (kind === "decision") {
    const k = 16;
    shape = `<polygon points="${cx - w / 2},${cy} ${cx - w / 2 + k},${cy - h / 2} ${cx + w / 2 - k},${cy - h / 2} ${cx + w / 2},${cy} ${cx + w / 2 - k},${cy + h / 2} ${cx - w / 2 + k},${cy + h / 2}" fill="${C.card}" stroke="${stroke}" stroke-width="1.5"${dashAttr}/>`;
  } else if (kind === "pill") {
    shape = `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${C.card}" stroke="${stroke}" stroke-width="1.5"${dashAttr}/>`;
  } else {
    shape = `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="4" fill="${C.card}" stroke="${stroke}" stroke-width="1.5"${dashAttr}/>`;
  }
  const lh = 16;
  const y0 = cy - ((lines.length - 1) * lh) / 2 + 4.5;
  const t = lines.map((l, i) => text(cx, y0 + i * lh, l, { size: 13, fill: C.fg, anchor: "middle" })).join("\n");
  return `${shape}\n${t}`;
}

/** Small label sitting on a line, with the background knocked out around the letters. */
export function lineLabel(x, y, s, { fill = C.dim, anchor = "middle" } = {}) {
  return `<text x="${x}" y="${y}" font-size="12" fill="${fill}" text-anchor="${anchor}" stroke="${C.bg}" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${esc(s)}</text>`;
}

/**
 * An orthogonal connector between two anchor points. Straight when aligned, otherwise one elbow in the middle.
 * `via` replaces the whole path with explicit waypoints (the start and end anchors are still added).
 * `style`: flow (default), msg (aqua, between lanes), err (orange dashed), ok (green).
 */
export function connect(from, to, { style = "flow", label, via, mid, labelAt, labelDx = 0, labelAnchor = "middle" } = {}) {
  const pts = [from];
  if (via) pts.push(...via);
  else if (from[0] !== to[0] && from[1] !== to[1]) {
    // horizontal-first when leaving sideways, vertical-first otherwise; the elbow sits halfway (or at `mid`)
    const horizontalFirst = Math.abs(to[0] - from[0]) >= Math.abs(to[1] - from[1]);
    if (horizontalFirst) {
      const mx = mid ?? (from[0] + to[0]) / 2;
      pts.push([mx, from[1]], [mx, to[1]]);
    } else {
      const my = mid ?? (from[1] + to[1]) / 2;
      pts.push([from[0], my], [to[0], my]);
    }
  }
  pts.push(to);
  const st = { flow: { color: C.faint }, msg: { color: C.aqua, dash: true }, err: { color: C.orange, dash: true }, ok: { color: C.green } }[style];
  let out = arrow(pts, st);
  if (label) {
    const i = labelAt ?? 0;
    const a = pts[i], b = pts[i + 1];
    const horiz = a[1] === b[1];
    const x = (a[0] + b[0]) / 2, y = (a[1] + b[1]) / 2;
    out += "\n" + lineLabel((horiz ? x : x + 4) + labelDx, horiz ? y - 6 : y + 4, label, { fill: st.color === C.faint ? C.dim : st.color, anchor: labelAnchor });
  }
  return out;
}

/** A swimlane band with its name in the corner. */
export function lane(x, y, w, h, name, color) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="${color}" stroke-opacity="0.45" stroke-width="1"/>\n${text(x + 12, y + 20, name, { fill: color, weight: 600, size: 12 })}`;
}
