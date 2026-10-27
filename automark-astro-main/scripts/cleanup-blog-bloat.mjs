/**
 * Removes duplicate "Related reading" blocks (often 5–6 copies) and
 * re-injects a single cluster-aware related block.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const CLUSTER_MARKER = "<!-- fk-cluster-links -->";

const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, "cluster-map.json"), "utf8"),
);

const TITLE_CACHE = new Map();
function titleFor(slug) {
  if (TITLE_CACHE.has(slug)) return TITLE_CACHE.get(slug);
  const p = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(p)) {
    TITLE_CACHE.set(slug, slug);
    return slug;
  }
  const raw = fs.readFileSync(p, "utf8");
  const t = raw.match(/^title:\s*"(.*)"/m)?.[1] ?? slug;
  TITLE_CACHE.set(slug, t);
  return t;
}

function relatedBlock(slug) {
  const post = map.posts[slug];
  const lines = [];
  if (post) {
    const pillar = map.pillars[post.pillar];
    if (!post.isHub && pillar?.hub) {
      lines.push(`- [${titleFor(pillar.hub)}](/blog/${pillar.hub})`);
    }
    for (const sib of (post.siblings || []).slice(0, 2)) {
      if (sib === slug) continue;
      lines.push(`- [${titleFor(sib)}](/blog/${sib})`);
    }
    if (pillar?.service) {
      lines.push(`- [${pillar.serviceLabel}](${pillar.service})`);
    }
    if (pillar?.proof) {
      lines.push(`- [${pillar.proofLabel}](${pillar.proof})`);
    }
  }
  if (!lines.length) {
    lines.push(
      `- [What Is AI SEO? A Practical Definition for 2026](/blog/what-is-ai-seo-definition-2026)`,
      `- [Technical SEO audit checklist](/blog/technical-seo-audit-checklist-2026)`,
      `- [Local SEO India playbook](/blog/local-seo-india-playbook)`,
      `- [SEO consulting services](/seo-consulting-services)`,
    );
  }
  return `
${CLUSTER_MARKER}

## Related reading on Fundaking

${lines.join("\n")}
`;
}

function parsePost(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2], draft: /^draft:\s*true/m.test(m[1]) };
}

function stripDuplicateRelated(body) {
  return body.replace(
    /\n*(?:<!-- fk-cluster-links -->\s*)?## Related reading on Fundaking\n\n(?:- \[[^\]]+\]\([^)]+\)\n?)+/g,
    "\n",
  );
}

function ensureSignature(body) {
  if (/\*Rahul Agarwal — Fundaking Media/.test(body)) return body;
  return (
    body.trim() +
    `\n\n---\n\n*Rahul Agarwal — Fundaking Media. SEO consultant based in Pune / Baramati, serving founders across India.*\n`
  );
}

function injectRelatedBeforeSignature(body, slug) {
  const block = relatedBlock(slug).trim();
  const sig = body.search(/\n---\n\n\*Rahul Agarwal/);
  if (sig > 0) {
    return body.slice(0, sig) + "\n\n" + block + "\n" + body.slice(sig);
  }
  return body.trim() + "\n\n" + block + "\n";
}

const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".md") && f !== "-index.md");

let cleaned = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const post = parsePost(raw);
  if (!post || post.draft) {
    skipped++;
    continue;
  }

  const relatedCount = (
    post.body.match(/## Related reading on Fundaking/g) || []
  ).length;
  if (relatedCount <= 1 && post.body.includes(CLUSTER_MARKER)) {
    skipped++;
    continue;
  }

  let body = stripDuplicateRelated(post.body);
  body = body.replace(/\n{3,}/g, "\n\n");
  body = ensureSignature(body);
  body = injectRelatedBeforeSignature(body, slug);

  const payload = `---\n${post.fm}\n---\n\n${body.trim()}\n`;
  fs.writeFileSync(path.join(blogDir, file), payload, "utf8");
  cleaned++;
}

console.log(
  `[cleanup-blog-bloat] Deduped related reading on ${cleaned} posts (skipped ${skipped})`,
);
