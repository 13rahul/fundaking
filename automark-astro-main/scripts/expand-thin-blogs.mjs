/**
 * Expands published blog posts under min word count with consultant-depth sections.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const MIN_WORDS = 750;
const MARKER = "<!-- fk-expanded -->";
const MARKER2 = "<!-- fk-expanded-2 -->";

function wordCount(body) {
  const clean = body
    .replace(/<figure[\s\S]*?<\/figure>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/[#*`_|>-]/g, " ");
  return clean.split(/\s+/).filter(Boolean).length;
}

function stripMd(s) {
  return s.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
}

function parsePost(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  const fm = m[1];
  const draft = /^draft:\s*true/m.test(fm);
  const titleM = fm.match(/^title:\s*"(.*)"/m);
  const descM = fm.match(/^description:\s*"(.*)"/m);
  const catM = fm.match(/categories:\s*\n\s*-\s*"(.*)"/) || fm.match(/categories:\s*\["(.*)"\]/);
  return {
    fm,
    body: m[2],
    draft,
    title: titleM?.[1] ?? "",
    description: descM?.[1] ?? "",
    category: catM?.[1] ?? "SEO",
  };
}

function expansionBlock(title, description, category) {
  const topic = stripMd(title);
  const angle = stripMd(description);
  return `
${MARKER}

## Why ${topic.toLowerCase().includes("pune") ? "Pune founders" : "founders"} should care now

${angle} That is not theory for me — it shows up on discovery calls when organic pipeline stalls or when AI answers describe a competitor instead of your brand. Search and answer engines reward **specific, verifiable pages**, not generic SEO filler.

If you are evaluating priorities, ask whether this topic touches **revenue pages** (pricing, product, comparisons) or **trust pages** (about, case studies, docs). Fix trust and structure before you scale content volume.

## Mistakes I see on live sites

- Chasing tactics from Twitter threads without a baseline audit in Search Console and analytics.
- Publishing more blogs when the root issue is indexation, faceted URLs, or slow LCP on money pages.
- Treating AI visibility as separate from technical SEO — crawlers and models both need clean HTML and consistent facts.
- Skipping internal links from new posts to BOFU pages, so traffic lands nowhere useful.

## A 30-day workflow you can run in-house

**Week 1 — Baseline:** Export top landing pages by impressions, list five prompts or queries buyers actually use, screenshot current AI/search results for your brand.

**Week 2 — Fix facts:** Align pricing, integrations, and founder bio across site, GBP, and LinkedIn. One wrong number in an old blog comment can poison summaries.

**Week 3 — Ship one asset:** Pick a single page tied to “${topic}” and rewrite the lede, add a comparison table or checklist, improve internal links.

**Week 4 — Measure:** Track qualified leads or demo requests from organic — not rank positions alone. Re-run your prompt library and log citation changes.

## When to bring in a consultant

Bring in senior help when engineering bandwidth exists but **prioritization** is missing — or when migrations, JavaScript rendering, or international structure block progress. I cap Fundaking engagements so strategy stays founder-led; [book a call](/contact) if you want a second opinion on scope.

## Related reading on Fundaking

- [What is AI SEO (2026 definition)](/blog/what-is-ai-seo-definition-2026)
- [GEO basics without hype](/blog/geo-generative-engine-optimization-basics)
- [SEO consultant in Pune — founder’s guide](/blog/seo-consultant-in-pune-founders-guide-2026)

*Category focus for this article: ${category}.*
`;
}

function expansionBlock2(title, category) {
  const topic = stripMd(title);
  return `
${MARKER2}

## Deep dive: applying “${topic}” on a real site

When I audit a site for this topic, I start with **crawl stats** and **Search Console landing pages** — not a keyword export. I want to see which URLs already earn impressions and whether the title and H1 promise the same thing. Misalignment here is the silent killer for both classic rankings and AI citations.

### Technical checks I run first

- Confirm money pages return 200 without redirect chains and appear in the XML sitemap.
- Compare rendered HTML vs view-source for key definitions (pricing, integrations, locations).
- Validate Organization, WebSite, and Article or BlogPosting schema against visible copy.
- Review internal links: every new blog should point to at least one service page and one proof page (case study or about).

### Content checks

- Does the first screen answer **who this is for** and **what changes after reading**?
- Are claims dated or sourced when you mention benchmarks or percentages?
- Is there a downloadable or scannable asset (checklist, table) assistants can quote?

### Measurement

Track **branded search lift**, **assisted conversions** from blog landing pages, and a simple **prompt/citation log** if ${category.includes("LLM") || category.includes("AI") ? "you care about LLM visibility" : "you publish thought leadership"}. Rankings alone are a lagging indicator; pipeline is the decision metric.

If you want help prioritizing, [contact Fundaking](/contact) for a free strategy call — I will tell you if this topic needs a consultant, better execution in-house, or both.
`;
}

function insertExpansion(body, block) {
  if (body.includes(MARKER) && body.includes(MARKER2)) return body;
  if (body.includes(MARKER) && block.includes(MARKER2)) {
    const sig = body.lastIndexOf("\n---\n\n*");
    if (sig > 0) return body.slice(0, sig) + block + body.slice(sig);
    return body.trim() + block + "\n";
  }
  if (body.includes(MARKER)) return body;
  const sig = body.lastIndexOf("\n---\n\n*");
  if (sig > 0) return body.slice(0, sig) + block + body.slice(sig);
  return body.trim() + block + "\n";
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md") && f !== "-index.md");
let expanded = 0;
for (const file of files) {
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const post = parsePost(raw);
  if (!post || post.draft) continue;
  if (wordCount(post.body) >= MIN_WORDS) continue;

  let newBody = post.body;
  if (!newBody.includes(MARKER)) {
    newBody = insertExpansion(newBody, expansionBlock(post.title, post.description, post.category));
  }
  if (wordCount(newBody) < MIN_WORDS && !newBody.includes(MARKER2)) {
    newBody = insertExpansion(newBody, expansionBlock2(post.title, post.category));
  }
  if (newBody === post.body) continue;
  fs.writeFileSync(path.join(blogDir, file), `---\n${post.fm}\n---\n${newBody.trim()}\n`, "utf8");
  expanded++;
}
console.log(`[expand-thin-blogs] Expanded ${expanded} posts toward ${MIN_WORDS}+ words`);
