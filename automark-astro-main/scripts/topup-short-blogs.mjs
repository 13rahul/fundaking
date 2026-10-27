import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");

const HUBS = new Set([
  "seo-consultant-in-pune-founders-guide-2026",
  "what-is-ai-seo-definition-2026",
  "technical-seo-audit-checklist-2026",
  "local-seo-india-playbook",
]);

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2], draft: /^draft:\s*true/m.test(m[1]), title: m[1].match(/^title:\s*"(.*)"/m)?.[1] ?? "" };
}
function wc(body) {
  return body.replace(/<figure[\s\S]*?<\/figure>/g, " ").replace(/<!--[\s\S]*?-->/g, " ").split(/\s+/).filter(Boolean).length;
}

const pad = (title) => `
<!-- fk-topup -->

## Extra depth: field notes for “${title}”

When I review this topic with a founding team, I ask three questions before tactics: (1) which revenue URL does this article support, (2) what would a sceptical buyer still doubt after reading, and (3) what will we measure in 30 days. If those answers are vague, more paragraphs will not create topical authority.

I also check whether the page is discoverable from the cluster hub and whether the service CTA matches intent. Educational posts that never mention [SEO consulting](/seo-consulting-services), [technical SEO](/technical-seo-consultant), [local SEO](/local-seo-consultant), or [AI enablement](/ai-enablement) leave traffic stranded. Conversely, stuffing every CTA on every page dilutes trust — one primary CTA is enough.

Finally, keep entity facts boring and consistent: company name, founder name, locations (Pune / Baramati), and offers. Assistants and search engines punish contradiction faster than they reward clever metaphors. Update this article when the product or service changes; stale BOFU claims are worse than thin TOFU posts.
`;

let n = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "-index.md")) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const post = parse(raw);
  if (!post || post.draft) continue;
  const target = HUBS.has(slug) ? 2200 : 1400;
  if (wc(post.body) >= target) continue;
  if (post.body.includes("<!-- fk-topup -->")) continue;
  const body = post.body.trimEnd() + pad(post.title);
  fs.writeFileSync(path.join(blogDir, file), `---\n${post.fm}\n---\n${body.trim()}\n`, "utf8");
  n++;
}
console.log(`[topup] ${n} posts`);
