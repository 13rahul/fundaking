import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const blogDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/content/blog",
);

function parseDateValue(raw) {
  const s = raw.trim().replace(/^["']|["']$/g, "");
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** @returns {Map<string, string>} pathname (no trailing slash) -> ISO lastmod */
export function collectBlogLastmods() {
  const map = new Map();
  if (!fs.existsSync(blogDir)) return map;

  for (const file of fs.readdirSync(blogDir)) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;

    const fm = fmMatch[1];
    const slug = file.replace(/\.(md|mdx)$/, "");
    const dateM = fm.match(/^date:\s*(.+)$/m);
    const modM = fm.match(/^date_modified:\s*(.+)$/m);

    const published = dateM ? parseDateValue(dateM[1]) : null;
    const modified = modM ? parseDateValue(modM[1]) : null;
    const base = published ?? modified ?? new Date();
    const last =
      modified && published && modified > published ? modified : modified ?? base;

    map.set(`/blog/${slug}`, last.toISOString());
  }

  return map;
}
