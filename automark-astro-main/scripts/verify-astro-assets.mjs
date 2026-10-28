/**
 * Fail the production ship if site HTML references /_astro/* files that
 * are not present in the repo root (prevents CSS 404 / unstyled site).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const skip = new Set([
  "automark-astro-main",
  "node_modules",
  "legacy-php",
  "theme-preview",
  ".git",
]);

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkHtml(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const htmlFiles = walkHtml(root);
const missing = new Set();
const re = /\/_astro\/([A-Za-z0-9_.@-]+\.(?:css|js|mjs|webp|png|svg|woff2?))/g;

for (const file of htmlFiles) {
  const text = readFileSync(file, "utf8");
  let m;
  while ((m = re.exec(text))) {
    const asset = m[1];
    if (!existsSync(join(root, "_astro", asset))) missing.add(asset);
  }
}

if (missing.size) {
  console.error(
    `[verify-astro-assets] ${missing.size} referenced /_astro assets are missing:`,
  );
  for (const a of [...missing].sort()) console.error(`  - ${a}`);
  console.error(
    "Commit these files from the build output before pushing/deploying.",
  );
  process.exit(1);
}

console.log(
  `[verify-astro-assets] OK — ${htmlFiles.length} HTML files, all /_astro refs present`,
);
