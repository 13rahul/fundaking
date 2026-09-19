import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "src/content/blog");

const author = "Rahul Agarwal";
const authorTitle = "Founder, Fundaking Media";
const authorImage = "/images/og-image.png";
const images = [
  "/images/blog/post-1.png",
  "/images/blog/post-2.png",
  "/images/blog/post-3.png",
  "/images/blog/post-4.png",
  "/images/blog/post-5.png",
  "/images/blog/post-6.png",
  "/images/blog/featured-cover.png",
];

const posts = [
  {
    slug: "what-is-ai-seo-definition-2026",
    title: "What Is AI SEO? A Practical Definition for 2026",
    meta_title: "What Is AI SEO? Definition & Scope (2026)",
    description:
      "AI SEO is not a plugin — it is how you earn visibility when machines summarize, cite, and route users across classic search and answer engines.",
    category: "AI SEO",
    tag: "Foundations",
    date: "2026-02-01",
    body: `AI SEO describes the work of making a brand, product, or publisher discoverable when retrieval systems — not only ten blue links — decide what to show. That includes Google AI Overviews, Bing Copilot, Perplexity-style answer engines, and embedded assistants inside SaaS tools.

Classic SEO still matters: crawlable HTML, strong internal linking, and intent-mapped URLs. AI SEO adds **entity clarity** (who you are, what you solve), **evidence density** (stats, methods, primary sources), and **consistency** across the open web so models can confidently cite you.

## Three layers practitioners use

1. **Technical layer** — indexation, schema, performance, and clean information architecture so bots and RAG crawlers can fetch facts without guesswork.
2. **Semantic layer** — topic maps, glossary pages, and FAQ structures that align with how people ask conversational questions.
3. **Reputation layer** — reviews, third-party mentions, and expert bylines that signal trust when an model chooses one source over another.

## What AI SEO is not

It is not spamming AI-written pages, nor buying “GEO packages” with no measurement plan. Treat AI visibility like a new SERP surface: define entities, publish verifiable claims, and track branded citations over time.`,
  },
  {
    slug: "llm-seo-vs-traditional-seo",
    title: "LLM SEO vs Traditional SEO: Same Goal, Different Surfaces",
    meta_title: "LLM SEO vs Traditional SEO | Comparison",
    description:
      "Ranking in classic search and being cited in LLM answers overlap — but success metrics and page formats diverge. Here is how to plan for both.",
    category: "LLM SEO",
    tag: "Strategy",
    date: "2026-01-28",
    body: `Traditional SEO optimizes for ranked URLs, snippets, and click-through. LLM SEO optimizes for **inclusion in synthesized answers** — often with no click at all.

Shared foundation: crawl access, canonical discipline, and pages that match intent. Where they diverge:

| Traditional SEO | LLM-oriented SEO |
| --- | --- |
| Title tags & meta descriptions | Clear H1 + definitional lede |
| Keyword in H2s | Question-shaped headings |
| Backlink volume | Mention quality & entity graphs |
| CTR from SERP | Citation rate in AI answers |

Teams that ignore LLM surfaces risk invisible brand erosion: competitors become the default name models repeat. Teams that ignore classic SEO still lose the traffic that feeds remarketing and sales calls.`,
  },
  {
    slug: "how-chatgpt-chooses-sources-to-cite",
    title: "How Answer Engines Choose Sources to Cite",
    meta_title: "How LLMs Choose Sources to Cite",
    description:
      "Citation is not random. Retrieval, recency, authority heuristics, and text clarity all influence which URLs appear in AI-generated answers.",
    category: "LLM SEO",
    tag: "Citations",
    date: "2026-01-25",
    body: `When an assistant cites a URL, it usually passed through **retrieval** (fetching candidate documents) and **ranking** (picking the most useful passages). Publishers win when pages are easy to chunk: short paragraphs, explicit definitions, and headings that mirror user questions.

Signals that help:

- **Primary research** or first-party data with dates
- **Author identity** tied to the topic (credentials, sameAs links)
- **Stable URLs** without aggressive interstitials blocking fetchers
- **Consensus alignment** — claims that match reputable references elsewhere

Testing method: ask the same question across multiple engines monthly; log which domains repeat and which sentences get quoted verbatim.`,
  },
  {
    slug: "entity-seo-for-ai-overviews",
    title: "Entity SEO for AI Overviews and Knowledge Panels",
    meta_title: "Entity SEO for AI Overviews",
    description:
      "Models resolve brands and people as entities. Structured identity data and consistent naming improve odds of accurate AI summaries.",
    category: "AI SEO",
    tag: "Entities",
    date: "2026-01-22",
    body: `Search systems map strings to entities — companies, products, people, places. When your entity is ambiguous (“Apex” could be anything), models hedge or omit you.

Build entity clarity:

- Organization schema with \`sameAs\` to official profiles
- A dedicated **About** narrative using one canonical brand name
- Product pages that state category, audience, and differentiators in plain language
- Wikipedia/Wikidata not required, but **consistent third-party descriptions** help

Audit: search your brand + “what is” in an AI interface. If the answer describes the wrong company, fix naming collisions before publishing more content.`,
  },
  {
    slug: "structured-data-for-llm-crawlers",
    title: "Structured Data That Helps LLM Crawlers",
    meta_title: "Structured Data for LLM Crawlers",
    description:
      "JSON-LD will not guarantee AI citations, but it reduces ambiguity for products, FAQs, and how-to content machines must parse quickly.",
    category: "AI SEO",
    tag: "Technical",
    date: "2026-01-19",
    body: `Structured data is a compression layer for facts: price, availability, steps, authorship. For LLM pipelines that convert HTML to text, schema still matters because extractors use it to validate on-page copy.

High-value types for B2B and publishers:

- \`FAQPage\` for concise Q&A blocks (avoid duplicate visible content)
- \`Article\` with \`author\` and \`dateModified\`
- \`Product\` or \`SoftwareApplication\` with feature lists
- \`HowTo\` when procedures are the asset

Keep JSON-LD aligned with visible content. Mismatch is both a quality violation and a trust hit when models cross-check passages.`,
  },
  {
    slug: "geo-generative-engine-optimization-basics",
    title: "GEO Basics: Generative Engine Optimization Without the Hype",
    meta_title: "Generative Engine Optimization (GEO) Basics",
    description:
      "GEO is the practice of improving how often and how accurately generative systems represent your brand — measured, not guessed.",
    category: "LLM SEO",
    tag: "GEO",
    date: "2026-01-16",
    body: `Generative Engine Optimization (GEO) is a label for work you already recognize: **clear writing, authoritative evidence, and fetchable pages** — tuned for answer synthesis.

A sober GEO program includes:

1. **Prompt library** — 30–50 real buyer questions per category
2. **Baseline audit** — who gets cited today for each prompt
3. **Content gaps** — missing definitions, comparisons, and data
4. **Off-site consistency** — profiles, directories, and PR that reinforce facts
5. **Monthly re-test** — citation share, sentiment, accuracy fixes

Skip black-hat “AI bait” paragraphs stuffed with synonyms. Models and search systems both penalize low-utility fluff over time.`,
  },
  {
    slug: "measuring-visibility-in-ai-search",
    title: "How to Measure Visibility in AI Search",
    meta_title: "Measure AI Search Visibility",
    description:
      "Impressions in Search Console will not tell the whole story. Combine prompt tracking, brand mention monitoring, and referral anomalies.",
    category: "AI SEO",
    tag: "Analytics",
    date: "2026-01-13",
    body: `Measurement is immature but not impossible. Build a lightweight scorecard:

- **Citation rate** — % of tracked prompts where your domain is linked or named
- **Share of voice** — how often you appear vs three fixed competitors
- **Accuracy** — false claims about pricing, integrations, or leadership
- **Assist traffic** — direct/referral spikes after AI product launches

Log prompts in a spreadsheet by funnel stage (awareness, comparison, implementation). Run the same batch after major content or PR releases to see movement.`,
  },
  {
    slug: "brand-mentions-vs-backlinks-in-llm-era",
    title: "Brand Mentions vs Backlinks in the LLM Era",
    meta_title: "Brand Mentions vs Backlinks for LLM SEO",
    description:
      "Links still move classic rankings, but unlinked mentions train entity association for models that read the whole web.",
    category: "LLM SEO",
    tag: "Off-site",
    date: "2026-01-10",
    body: `Large language models ingest corpora where **brand strings** appear in context: reviews, podcasts, forums, docs. A mention with strong co-occurring keywords (“ACME CRM for healthcare”) teaches associations even without a hyperlink.

Practical balance:

- Keep link earning for high-intent money pages
- Pursue **mention-rich placements** — guest expert quotes, benchmark reports, niche communities
- Ensure spelling consistency; models treat “Acme” and “ACME.io” as different tokens early on

Track both backlink growth and mention volume; when citations in AI answers rise after PR, you have a leading indicator classic tools miss.`,
  },
  {
    slug: "content-clarity-signals-for-rag-systems",
    title: "Content Clarity Signals That Help RAG Systems",
    meta_title: "Content Clarity for RAG & AI Search",
    description:
      "Retrieval-augmented generation pulls chunks, not whole sites. Write passages that stand alone and declare context up front.",
    category: "LLM SEO",
    tag: "Content",
    date: "2026-01-07",
    body: `RAG pipelines split pages into chunks. If a section starts mid-thought, the embedding vector is weak and the chunk never surfaces.

Clarity patterns:

- **Lead with the claim** — “Enterprise SSO adds SAML and SCIM in Q2.”
- **Repeat the subject** — avoid “It also supports…” without naming the product
- **Use tables** for comparisons; models quote tabular facts reliably
- **Date your statistics** — time-stamped numbers reduce hallucination risk

Rewrite one high-value page using the “chunk test”: each H2 section should make sense if pasted alone into chat.`,
  },
  {
    slug: "eeat-and-ai-generated-answers",
    title: "E-E-A-T When Answers Are Generated for You",
    meta_title: "E-E-A-T and AI-Generated Answers",
    description:
      "Experience, expertise, authority, and trust matter more when an algorithm paraphrases your site — or a competitor’s.",
    category: "AI SEO",
    tag: "Trust",
    date: "2026-01-04",
    body: `AI answers compress the SERP into one voice. If that voice trusts your competitor’s documentation more, you lose the narrative.

Show real experience:

- Case numbers with methodology, not vanity metrics
- Named authors with role-specific bios
- Update logs on technical docs
- Transparent limitations (“not ideal for regulated X without Y”)

Avoid anonymous 500-word AI posts on money topics. Quality raters and retrieval filters both deprioritize generic content farms — and models learn the same patterns.`,
  },
  {
    slug: "technical-seo-for-ai-discovery",
    title: "Technical SEO Still Gates AI Discovery",
    meta_title: "Technical SEO for AI Discovery",
    description:
      "If fetchers cannot render or index a page, no amount of thought leadership will appear in synthesized answers.",
    category: "AI SEO",
    tag: "Technical",
    date: "2025-12-30",
    body: `AI crawlers inherit the same bottlenecks as Googlebot: robots rules, soft 404s, infinite faceted URLs, and JavaScript-only content.

Priority fixes:

- Allow reputable AI/search bots where policy permits
- Server-side render critical copy or use dynamic rendering for bots
- Canonicalize duplicate tag pages
- Publish a clean sitemap of **evergreen explainer URLs**

Run log analysis specifically for AI-related user agents and compare crawl depth to your top explainer pages.`,
  },
  {
    slug: "conversational-query-mapping-for-llm-seo",
    title: "Conversational Query Mapping for LLM SEO",
    meta_title: "Conversational Query Mapping for LLM SEO",
    description:
      "Map how buyers actually talk to assistants, then align URLs and passages to those phrasings — not just Keyword Planner exports.",
    category: "LLM SEO",
    tag: "Research",
    date: "2025-12-27",
    body: `Voice and chat queries are longer, messier, and context-dependent. Build a **conversation map**:

- Trigger situation (“our churn spiked after pricing change”)
- Information need (“how to model price elasticity for SaaS”)
- Evaluation (“X vs Y for mid-market”)
- Risk (“SOC 2 timeline if we switch vendors”)

Each node becomes a page section or FAQ. Use exact question strings as H2s where it reads naturally — retrieval systems match embedding similarity to user prompts.`,
  },
  {
    slug: "product-data-feeds-and-ai-shopping",
    title: "Product Data Feeds and AI Shopping Surfaces",
    meta_title: "Product Feeds for AI Shopping",
    description:
      "Merchant feeds power classic Shopping tabs; the same structured product truth feeds conversational commerce and agent checkout experiments.",
    category: "AI SEO",
    tag: "Commerce",
    date: "2025-12-24",
    body: `When assistants recommend products, they lean on **structured attributes**: GTIN, brand, price, availability, return policy. Thin or stale feeds produce wrong recommendations and chargebacks of trust.

Checklist:

- Align on-page product schema with Merchant Center fields
- Keep variant grouping consistent (size/color SKUs)
- Document shipping and warranty in plain text near add-to-cart
- Refresh sale prices quickly — models repeat outdated numbers

Treat feed QA as weekly ops, not a one-time launch task.`,
  },
  {
    slug: "forums-reddit-and-llm-training-signals",
    title: "Forums, Reddit, and LLM Training Signals",
    meta_title: "Forums & Reddit in LLM Visibility",
    description:
      "Community threads surface in answers for software, finance, and health queries. Participate ethically; do not astroturf.",
    category: "LLM SEO",
    tag: "Community",
    date: "2025-12-21",
    body: `Community platforms rank because they contain **authentic comparisons** and failure stories. Models cite them when official marketing pages feel thin.

Guidelines:

- Assign subject-matter experts to answer technical threads
- Link to docs, not landing pages, when it helps the asker
- Disclose affiliation; moderation policies punish stealth marketing
- Summarize recurring objections into your own FAQ to reclaim narrative on-site

Monitor brand subreddits and niche Slack/Discord archives where your ICP asks pre-sales questions.`,
  },
  {
    slug: "author-bylines-and-expertise-for-ai-citations",
    title: "Author Bylines and Expertise for AI Citations",
    meta_title: "Author Bylines for AI Citations",
    description:
      "Named experts with verifiable credentials increase the odds your article is chosen over anonymous content farms.",
    category: "LLM SEO",
    tag: "Trust",
    date: "2025-12-18",
    body: `Authorship is a ranking feature in human search and a trust feature in AI retrieval. Pages with clear \`Person\` schema, LinkedIn/GitHub links, and topic-specific history win tie-breakers.

Program elements:

- Author hub pages listing articles by theme
- Peer review for YMYL topics
- Original diagrams and code samples attributed to the author
- Speak-at events and podcasts linked from the bio

When an answer engine quotes “According to [Name], [Role] at [Org]…”, you want that name to be yours.`,
  },
  {
    slug: "javascript-rendering-and-ai-crawlers",
    title: "JavaScript Rendering and AI Crawlers",
    meta_title: "JavaScript Rendering & AI Crawlers",
    description:
      "SPAs that hide copy behind client bundles remain risky. Test what fetchers actually receive in raw HTML.",
    category: "AI SEO",
    tag: "Technical",
    date: "2025-12-15",
    body: `Many crawlers execute limited JavaScript. If your pricing table mounts after hydration, retrieval may index an empty shell.

Mitigations:

- SSR or SSG for marketing and docs
- Critical content in initial HTML
- Avoid lazy-loading above-the-fold text
- Use \`curl\` and “fetch as Google” equivalents for AI bots where documented

Compare rendered DOM vs view-source on template pages quarterly.`,
  },
  {
    slug: "multilingual-llm-seo-strategy",
    title: "Multilingual LLM SEO Strategy",
    meta_title: "Multilingual LLM SEO",
    description:
      "Models cross languages in one session. Hreflang alone is not enough — localize entities, units, and regulatory context.",
    category: "LLM SEO",
    tag: "International",
    date: "2025-12-12",
    body: `A user may ask in Hindi and expect English sources, or vice versa. Publish **locale-native explainers**, not machine-translated clones.

Tactics:

- Local case studies and currency examples
- Glossary pages for terms that do not translate literally
- \`hreflang\` + localized schema \`inLanguage\`
- Monitor AI answers per locale separately

Poor translations create entity drift — the model learns the wrong product description in that market.`,
  },
  {
    slug: "ai-search-zero-click-strategy",
    title: "Zero-Click AI Search: Strategy When Clicks Drop",
    meta_title: "Zero-Click AI Search Strategy",
    description:
      "When answers satisfy intent in-chat, optimize for brand recall, follow-up searches, and owned audience channels.",
    category: "AI SEO",
    tag: "Strategy",
    date: "2025-12-09",
    body: `Zero-click is not new; featured snippets started it. AI answers accelerate the trend for top-funnel queries.

Adapt:

- Win **accurate naming** so users search your brand next
- Offer tools, templates, and newsletters worth seeking directly
- Use LLM visibility for **category creation**, not only lead gen
- Measure branded search lift after citation wins

Some pages should intentionally be citation magnets; others remain conversion workhorses — split KPIs by template type.`,
  },
  {
    slug: "auditing-site-for-geo-readiness",
    title: "Auditing Your Site for GEO Readiness",
    meta_title: "GEO Readiness Audit Checklist",
    description:
      "A 90-minute audit covering fetch access, entity pages, evidence, and prompt-based citation tests.",
    category: "LLM SEO",
    tag: "GEO",
    date: "2025-12-06",
    body: `Run this checklist before committing to a GEO content sprint:

1. Robots and HTTP status — no accidental blocks on docs
2. About, product, and pricing clarity — one sentence value prop each
3. Top 10 buyer prompts tested in two answer engines
4. Schema parity with visible facts
5. Author and date on all explainers
6. External profile consistency (LinkedIn, G2, Crunchbase)

Score each 0–2; prioritize items below 1 before publishing new blogs.`,
  },
  {
    slug: "future-search-agents-and-seo",
    title: "Search Agents and the Next SEO Inflection",
    meta_title: "Search Agents & the Future of SEO",
    description:
      "Autonomous agents will query APIs, compare vendors, and execute tasks. Structured APIs and trust signals become the new ranking factors.",
    category: "AI SEO",
    tag: "Future",
    date: "2025-12-03",
    body: `Agentic search shifts work from “find a link” to “complete a task.” Sites that expose **machine-readable offers** — APIs, pricing tiers, integration lists, SLAs — will be easier for agents to recommend.

Prepare:

- Public docs with OpenAPI specs where relevant
- Clear eligibility rules (“teams over 50 seats”)
- Human escalation paths for high-stakes decisions
- Policy pages agents can quote for compliance questions

SEO evolves into **discoverability + operability**: can a machine both find and act on your information responsibly?`,
  },
];

function frontmatter(p, i) {
  const img = images[i % images.length];
  const tags =
    p.category === "LLM SEO" ? ["llm-seo", "geo"] : ["ai-seo", "search"];
  return `---
title: "${p.title.replace(/"/g, '\\"')}"
meta_title: "${p.meta_title.replace(/"/g, '\\"')}"
description: "${p.description.replace(/"/g, '\\"')}"
date: ${p.date}T08:00:00Z
image: "${img}"
author: "${author}"
author_title: "${authorTitle}"
author_image: "${authorImage}"
tag: "${p.tag}"
read_time: "7 min read"
categories: ["${p.category}"]
tags: ${JSON.stringify(tags)}
draft: false
---

${p.body.trim()}
`;
}

for (let i = 0; i < posts.length; i++) {
  const p = posts[i];
  const file = path.join(outDir, `${p.slug}.md`);
  fs.writeFileSync(file, frontmatter(p, i), "utf8");
  console.log("wrote", p.slug);
}

console.log(`Done: ${posts.length} posts.`);
