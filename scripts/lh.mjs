// Mobile Lighthouse over the main routes. Usage: node scripts/lh.mjs [baseUrl] [outDir]
// Requires Chrome (CHROME_PATH) and network for `npx lighthouse`.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3100";
const out = path.resolve(process.argv[3] ?? ".lighthouse");
const routes = ["/", "/projects", "/projects/crlite-plus-cert-revocation", "/experience", "/about"];
fs.mkdirSync(out, { recursive: true });

const pct = (n) => Math.round(n * 100);
console.log("route".padEnd(40), "perf a11y bp  seo | FCP   LCP   TBT   CLS   | KB");
for (const route of routes) {
  const file = path.join(out, `${route === "/" ? "home" : route.slice(1).replaceAll("/", "_")}.json`);
  execFileSync(
    "npx",
    ["--yes", "lighthouse", base + route, "--chrome-flags=--headless=new --no-sandbox",
     "--only-categories=performance,accessibility,best-practices,seo", "--output=json", `--output-path=${file}`, "--quiet"],
    { stdio: "ignore", env: { ...process.env } },
  );
  const r = JSON.parse(fs.readFileSync(file, "utf8"));
  const c = r.categories, a = r.audits;
  console.log(
    route.padEnd(40),
    String(pct(c.performance.score)).padStart(4), String(pct(c.accessibility.score)).padStart(4),
    String(pct(c["best-practices"].score)).padStart(3), String(pct(c.seo.score)).padStart(4), "|",
    a["first-contentful-paint"].displayValue.padEnd(5), a["largest-contentful-paint"].displayValue.padEnd(5),
    a["total-blocking-time"].displayValue.padEnd(5), a["cumulative-layout-shift"].displayValue.padEnd(5), "|",
    Math.round(a["total-byte-weight"].numericValue / 1024),
  );
  const bad = Object.values(a).filter((x) => x.score !== null && x.score < 0.9 && !["informative", "notApplicable", "manual"].includes(x.scoreDisplayMode));
  if (bad.length) console.log("   issues:", bad.map((x) => `${x.id}:${pct(x.score)}`).join(", "));
}
