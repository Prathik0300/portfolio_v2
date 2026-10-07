// One-off asset pass: PNG diagrams -> WebP (max 1600px wide), written under public/img/<group>/.
// Usage: node scripts/optimize-images.mjs  (prints a JSON map of new path -> {width,height})
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MAP = {
  "public/projects/crlite/system_architecture.png": "crlite",
  "public/projects/crlite/data-flow-diagram.png": "crlite",
  "public/projects/crlite/pic1.png": "crlite",
  "public/projects/crlite/pic2.png": "crlite",
  "public/projects/crlite/pic3.png": "crlite",
  "public/projects/vem/vem_system_architecture.png": "vem",
  "public/projects/vem/emotion_recognition_pipeline.png": "vem",
  "public/projects/vem/sequence_diagram.png": "vem",
  "public/projects/vem/vem.png": "vem",
  "public/projects/ensogrow/user-flow-ensogrow.png": "ensogrow",
  "public/projects/ensogrow/task-flow-ensogrow.png": "ensogrow",
};

const out = {};
for (const [src, group] of Object.entries(MAP)) {
  const name = path.basename(src, ".png").replaceAll("_", "-");
  const dest = `public/img/${group}/${name}.webp`;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const info = await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(dest);
  out[`/${src.replace("public/", "")}`] = { to: `/${dest.replace("public/", "")}`, width: info.width, height: info.height, kb: Math.round(info.size / 1024) };
}
console.log(JSON.stringify(out, null, 2));
