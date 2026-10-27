/**
 * Replaces the shared thin "Why this matters for Indian founders" template
 * with topic-specific long-form bodies (~1700+ words), keeping frontmatter,
 * infographics, and a single cluster related-links block.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const CLUSTER_MARKER = "<!-- fk-cluster-links -->";
const THIN_MARKER = "Why this matters for Indian founders";

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

function parsePost(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  const fm = m[1];
  const title = fm.match(/^title:\s*"(.*)"/m)?.[1] ?? "";
  const description = fm.match(/^description:\s*"(.*)"/m)?.[1] ?? "";
  const cat =
    fm.match(/categories:\s*\n\s*-\s*"(.*)"/)?.[1] ||
    fm.match(/categories:\s*\["(.*)"\]/)?.[1] ||
    "SEO";
  return {
    fm,
    body: m[2],
    draft: /^draft:\s*true/m.test(fm),
    title,
    description,
    category: cat,
  };
}

function extractFigures(body) {
  const figs = [];
  const re = /<figure class="blog-infographic">[\s\S]*?<\/figure>/g;
  let match;
  while ((match = re.exec(body))) figs.push(match[0]);
  return figs;
}

function relatedBlock(slug) {
  const post = map.posts[slug];
  const lines = [];
  let service = "/seo-consulting-services";
  let serviceLabel = "SEO consulting services";
  let proof = "/case-study/";
  let proofLabel = "Case studies";
  if (post) {
    const pillar = map.pillars[post.pillar];
    if (pillar?.service) {
      service = pillar.service;
      serviceLabel = pillar.serviceLabel;
    }
    if (pillar?.proof) {
      proof = pillar.proof;
      proofLabel = pillar.proofLabel;
    }
    if (!post.isHub && pillar?.hub) {
      lines.push(`- [${titleFor(pillar.hub)}](/blog/${pillar.hub})`);
    }
    for (const sib of (post.siblings || []).slice(0, 2)) {
      if (sib === slug) continue;
      lines.push(`- [${titleFor(sib)}](/blog/${sib})`);
    }
  }
  lines.push(`- [${serviceLabel}](${service})`);
  lines.push(`- [${proofLabel}](${proof})`);
  return { block: `\n${CLUSTER_MARKER}\n\n## Related reading on Fundaking\n\n${lines.join("\n")}\n`, service, serviceLabel, proof, proofLabel };
}

function pillarAngle(pillar) {
  switch (pillar) {
    case "technical-seo":
      return {
        buyer: "engineering-aware founders and marketing leads who own crawl, index, and template quality",
        win: "money URLs that load, resolve, and stay indexable without weekly fire drills",
        fail: "shipping blog posts while product and category templates leak equity through redirects, bloat, and JS-only copy",
      };
    case "local-seo":
      return {
        buyer: "multi-location and service-area businesses across India who need Maps and call volume — not vanity rankings",
        win: "consistent NAP, strong GBP, and city pages that convert WhatsApp and phone leads",
        fail: "directory spam and thin city clones that never earn a call",
      };
    case "ai-answer-engine":
      return {
        buyer: "SaaS and B2B teams watching AI Overviews and assistants reshape CTR on head terms",
        win: "citable passages, clean entities, and a path from answer surfaces to demos",
        fail: "publishing ‘AI content’ volume while money pages disagree on facts and stay hard to crawl",
      };
    default:
      return {
        buyer: "founders hiring or managing SEO who need pipeline — not report theatre",
        win: "a prioritised roadmap tied to demos, calls, and revenue URLs",
        fail: "agencies optimising keywords while BOFU pages stay thin, slow, or contradictory",
      };
  }
}

function topicExtras(slug, topic, service, serviceLabel) {
  const s = slug.toLowerCase();
  if (s.includes("shopify") || s.includes("woocommerce") || s.includes("ecommerce") || s.includes("faceted")) {
    return `## Ecommerce-specific notes for “${topic}”

Collection and product templates leak equity when filters create infinite URLs, when canonicals point at the wrong parent, and when product schema disagrees with on-page price or availability. Before new content, sample ten live product URLs and ten collection+filter URLs. Confirm indexation intent. Pair this with [${serviceLabel}](${service}) tickets that engineering can merge without another discovery call.

India D2C teams should also watch Core Web Vitals on 4G — heavy theme apps kill both classic rankings and the patience of buyers who bounce before the answer loads.`;
  }
  if (s.includes("local") || s.includes("maps") || s.includes("gbp") || s.includes("nap") || s.includes("citation") || s.includes("whatsapp") || s.includes("baramati") || s.includes("clinic") || s.includes("real-estate") || s.includes("service-area") || s.includes("multi-city")) {
    return `## Local / Maps-specific notes for “${topic}”

For India service businesses, Google Business Profile categories, services, photos, and review velocity often move calls faster than another blog. Keep NAP identical across site, GBP, and the few directories that matter. City pages need unique proof (service area, photos, FAQs) — not spun paragraphs.

WhatsApp and click-to-call are the conversion events. If “${topic}” does not change those within a month, revisit prioritisation with [${serviceLabel}](${service}).`;
  }
  if (s.includes("ai") || s.includes("llm") || s.includes("geo") || s.includes("overview") || s.includes("entity") || s.includes("prompt") || s.includes("citation") || s.includes("rag") || s.includes("answer")) {
    return `## Answer-engine notes for “${topic}”

AI Overviews and assistants reward quotable passages and consistent entities. Put the answer in initial HTML. Use one question-style H2 buyers actually type. Keep Organization and author facts boring and identical to [About](/about).

Do not buy vanity AI-rank tools before you have a five-query screenshot sheet and a demo/call log. Use the [AI Overview optimization checklist](/blog/ai-overview-optimization-checklist) as the scorecard, then execute via [${serviceLabel}](${service}) when prioritisation is the bottleneck.`;
  }
  if (s.includes("saas") || s.includes("pricing") || s.includes("agency") || s.includes("consultant") || s.includes("rfp") || s.includes("kpi") || s.includes("reporting") || s.includes("roadmap") || s.includes("in-house")) {
    return `## Hiring and operating notes for “${topic}”

Founders usually need a scorecard for agencies and consultants: access to the strategist, a 90-day roadmap tied to revenue URLs, and reporting CEOs will read. If “${topic}” is about operating model, write acceptance criteria into the SOW — crawl fixes, BOFU rewrites, and pipeline metrics — not “X keywords in top 10.”

Use [${serviceLabel}](${service}) when you want founder-led advisory without junior account-manager theatre.`;
  }
  return `## Operating notes for “${topic}”

Ship one URL well, measure pipeline, then expand. Prefer a living checklist your team reuses over a one-off article nobody opens after publish. When you outgrow DIY prioritisation, [${serviceLabel}](${service}) is scoped so strategy stays founder-led from Pune / Baramati.`;
}

function buildBody(slug, title, description, category, figs) {
  const post = map.posts[slug];
  const pillar = post?.pillar || "seo-consulting";
  const angle = pillarAngle(pillar);
  const { block, service, serviceLabel, proof, proofLabel } = relatedBlock(slug);
  const fig1 = figs[0] ? `\n\n${figs[0]}\n` : "";
  const fig2 = figs[1] ? `\n\n${figs[1]}\n` : "";
  const topic = title.replace(/"/g, "");
  const extras = topicExtras(slug, topic, service, serviceLabel);

  return `${description}

This article is written for ${angle.buyer}. The outcome that matters is ${angle.win}. The failure mode I see weekly is ${angle.fail}.

## What “${topic}” means in practice

${description} In client work from Pune / Baramati across India, I treat this as a **decision page**: what breaks if we ignore it, what we ship in 30 days, and how we know it worked.

Ask three questions before tactics:

1. Which **revenue URL** does this topic support (pricing, product, location, demo, service)?
2. What would a sceptical buyer still doubt after reading?
3. What will we measure in 30 days — demos, calls, WhatsApp leads, or qualified pipeline?

If those answers are vague, more paragraphs will not create topical authority. Fix the money URL and the measurement sheet first.

## Diagnostic: how I audit this in one working session

| Step | What I collect | Pass signal |
| --- | --- | --- |
| Baseline | Search Console landing pages + top queries/prompts (90 days) | You can name five buyer intents |
| SERP / answer check | Screenshots of classic results and any AI overview | You know who currently wins |
| Crawl / index | Status codes, canonicals, sitemap inclusion on money URLs | Primary URLs return 200 and are indexable |
| Facts | Pricing, NAP, founder bio, offers across site + profiles | No contradictions |
| Path to revenue | Internal links from education → BOFU → CTA | One clear next step |

Bring this sheet into the same meeting where you review pipeline — not a separate “SEO theatre” call.

## Priority order (do not skip ahead)

**P0 — Technical and factual truth.** Money pages must be crawlable, fast enough on mobile India networks, and factually aligned with schema and sales decks. Without this, content and citations rot.

**P1 — One strong asset for “${topic}”.** Rewrite or build a single page with a clear lede, a table or checklist, FAQ that matches visible copy, and proof. Prefer depth on one URL over five thin posts.

**P2 — Cluster wiring.** Link hub ↔ this spoke ↔ siblings ↔ [${serviceLabel}](${service}) ↔ [${proofLabel}](${proof}). Anchors should name the destination topic.

**P3 — Measurement.** Track qualified enquiries and a simple visibility log. Rankings alone are a lagging vanity metric.
${fig1}
${extras}

## Implementation checklist you can copy

### Content

- [ ] First screen states who it is for and what changes after reading
- [ ] At least one table, numbered process, or checklist assistants and humans can scan
- [ ] Claims with numbers are dated or scoped (India, SaaS, local, sample)
- [ ] Author / entity facts match [About](/about) and Organization schema
- [ ] One primary CTA — not every service stuffed into every section

### Technical

- [ ] Canonical 200 on the target URL; listed in XML sitemap; no accidental noindex
- [ ] Critical definitions present in initial HTML (not only after hydration)
- [ ] No redirect chains or soft-404s on revenue templates
- [ ] Internal links from three existing relevant URLs into this page

### Commercial

- [ ] CTA matches intent (audit call vs Maps setup vs AI enablement vs technical fix)
- [ ] Proof link to a real case study when claims get specific
- [ ] Sales can forward this URL after a call without apology

## 30-day workflow for a small team

**Week 1 — Baseline.** Export GSC; list five buyer queries or prompts tied to “${topic}”; screenshot SERPs; list P0 defects on the revenue URL.

**Week 2 — Fix facts and crawl.** Align NAP, pricing, and founder bio. Ship engineering tickets with acceptance criteria (status code, visible copy, schema match).

**Week 3 — Ship the asset.** Publish or rewrite the primary page. Add the table/checklist. Wire hub and service links.

**Week 4 — Measure and decide.** Log demos/calls. Re-check SERP or AI screenshots. Decide: continue DIY, add advisory, or pause volume until P0 is green.
${fig2}
## Mistakes that waste a quarter

1. Publishing more blogs while money URLs are uncrawlable or contradictory  
2. Chasing tactics from threads without a Search Console baseline  
3. Treating AI visibility, local Maps, and technical SEO as unrelated silos  
4. Skipping internal links from education posts to BOFU pages  
5. Measuring rankings alone instead of qualified enquiries  
6. Letting agencies deliver keyword greenery while the founder never sees the five-query sheet  

## How this maps to Fundaking work

If your team can execute tickets, start with a scoped audit and roadmap. If priorities thrash weekly, use monthly advisory so the same strategist who diagnoses stays in the loop. That is how [${serviceLabel}](${service}) is scoped from Pune / Baramati for India and remote teams.

When claims need proof, point to [${proofLabel}](${proof}). Category focus for this article: **${category}**.

## Field playbook: applying this with one marketer

Indian founding teams usually have one marketer wearing five hats. You cannot boil the ocean. Pick the single revenue URL this article supports, fix crawl and facts first, then ship one scannable asset sales can send after a call.

Use a shared Sheet with: URL, owner, due date, status, KPI. Review it in the pipeline meeting. If engineering is blocked, write the ticket with acceptance criteria so the PR can be reviewed without another discovery call.

## FAQ

**Is this only for Pune?**  
No — Pune / Baramati is the operating base; most work is remote across India. Local proof helps services businesses; national category SEO still dominates for most SaaS.

**Do we need more content first?**  
Only after money URLs are crawlable, factual, and linked from the cluster. Volume without architecture dilutes topical authority.

**How does AI search change this?**  
Classic technical quality and entity clarity still gate citations. See [What Is AI SEO?](/blog/what-is-ai-seo-definition-2026) and the [AI Overview optimization checklist](/blog/ai-overview-optimization-checklist).

**When should we hire help?**  
When engineering bandwidth exists but prioritisation is missing — or when migrations, JS rendering, or multi-location structure block progress. [Book a call](/contact) if you want a second opinion on scope.

**What is the fastest win?**  
Fix contradictory facts, improve one BOFU page tied to “${topic}”, and add hub ↔ spoke ↔ service links. Then expand depth.

${block}
---

*Rahul Agarwal — Fundaking Media. SEO consultant based in Pune / Baramati, serving founders across India.*
`;
}

const SKIP = new Set([
  "ai-overview-optimization-checklist",
  "google-ai-overviews-practical-guide",
]);

const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".md") && f !== "-index.md");

let deepened = 0;
for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  if (SKIP.has(slug)) continue;
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const post = parsePost(raw);
  if (!post || post.draft) continue;
  if (!post.body.includes(THIN_MARKER)) continue;

  let fm = post.fm;
  if (!/^date_modified:/m.test(fm)) {
    fm = fm.replace(
      /^(date:\s*.+)$/m,
      `$1\ndate_modified: 2026-10-27T06:00:00Z`,
    );
  } else {
    fm = fm.replace(
      /^date_modified:\s*.+$/m,
      `date_modified: 2026-10-27T06:00:00Z`,
    );
  }
  if (/^read_time:/m.test(fm)) {
    fm = fm.replace(/^read_time:\s*.+$/m, `read_time: "15 min read"`);
  }

  const figs = extractFigures(post.body);
  const body = buildBody(
    slug,
    post.title,
    post.description,
    post.category,
    figs,
  );
  const payload = `---\n${fm}\n---\n\n${body.trim()}\n`;
  fs.writeFileSync(path.join(blogDir, file), payload, "utf8");
  deepened++;
}

console.log(
  `[deepen-template-blogs] Replaced thin template on ${deepened} posts`,
);
