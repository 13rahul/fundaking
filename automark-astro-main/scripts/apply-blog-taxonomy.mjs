/**
 * Retag blog categories from cluster-map.json; ensure demo posts stay draft.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cluster-map.json"), "utf8"),
);

const DEMO = new Set([
  "post-1",
  "post-2",
  "post-3",
  "post-4",
  "post-5",
  "post-6",
  "human-touch-ai-marketing",
]);

const FALLBACK_CATEGORY = {
  "AI SEO": "AI / Answer Engine SEO",
  "LLM SEO": "AI / Answer Engine SEO",
  Pricing: "Pricing & Hiring",
  Hiring: "Pricing & Hiring",
  "SEO Strategy": "SEO Consulting",
  Marketing: "SEO Consulting",
  Sales: "SEO Consulting",
  Technology: "Technical SEO",
};

let updated = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "-index.md")) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) continue;
  let fm = m[1];
  const body = m[2];

  if (DEMO.has(slug)) {
    if (!/^draft:\s*true/m.test(fm)) {
      if (/^draft:\s*/m.test(fm)) fm = fm.replace(/^draft:\s*.*$/m, "draft: true");
      else fm += "\ndraft: true";
    }
    fs.writeFileSync(path.join(blogDir, file), `---\n${fm}\n---\n${body}`, "utf8");
    updated++;
    continue;
  }

  const postMeta = map.posts[slug];
  let category = null;
  if (postMeta) {
    if (postMeta.category) category = postMeta.category;
    else if (postMeta.pillar && map.pillars[postMeta.pillar]) {
      category = map.pillars[postMeta.pillar].category;
    }
  }
  if (!category) {
    const catM =
      fm.match(/categories:\s*\["([^"]+)"\]/) ||
      fm.match(/categories:\s*\n\s*-\s*"([^"]+)"/);
    const old = catM?.[1];
    category = FALLBACK_CATEGORY[old] || old || "SEO Consulting";
  }

  if (/categories:\s*\[/.test(fm)) {
    fm = fm.replace(/categories:\s*\[[^\]]*\]/, `categories: ["${category}"]`);
  } else if (/categories:\s*\n\s*-\s*"/.test(fm)) {
    fm = fm.replace(/categories:\s*\n\s*-\s*"[^"]+"/, `categories: ["${category}"]`);
  } else {
    fm += `\ncategories: ["${category}"]`;
  }

  fs.writeFileSync(path.join(blogDir, file), `---\n${fm}\n---\n${body}`, "utf8");
  updated++;
}
console.log(`[apply-blog-taxonomy] Updated ${updated} posts`);
