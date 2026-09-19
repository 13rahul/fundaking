import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const blogDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/content/blog");
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "-index.md");

for (const f of files.sort()) {
  const raw = fs.readFileSync(path.join(blogDir, f), "utf8");
  const draft = /^draft:\s*true/m.test(raw);
  let body = raw.replace(/^---[\s\S]*?---\n/, "");
  body = body.replace(/<figure[\s\S]*?<\/figure>/g, "");
  const words = body.replace(/[#*`_|>-]/g, " ").split(/\s+/).filter(Boolean).length;
  if (!draft && words < 550) console.log(`${words}\t${f}`);
}
