/**
 * Seed 6 topical-authority deepener posts + register in cluster-map.json.
 * Run: node automark-astro-main/scripts/seed-authority-deepeners.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const mapPath = path.join(__dirname, "cluster-map.json");
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));

const posts = [
  {
    slug: "seo-for-edtech-coaching-india",
    pillar: "seo-consulting",
    title: "SEO for Edtech and Coaching Institutes in India",
    meta: "Edtech & Coaching SEO India | Fundaking",
    desc: "How coaching institutes and edtech brands win organic demos — course pages, city hubs, and trust signals that convert parents and learners.",
    tag: "Vertical",
    tags: ["edtech", "coaching", "seo-consulting"],
    siblings: [
      "seo-roadmap-for-saas-founders-india",
      "content-cluster-strategy-b2b-india",
      "seo-for-funded-startups-india",
    ],
    body: `Indian coaching and edtech sites usually fail SEO the same way: a homepage promise, a thin “courses” dump, and blog posts that never touch the money URLs. Parents and working professionals search for outcomes — exam names, batch cities, fee clarity, faculty proof — not “innovative learning ecosystem.”

This spoke sits under the [SEO consultant in Pune founder’s guide](/blog/seo-consultant-in-pune-founders-guide-2026). Pair it with [content cluster strategy for B2B India](/blog/content-cluster-strategy-b2b-india) when you need the architecture, not more articles.

## The money URLs that matter

| Page type | Job | Failure mode |
| --- | --- | --- |
| Course / program | Convert search → enquiry | Vague syllabus, no fees, no next batch |
| Exam / goal hub | Capture “JEE / CA / IELTS” intent | Thin doorway pages |
| City / centre | Local + franchise demand | Duplicate NAP, fake addresses |
| Comparison / vs | Steal mid-funnel | Sales fluff without table |
| Faculty / results | Trust | Unverifiable claims |

If those five templates are weak, publishing “10 tips for students” will not create topical authority.

## Cluster map for one program

Pick **one** flagship program. Build:

1. Program page (BOFU) with fees band, eligibility, duration, CTA  
2. Two supporting explainers (syllabus depth, who it is for)  
3. One comparison (vs competitor or vs self-study)  
4. FAQ block that matches sales objections  
5. Internal links from blog → program → contact / WhatsApp  

Then expand to the next program. Volume without this spine dilutes crawl and trust.

## Local vs national edtech

Coaching centres with physical classrooms need [local SEO](/blog/local-seo-india-playbook) plus organic. Pure online edtech needs national category SEO and demo KPIs — see [SEO roadmap for SaaS founders](/blog/seo-roadmap-for-saas-founders-india). Do not force Maps strategies onto a pan-India LMS.

## Compliance and YMYL tone

Education is trust-sensitive. Avoid guaranteed-rank claims, unverifiable “100% selection” without dated proof, and copied competitor faculty bios. Align About, Organization schema, and course pages. Assistants punish contradiction faster than Google alone.

## 30-day sprint

**Week 1:** Inventory programs; pick one money URL; fix indexation and title.  
**Week 2:** Rewrite program page + FAQ; add comparison table.  
**Week 3:** Wire three existing posts to that URL; add GBP if you have a centre.  
**Week 4:** Measure enquiries / demo form completes — not only rankings.

## FAQ

**Do we need a blog?** Only after money URLs convert. Blogs support hubs; they are not the product.

**City pages for every centre?** Yes if NAP is real and unique. No if they are spun templates.

**What should we hire for?** Strategy + technical floor + program-page copy — via [SEO consulting](/seo-consulting-services). Proof pattern: [SaaS demo requests case study](/case-study/saas-demo-requests).
`,
  },
  {
    slug: "link-building-india-2026-without-penalties",
    pillar: "seo-consulting",
    title: "Link Building in India 2026 Without Penalties",
    meta: "Safe Link Building India 2026 | Fundaking",
    desc: "A founder-safe link building approach for Indian B2B and local brands — digital PR, partners, and entities — not PBNs or paid guest-post farms.",
    tag: "Strategy",
    tags: ["link-building", "off-page", "seo-consulting"],
    siblings: [
      "when-to-fire-your-seo-agency",
      "seo-rfp-template-india",
      "brand-mentions-vs-backlinks-in-llm-era",
    ],
    body: `Most “SEO packages” sold in India still treat links as a shopping cart: 20 guest posts, 50 directories, mysterious DA scores. That model burns money and, worse, teaches founders the wrong scoreboard. In 2026 I buy **mentions, entities, and referral traffic** — links are a byproduct.

Start from the hiring hub: [SEO consultant in Pune founder’s guide](/blog/seo-consultant-in-pune-founders-guide-2026). If an agency cannot explain risk, use [when to fire your SEO agency](/blog/when-to-fire-your-seo-agency) as a scorecard.

## What still works

| Tactic | Why it works | Watch-outs |
| --- | --- | --- |
| Digital PR / data stories | Earns editorial links | Needs a real asset |
| Partner / integration pages | B2B SaaS natural links | Reciprocal spam if forced |
| Industry associations / chambers | Local + B2B trust | Thin profile pages |
| Unlinked brand mentions → link asks | Cheap, high relevance | Only where already mentioned |
| Resource / tool pages | Links + AI citations | Must stay updated |

## What I refuse

- PBN / private blog networks  
- Paid guest-post farms with identical footprints  
- Mass directory spam (except real local citations — see [citation building without spam](/blog/citation-building-without-spam-india))  
- “DA50 guarantees”  
- Link exchanges that look like a carousel

## Mentions beat raw links in the LLM era

Assistants often name brands from consensus text, not only from \`<a href>\`. Pair link work with [brand mentions vs backlinks](/blog/brand-mentions-vs-backlinks-in-llm-era). Fix wrong facts before chasing more URLs.

## Process I run for clients

1. **Toxic / irrelevant audit** — disavow only with evidence; prefer ignore for old junk  
2. **Asset list** — original research, calculators, India-specific benchmarks  
3. **Target list** — 30 sites your buyers already read  
4. **Pitch weekly** — one story, not fifty identical emails  
5. **Report** — referring domains that send clicks or citations, not raw link count  

## RFP language that protects you

Ask vendors for: sample pitches, rejected tactics list, and how they handle Google spam updates. Steal language from the [SEO RFP template India](/blog/seo-rfp-template-india).

## FAQ

**How many links per month?** Wrong question. Ask how many **qualified referring domains** and whether money URLs gained.

**Do local businesses need this?** Light citations + reviews first ([local SEO playbook](/blog/local-seo-india-playbook)); national PR later.

**Can we DIY?** Yes for partner pages and unlinked mentions. Hire for PR-grade assets via [SEO consulting](/seo-consulting-services).
`,
  },
  {
    slug: "crawl-budget-robots-txt-india-catalogs",
    pillar: "technical-seo",
    title: "Crawl Budget and robots.txt for Large Indian Catalogues",
    meta: "Crawl Budget & robots.txt India | Fundaking",
    desc: "Practical crawl-budget controls for large ecommerce and marketplace-style catalogues in India — robots.txt, parameters, sitemaps, and log proof.",
    tag: "Technical",
    tags: ["crawl-budget", "robots-txt", "technical-seo"],
    siblings: [
      "index-bloat-cleanup-playbook",
      "faceted-navigation-seo-ecommerce",
      "log-file-analysis-seo-guide",
      "xml-sitemap-best-practices-2026",
    ],
    body: `Large Indian catalogues (D2C Shopify Plus, custom marketplaces, B2B parts sites) waste crawl on filters, sort orders, and session URLs while money SKUs wait. Crawl budget is not mystical — it is **which URLs Googlebot fetches usefully**. Start from the [technical SEO audit checklist](/blog/technical-seo-audit-checklist-2026).

## Diagnose before you Disallow

Use [log file analysis](/blog/log-file-analysis-seo-guide) for two weeks:

1. Top paths Googlebot hits  
2. Status codes (soft 404s, 302 chains)  
3. Share of crawl on faceted / parameter URLs  
4. Whether sitemap URLs are actually fetched  

If bots never reach new products, fixing copy will not help.

## robots.txt rules that are usually safe

| Pattern | Intent |
| --- | --- |
| Block internal search | Prevent index bloat |
| Block cart / checkout / account | No SEO value |
| Allow product / category canonicals | Money paths |
| Avoid blocking CSS/JS needed to render | Rendering still matters |

Never Disallow a URL you still want indexed. Prefer canonical + noindex + parameter handling for borderline filters — see [faceted navigation SEO](/blog/faceted-navigation-seo-ecommerce) and [index bloat cleanup](/blog/index-bloat-cleanup-playbook).

## Sitemap discipline

Split product vs category vs content sitemaps. Only include **canonical 200** URLs. Keep lastmod honest. Guide: [XML sitemap best practices](/blog/xml-sitemap-best-practices-2026).

## Parameter playbook

1. Inventory tracking params (UTM should not create indexables)  
2. Decide indexable facets (rarely more than brand + one primary attribute)  
3. Canonical to clean URL  
4. Confirm in GSC URL Inspection after release  

## 14-day fix sequence

**Days 1–3:** Log sample + GSC “crawled – currently not indexed” themes.  
**Days 4–7:** robots + parameter rules + sitemap cleanup.  
**Days 8–11:** Facet templates noindex/canonical.  
**Days 12–14:** Re-check bot hits on new SKUs.

## FAQ

**Will Disallow fix ranking?** No — it only frees crawl. Rankings need content and links.

**Shopify?** Theme apps create parameter mess; pair with [Shopify technical SEO checklist](/blog/shopify-technical-seo-checklist).

**Need help?** [Technical SEO consulting](/technical-seo-consultant) — proof: [fintech organic growth](/case-study/fintech-organic-growth).
`,
  },
  {
    slug: "google-review-generation-system-india",
    pillar: "local-seo",
    title: "Google Review Generation System for India Businesses",
    meta: "Google Review Generation India | Fundaking",
    desc: "A compliant review generation system for Indian clinics, services, and multi-location brands — timing, QR, staff scripts, and response ops.",
    tag: "Local",
    tags: ["reviews", "gbp", "local-seo"],
    siblings: [
      "google-business-profile-optimization-india",
      "whatsapp-leads-from-google-maps-india",
      "local-seo-for-clinics-india",
      "google-business-profile-posts-strategy",
    ],
    body: `Reviews are still the prominence lever most Indian local businesses under-operate. Not “buy reviews” — **ask at the right moment, make it frictionless, respond like a human**. This spoke belongs under the [local SEO India playbook](/blog/local-seo-india-playbook).

## Timing that converts

| Business | Ask when | Channel |
| --- | --- | --- |
| Clinic / dental | After successful visit, same day | WhatsApp short link |
| Restaurant | After paid bill | QR on table / bill |
| Service (AC, legal) | After job closed | SMS / WhatsApp |
| Multi-location retail | At POS | Staff + QR |

Never ask only unhappy customers by accident (complaint desk only). Train front-line staff with a one-line script.

## Compliant asking (India)

- No incentives that require a 5-star rating  
- No filtering “only happy customers” into a fake channel while suppressing others  
- Use the official Google review link / QR from GBP  
- Keep NAP consistent so reviews attach to the right entity ([NAP consistency](/blog/nap-consistency-india-directories))

## System components

1. **Unique review URL** per location in GBP  
2. **QR + WhatsApp template** approved by owner  
3. **Weekly ask quota** (e.g. 10 genuine asks)  
4. **Response SLA** — 48 hours for negatives, 72 for positives  
5. **Theme log** — map complaints to ops fixes, not only SEO vanity  

Pair with [GBP optimization India](/blog/google-business-profile-optimization-india) and [WhatsApp leads from Maps](/blog/whatsapp-leads-from-google-maps-india).

## Negative review protocol

1. Acknowledge factually  
2. Move private details offline  
3. Fix the process  
4. Do not argue publicly  
5. Do not buy offsetting fake reviews  

## Clinics note

For clinics, reviews often mention doctor names — keep faculty pages and GBP categories aligned. See [local SEO for clinics India](/blog/local-seo-for-clinics-india).

## FAQ

**How fast do ratings move?** Velocity and recency matter more than dumping 50 old reviews once.

**Same system for chains?** Yes — per-location links, never one global QR. [Multi-location local SEO](/blog/multi-location-local-seo-india).

**Who runs this?** Ops + front desk; SEO sets the system via [local SEO consulting](/local-seo-consultant). Proof: [Real Group](/case-study/real-group).
`,
  },
  {
    slug: "gbp-qa-messaging-that-converts",
    pillar: "local-seo",
    title: "GBP Q&A and Messaging That Converts",
    meta: "GBP Q&A and Messaging | Fundaking",
    desc: "How to use Google Business Profile Q&A and messaging to answer intent, capture leads, and support Maps rankings for Indian service businesses.",
    tag: "Local",
    tags: ["gbp", "messaging", "local-seo"],
    siblings: [
      "google-business-profile-optimization-india",
      "google-business-profile-posts-strategy",
      "whatsapp-leads-from-google-maps-india",
      "google-review-generation-system-india",
    ],
    body: `GBP is not only categories and photos. **Q&A and messaging** are where high-intent shoppers ask “do you do X today?” If you leave Q&A to random users — or ignore messages — you leak calls. Hub: [local SEO India playbook](/blog/local-seo-india-playbook).

## Seed Q&A yourself

Do not wait for spam. Publish owner-answered questions that match sales FAQs:

- Hours / holiday schedule  
- Parking / directions landmark  
- Services included vs not  
- Booking / walk-in policy  
- Fee bands where honest  

Keep answers short, factual, and identical to the website. Contradiction kills trust in Maps and AI answers ([local SEO + AI](/blog/local-seo-plus-ai-answers)).

## Messaging ops

| Rule | Why |
| --- | --- |
| Reply in &lt;15 minutes during open hours | Maps users expect chat speed |
| Template + human edit | Speed without sounding botty |
| One clear CTA | Call, WhatsApp, or form — not all three |
| Log outcomes | Message → visit / booking |

Route heavy chat to WhatsApp with a clean handoff — [WhatsApp leads from Google Maps](/blog/whatsapp-leads-from-google-maps-india).

## Posts + Q&A + reviews = one system

Weekly [GBP posts](/blog/google-business-profile-posts-strategy), review asks ([review generation system](/blog/google-review-generation-system-india)), and Q&A updates should share the same offer calendar. Random posts without ops rhythm waste the channel.

## Spam and hijack defense

Monitor for fake Q&A, competitor defacement, and messaging phishing. Lock owner access, use 2FA, and document who can edit GBP.

## FAQ

**Does messaging affect rank?** Indirectly via engagement and conversion signals; treat it as conversion first.

**Multiple locations?** Separate profiles, separate reply owners — [multi-location local SEO](/blog/multi-location-local-seo-india).

**Need setup help?** [Local SEO consulting](/local-seo-consultant) + [GBP optimization](/blog/google-business-profile-optimization-india).
`,
  },
  {
    slug: "ai-citation-share-tracker-spreadsheet",
    pillar: "ai-answer-engine",
    title: "Building an AI Citation-Share Tracker (Spreadsheet Method)",
    meta: "AI Citation Share Tracker Spreadsheet | Fundaking",
    desc: "A practical spreadsheet method to track citation share across AI Overviews and assistants — prompts, competitors, and weekly ops for founders.",
    tag: "Measurement",
    tags: ["citations", "measurement", "ai-seo"],
    siblings: [
      "measuring-ai-citations-without-vanity-tools",
      "competitor-citation-analysis",
      "measuring-visibility-in-ai-search",
      "ai-seo-roadmap-90-days",
    ],
    body: `“Are we winning AI search?” is not a vibe. It is a **share of citations** across a fixed prompt set. This article gives the spreadsheet method I hand founders — sibling to [measuring AI citations without vanity tools](/blog/measuring-ai-citations-without-vanity-tools) and the hub [What is AI SEO?](/blog/what-is-ai-seo-definition-2026).

## Sheet structure

**Tab 1 — Prompt registry**  
prompt_id, prompt_text, persona, funnel stage (TOFU/BOFU), mapped money URL, owner.

**Tab 2 — Weekly captures**  
date, engine (AIO / ChatGPT / Perplexity / Gemini), locale, our_state (named/linked/absent), competitors_named (pipe-separated), sources_linked, screenshot_path, notes.

**Tab 3 — Share calc**  
For each prompt_id: count weeks named / weeks measured; same for top 3 competitors. That ratio is citation share.

**Tab 4 — Actions**  
prompt_id → defect (entity / page / technical) → ticket → due date.

## Sampling rules

- Same 8–12 prompts for 8 weeks before expanding  
- India locale, logged-out  
- Capture on a fixed weekday  
- Do not chase every new assistant weekly — rotate  

Detail protocol lives in the vanity-tools article; competitive framing in [competitor citation analysis](/blog/competitor-citation-analysis).

## From share % to work

| Share pattern | Likely fix |
| --- | --- |
| Competitor always linked | BOFU page depth + schema match |
| You named, never linked | Passage clarity + crawlable HTML |
| Random week-to-week | Entity inconsistency — [brand facts playbook](/blog/fix-wrong-brand-facts-ai-hallucinations) |
| Local queries weak | GBP + local pages, not more AI blogs |

Sequence work with the [90-day AI SEO roadmap](/blog/ai-seo-roadmap-90-days).

## Founder review (15 minutes)

1. Share up/down vs last month  
2. Two prompts that lost  
3. One money URL change shipping this sprint  
4. Demo/call assist from organic landers ([measuring visibility in AI search](/blog/measuring-visibility-in-ai-search))

## FAQ

**Is Excel enough?** Yes until &gt;25 prompts and multiple brands.

**Paid tools?** Optional second opinion — never the only KPI.

**Who owns the sheet?** Marketing ops; strategist reviews monthly via [AI enablement](/ai-enablement) / AI SEO retainers. Proof: [Shubhshrey](/case-study/shubhshrey-industries).
`,
  },
];

function fm(p) {
  const pillar = map.pillars[p.pillar];
  return `---
title: "${p.title}"
meta_title: "${p.meta}"
description: "${p.desc}"
date: 2026-11-04T08:00:00Z
date_modified: 2026-11-04T08:00:00Z
image: "/images/blog/featured/${p.slug}.svg"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "${p.tag}"
read_time: "14 min read"
categories: ["${pillar.category}"]
tags: ${JSON.stringify(p.tags)}
draft: false
---
`;
}

for (const p of posts) {
  const file = path.join(blogDir, `${p.slug}.md`);
  const content = fm(p) + "\n" + p.body.trim() + "\n";
  fs.writeFileSync(file, content, "utf8");
  map.posts[p.slug] = {
    pillar: p.pillar,
    siblings: p.siblings,
  };
  const hub = map.pillars[p.pillar].hub;
  if (!map.posts[hub].siblings.includes(p.slug)) {
    map.posts[hub].siblings.push(p.slug);
  }
  console.log("wrote", p.slug);
}

fs.writeFileSync(mapPath, JSON.stringify(map, null, 2) + "\n", "utf8");
console.log("[seed-authority-deepeners] Done");
