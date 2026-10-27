// Updates w/h in src/content/photos.ts to match the files in public/assets/photos.
// Run after replacing a photo:  node scripts/sync-photo-sizes.mjs
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const file = new URL("../src/content/photos.ts", import.meta.url);
let src = readFileSync(file, "utf8");

for (const m of [...src.matchAll(/src: "(\/assets\/photos\/[^"]+)",\s*\n\s*w: \d+, h: \d+,/g)]) {
  const { width, height } = await sharp(new URL(`../public${m[1]}`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")).metadata();
  const next = m[0].replace(/w: \d+, h: \d+/, `w: ${width}, h: ${height}`);
  src = src.replace(m[0], next);
  console.log(m[1], `${width}x${height}`);
}
writeFileSync(file, src);
