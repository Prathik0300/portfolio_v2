// Draws the diagrams that did not exist on the old site, as plain SVG in the site's own colors.
// Run with: node scripts/diagrams.mjs   (writes public/img/diagrams/*.svg)
// Everything here comes from facts already in the write-ups; keep it that way when editing.
import { mkdirSync, writeFileSync } from "node:fs";

const C = {
  bg: "#1d2021", card: "#282828", fg: "#ebdbb2", dim: "#bdae93", faint: "#9a8c7c", line: "#3c3836",
  yellow: "#fabd2f", purple: "#d3869b", aqua: "#8ec07c", blue: "#83a598", orange: "#fe8019", green: "#b8bb26",
};
const FONT = `ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const text = (x, y, s, { size = 13, fill = C.fg, weight = 400, anchor = "start", rotate } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}"${
    rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : ""
  }>${esc(s)}</text>`;

/** A step: colored border, numbered title, dim detail lines. */
function box(x, y, w, h, { color = C.faint, num, title, lines = [] }) {
  const out = [`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${C.card}" stroke="${color}" stroke-width="1.5"/>`];
  const head = (num ? `${num}  ` : "") + title;
  if (num) out.push(text(x + 14, y + 28, num, { fill: C.yellow, weight: 600, size: 15 }));
  out.push(text(x + 14 + (num ? 28 : 0), y + 28, title, { fill: C.fg, weight: 600, size: 15 }));
  void head;
  lines.forEach((l, i) => out.push(text(x + 14, y + 52 + i * 18, l, { fill: C.dim, size: 13 })));
  return out.join("\n");
}

/** A line with an arrowhead at the end (and at the start if `both`). */
function arrow(points, { color = C.faint, both = false, dash = false } = {}) {
  const d = points.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.5"${dash ? ' stroke-dasharray="5 4"' : ""} marker-end="url(#a)"${both ? ' marker-start="url(#b)"' : ""}/>`;
}

function svg({ w, h, title, desc, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="${FONT}">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="${C.faint}"/></marker>
<marker id="b" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="${C.faint}"/></marker>
</defs>
<rect width="${w}" height="${h}" fill="${C.bg}"/>
${body}
</svg>
`;
}

const legend = (x, y, items) =>
  items
    .map(([color, label], i) => `<rect x="${x}" y="${y + i * 24}" width="14" height="14" rx="2" fill="none" stroke="${color}" stroke-width="1.5"/>\n${text(x + 24, y + 12 + i * 24, label, { fill: C.dim, size: 13 })}`)
    .join("\n");

// columns and rows shared by the two snake-shaped flow diagrams
const W = 270, H = 92, X = [50, 360, 670], Y = [30, 170, 310];
const mid = (i) => X[i] + W / 2;

// ---------------------------------------------------------------- program repair pipeline
function repairPipeline() {
  const b = [];
  const LLM = C.purple, TOOL = C.aqua, DATA = C.faint;
  b.push(box(X[0], Y[0], W, H, { color: DATA, num: "1", title: "Source code", lines: ["a C or C++ program", "that crashes"] }));
  b.push(box(X[1], Y[0], W, H, { color: TOOL, num: "2", title: "Strip comments", lines: ["so the model gets no", "human hints"] }));
  b.push(box(X[2], Y[0], W, H, { color: LLM, num: "3", title: "Seed script", lines: ["LLM writes a script that", "makes valid starting inputs"] }));
  b.push(box(X[2], Y[1], W, H, { color: TOOL, num: "4", title: "Fuzz", lines: ["AFL or AFL++ finds crashing", "inputs, afl-tmin shrinks them"] }));
  b.push(box(X[1], Y[1], W, H, { color: TOOL, num: "5", title: "Stack traces", lines: ["GDB trace for each crash,", "FNV-1a dedupe, keep five"] }));
  b.push(box(X[0], Y[1], W, H, { color: LLM, num: "6", title: "Repair", lines: ["LLM sees code, inputs and", "traces, and writes a patch"] }));
  b.push(box(X[0], Y[2], W, H, { color: TOOL, num: "7", title: "Compile, test, score", lines: ["compiles? crash gone? tests", "pass? how big is the edit?"] }));
  b.push(box(X[1], Y[2], W, H, { color: DATA, title: "Patch accepted", lines: ["crash fixed, tests pass"] }));
  // row 1 left to right, row 2 right to left (snake), then down the left side
  b.push(arrow([[X[0] + W, Y[0] + H / 2], [X[1], Y[0] + H / 2]]));
  b.push(arrow([[X[1] + W, Y[0] + H / 2], [X[2], Y[0] + H / 2]]));
  b.push(arrow([[mid(2), Y[0] + H], [mid(2), Y[1]]]));
  b.push(arrow([[X[2], Y[1] + H / 2], [X[1] + W, Y[1] + H / 2]]));
  b.push(arrow([[X[1], Y[1] + H / 2], [X[0] + W, Y[1] + H / 2]]));
  b.push(arrow([[mid(0), Y[1] + H], [mid(0), Y[2]]]));
  b.push(arrow([[X[0] + W, Y[2] + H / 2], [X[1], Y[2] + H / 2]], { color: C.green }));
  b.push(text(X[0] + W + 12, Y[2] + H / 2 - 8, "fixed", { fill: C.green, size: 13 }));
  // not fixed: back to the repair step, which remembers earlier attempts
  b.push(arrow([[X[0], Y[2] + H / 2], [30, Y[2] + H / 2], [30, Y[1] + H / 2], [X[0], Y[1] + H / 2]], { color: C.orange, dash: true }));
  b.push(text(20, Y[2] + H / 2 + 30, "not fixed: retry", { fill: C.orange, size: 12, rotate: -90 }));
  b.push(legend(X[2], Y[2] + 4, [[LLM, "LLM step"], [TOOL, "tool or program step"], [DATA, "input or outcome"]]));
  b.push(text(X[2], Y[2] + H + 18, "On each retry the model remembers", { fill: C.faint, size: 12 }));
  b.push(text(X[2], Y[2] + H + 33, "what it tried before.", { fill: C.faint, size: 12 }));
  return svg({
    w: 960, h: 440,
    title: "Program repair pipeline",
    desc: "Seven steps: strip comments from the source, have an LLM write a seed-input script, fuzz with AFL to find and shrink crashing inputs, collect GDB stack traces, ask the LLM for a patch using the code, inputs and traces, then compile, test and score the patch. If it is not fixed the loop goes back to the repair step.",
    body: b.join("\n"),
  });
}

// ---------------------------------------------------------------- program repair results
function repairResults() {
  const rows = [
    { label: "code only", fixed: 38, of: "5 of 13", attempts: 4 },
    { label: "code + stack traces", fixed: 69, of: "9 of 13", attempts: 3 },
    { label: "code + traces + crashing inputs", fixed: 85, of: "11 of 13", attempts: 2 },
  ];
  const b = [];
  const left = 310, barMax = 450, rowH = 44;
  const panel = (title, y0, fn, color) => {
    b.push(text(30, y0, title, { fill: C.yellow, weight: 600, size: 15 }));
    rows.forEach((r, i) => {
      const y = y0 + 22 + i * rowH;
      const { len, val } = fn(r);
      b.push(text(left - 14, y + 19, r.label, { fill: C.dim, size: 13, anchor: "end" }));
      b.push(`<rect x="${left}" y="${y}" width="${barMax}" height="26" fill="${C.line}"/>`);
      b.push(`<rect x="${left}" y="${y}" width="${Math.round(barMax * len)}" height="26" fill="${color}"/>`);
      b.push(text(left + barMax + 14, y + 19, val, { fill: C.fg, size: 14, weight: 600 }));
    });
  };
  panel("share of the 13 programs fixed", 34, (r) => ({ len: r.fixed / 100, val: `${r.fixed}%  (${r.of})` }), C.aqua);
  panel("median attempts to get a fix", 214, (r) => ({ len: r.attempts / 4, val: String(r.attempts) }), C.blue);
  b.push(text(30, 392, "13 crashing C programs: 10 written for the study, 3 from AFL's demos. GPT-4o mini.", { fill: C.faint, size: 12 }));
  return svg({
    w: 960, h: 410,
    title: "Program repair results",
    desc: "Fixes rose from 38 percent with code only, to 69 percent with stack traces, to 85 percent with traces and crashing inputs. Median attempts fell from 4 to 3 to 2.",
    body: b.join("\n"),
  });
}

// ---------------------------------------------------------------- RadioFX: rebuild pipeline
function rebuildPipeline() {
  const b = [];
  const AI = C.purple, TOOL = C.aqua, DATA = C.faint;
  b.push(box(X[0], Y[0], W, H, { color: DATA, num: "1", title: "Existing site", lines: ["the customer's current", "website"] }));
  b.push(box(X[1], Y[0], W, H, { color: TOOL, num: "2", title: "Scrape", lines: ["the site's content and", "assets"] }));
  b.push(box(X[2], Y[0], W, H, { color: TOOL, num: "3", title: "Audit", lines: ["SEO, security and UX", "gaps"] }));
  b.push(box(X[2], Y[1], W, H, { color: AI, num: "4", title: "Regenerate", lines: ["Gemini API builds a modern", "site from what was scraped"] }));
  b.push(box(X[1], Y[1], W, H, { color: TOOL, num: "5", title: "Deploy", lines: ["to dedicated infrastructure,", "with no manual setup"] }));
  b.push(box(X[0], Y[1], W, H, { color: DATA, num: "6", title: "New site", lines: ["modernized, live for", "the customer"] }));
  b.push(box(X[0], Y[2], W, H, { color: C.blue, title: "RadioFX API suite", lines: ["chat, polls, streaming,", "contests"] }));
  b.push(arrow([[X[0] + W, Y[0] + H / 2], [X[1], Y[0] + H / 2]]));
  b.push(arrow([[X[1] + W, Y[0] + H / 2], [X[2], Y[0] + H / 2]]));
  b.push(arrow([[mid(2), Y[0] + H], [mid(2), Y[1]]]));
  b.push(arrow([[X[2], Y[1] + H / 2], [X[1] + W, Y[1] + H / 2]]));
  b.push(arrow([[X[1], Y[1] + H / 2], [X[0] + W, Y[1] + H / 2]]));
  b.push(arrow([[mid(0), Y[1] + H], [mid(0), Y[2]]], { both: true, color: C.blue }));
  b.push(text(mid(0) + 12, Y[1] + H + 28, "wired into", { fill: C.blue, size: 13 }));
  b.push(legend(X[1], Y[2] + 4, [[AI, "generated with Gemini"], [TOOL, "automated step"], [C.blue, "existing RadioFX services"], [DATA, "input or outcome"]]));
  return svg({
    w: 960, h: 420,
    title: "Website rebuild pipeline",
    desc: "A customer's existing site is scraped for pages, content and assets, audited for SEO, security and UX gaps, regenerated with the Gemini API, and deployed to dedicated infrastructure. The new site is wired into the RadioFX API suite of chat, polls, streaming and contests.",
    body: b.join("\n"),
  });
}

// ---------------------------------------------------------------- RadioFX: delivery path
function deliveryPath() {
  const b = [];
  const CI = C.aqua;
  const w4 = 200, gap = 53, x0 = 40;
  const col = (i) => x0 + i * (w4 + gap);
  const y = 40, h = 88;
  b.push(box(col(0), y, w4, h, { color: C.faint, num: "1", title: "Git commit", lines: ["the change is pushed"] }));
  b.push(box(col(1), y, w4, h, { color: CI, num: "2", title: "CI", lines: ["Trivy scans the build", "before it can ship"] }));
  b.push(box(col(2), y, w4, h, { color: CI, num: "3", title: "ArgoCD", lines: ["syncs the cluster to", "what is in git"] }));
  b.push(box(col(3), y, w4, h, { color: C.blue, num: "4", title: "GKE", lines: ["multi-tenant cluster", "serves the traffic"] }));
  for (let i = 0; i < 3; i++) b.push(arrow([[col(i) + w4, y + h / 2], [col(i + 1), y + h / 2]]));
  b.push(box(col(3), y + 150, w4, h, { color: C.orange, title: "Terraform", lines: ["provisions the GKE", "infrastructure"] }));
  b.push(arrow([[col(3) + w4 / 2, y + 150], [col(3) + w4 / 2, y + h]], { color: C.orange }));
  b.push(text(col(3) + w4 / 2 + 10, y + 143, "provisions", { fill: C.orange, size: 12 }));
  // deploy time, before and after
  const by = y + 176, bx = x0, barMax = 420;
  b.push(text(bx, by - 14, "minutes to deploy", { fill: C.yellow, weight: 600, size: 14 }));
  const bars = [["Jenkins (before)", 40, C.faint], ["GitOps on GKE (after)", 10, C.aqua]];
  bars.forEach(([label, v, color], i) => {
    const yy = by + i * 58;
    const len = Math.round((barMax * v) / 40);
    b.push(text(bx, yy, label, { fill: C.dim, size: 12 }));
    b.push(`<rect x="${bx}" y="${yy + 10}" width="${len}" height="24" fill="${color}"/>`);
    b.push(text(bx + len + 10, yy + 27, `${v} min`, { fill: C.fg, weight: 600, size: 13 }));
  });
  return svg({
    w: 1000, h: 340,
    title: "Delivery path on GKE",
    desc: "A git commit goes through CI with a Trivy scan, then ArgoCD syncs the multi-tenant GKE cluster to what is in git. Terraform provisions the GKE infrastructure. Deploys went from 40 minutes on Jenkins to 10 minutes.",
    body: b.join("\n"),
  });
}

mkdirSync("public/img/diagrams", { recursive: true });
const out = { "program-repair-pipeline": repairPipeline(), "program-repair-results": repairResults(), "rebuild-pipeline": rebuildPipeline(), "delivery-path": deliveryPath() };
for (const [name, s] of Object.entries(out)) {
  writeFileSync(`public/img/diagrams/${name}.svg`, s);
  console.log(`public/img/diagrams/${name}.svg  ${(s.length / 1024).toFixed(1)} KB`);
}
