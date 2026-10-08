// Prints first-load JS (gzip) per prerendered route from the production build.
// Usage: node scripts/js-budget.mjs   (run after `next build`)
//
// Next 16 + React 19 is a fixed cost, measured from the bare /_global-error page.
// The budget is "framework floor + app code", with app code capped per route.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(process.env.NEXT_DIST_DIR ?? ".next");
const pages = path.join(root, "server/app");
const APP_CODE_BUDGET_KB = 15;

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".html") ? [path.join(d, e.name)] : [],
  );

const rows = walk(pages)
  .sort()
  .map((file) => {
    const html = fs.readFileSync(file, "utf8");
    const srcs = [
      ...new Set(
        [...html.matchAll(/<script\b[^>]*\bsrc="(\/_next\/static\/[^"]+\.js)"[^>]*>/g)]
          .filter((m) => !/noModule/i.test(m[0])) // legacy polyfills never load in modern browsers
          .map((m) => m[1]),
      ),
    ];
    const bytes = srcs.reduce((sum, s) => {
      const p = path.join(root, "static", s.replace("/_next/static/", ""));
      return fs.existsSync(p) ? sum + zlib.gzipSync(fs.readFileSync(p)).length : sum;
    }, 0);
    const route = "/" + path.relative(pages, file).replace(/\.html$/, "").replace(/^index$/, "");
    return { route, kb: bytes / 1024 };
  });

const floor = rows.find((r) => r.route === "/_global-error")?.kb ?? 0;
console.log(`framework floor (bare page): ${floor.toFixed(1)} KB gz\n`);

let failed = false;
for (const r of rows) {
  if (r.route === "/_global-error") continue;
  const app = r.kb - floor;
  const ok = app <= APP_CODE_BUDGET_KB;
  failed ||= !ok;
  console.log(
    `${ok ? "ok  " : "OVER"} ${r.route.padEnd(48)} ${r.kb.toFixed(1).padStart(6)} KB total  (+${app.toFixed(1)} KB app, budget +${APP_CODE_BUDGET_KB})`,
  );
}
process.exit(failed ? 1 : 0);
