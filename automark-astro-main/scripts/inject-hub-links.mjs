/**
 * Ensure top spokes mention their cluster hub early in the body.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cluster-map.json"), "utf8"),
);

const TOP = [
  "seo-consultant-pune-vs-agency",
  "how-to-rank-seo-consultant-pune",
  "what-does-an-seo-consultant-do",
  "seo-consulting-pricing-india",
  "seo-consultant-vs-freelancer",
  "organic-seo-vs-paid",
  "how-to-choose-technical-seo-consultant",
  "technical-seo-for-ai-discovery",
  "javascript-rendering-and-ai-crawlers",
  "local-seo-consultant-checklist",
  "pune-hinjewadi-baner-seo-consultant-local-search",
  "local-seo-plus-ai-answers",
  "google-ai-overviews-practical-guide",
  "geo-generative-engine-optimization-basics",
  "ai-seo-roadmap-90-days",
  "perplexity-citation-strategies",
  "llm-seo-for-b2b-saas",
];

let n = 0;
for (const slug of TOP) {
  const post = map.posts[slug];
  if (!post || post.isHub) continue;
  const pillar = map.pillars[post.pillar];
  if (!pillar?.hub) continue;
  const hubPath = `/blog/${pillar.hub}`;
  const file = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(file)) continue;
  const raw = fs.readFileSync(file, "utf8");
  if (raw.includes(hubPath)) continue;
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) continue;
  const hubTitle =
    fs
      .readFileSync(path.join(blogDir, `${pillar.hub}.md`), "utf8")
      .match(/^title:\s*"(.*)"/m)?.[1] ?? pillar.hub;
  const note = `\n\n*Part of the [${hubTitle}](${hubPath}) cluster — start there for the full playbook.*\n`;
  // Insert after first paragraph block
  const body = m[2];
  const idx = body.search(/\n\n## /);
  const newBody =
    idx > 0 ? body.slice(0, idx) + note + body.slice(idx) : note + body;
  fs.writeFileSync(file, `---\n${m[1]}\n---\n${newBody.trim()}\n`, "utf8");
  n++;
}
console.log(`[inject-hub-links] Added hub links to ${n} spokes`);
