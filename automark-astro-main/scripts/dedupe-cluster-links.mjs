/**
 * Remove duplicate Related reading / fk-cluster-links blocks; keep the last one.
 * Also remove Related reading nested inside expansionBlock when a cluster block follows.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");

let fixed = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
  const p = path.join(blogDir, file);
  let raw = fs.readFileSync(p, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) continue;
  let body = m[2];
  const before = body;

  // Count cluster markers
  const markers = [...body.matchAll(/<!-- fk-cluster-links -->/g)];
  if (markers.length > 1) {
    // Keep only the last full cluster block; remove earlier ones
    const blocks = [];
    const re =
      /<!-- fk-cluster-links -->\n\n## Related reading on Fundaking\n\n(?:- \[[^\]]+\]\([^)]+\)\n)+/g;
    let match;
    while ((match = re.exec(body))) blocks.push(match[0]);
    if (blocks.length > 1) {
      const keep = blocks[blocks.length - 1];
      body = body.replace(re, "");
      // Also strip bare ## Related reading that duplicated without marker
      body = body.replace(
        /\n## Related reading on Fundaking\n\n(?:- \[[^\]]+\]\([^)]+\)\n)+/g,
        "\n",
      );
      body = body.trimEnd() + "\n\n" + keep;
    }
  } else {
    // Strip duplicate Related reading sections without marker when cluster exists
    const relatedRe =
      /\n## Related reading on Fundaking\n\n(?:- \[[^\]]+\]\([^)]+\)\n)+/g;
    const all = [...body.matchAll(relatedRe)];
    if (all.length > 1) {
      let i = 0;
      body = body.replace(relatedRe, () => {
        i++;
        return i < all.length ? "\n" : all[all.length - 1][0];
      });
    }
  }

  if (body !== before) {
    fs.writeFileSync(p, `---\n${m[1]}\n---\n${body.trim()}\n`, "utf8");
    fixed++;
  }
}
console.log(`[dedupe-cluster-links] Fixed ${fixed} posts`);
