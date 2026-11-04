/**
 * Seed Quick Commerce + Web Dev SEO pillars (hub + 3 spokes each) and update cluster-map.
 * Run: node automark-astro-main/scripts/seed-qc-webdev-pillars.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
const mapPath = path.join(__dirname, "cluster-map.json");
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));

map.pillars["quick-commerce"] = {
  hub: "quick-commerce-seo-visibility-playbook-india",
  category: "Quick Commerce",
  service: "/quick-commerce-enablement",
  serviceLabel: "Quick commerce enablement",
  proof: "/contact",
  proofLabel: "Quick commerce listing audit call",
};

map.pillars["web-development-seo"] = {
  hub: "seo-ready-website-builds-indian-b2b",
  category: "Web Development",
  service: "/web-development",
  serviceLabel: "Web development services",
  proof: "/case-study/shubhshrey-industries",
  proofLabel: "Shubhshrey website and CRM case study",
};

const posts = [
  {
    slug: "quick-commerce-seo-visibility-playbook-india",
    pillar: "quick-commerce",
    isHub: true,
    title: "Quick Commerce SEO & Visibility Playbook (India)",
    meta: "Quick Commerce SEO Playbook India | Fundaking",
    desc: "How FMCG, food, and D2C brands win search inside Blinkit, Zepto, and Instamart — catalogue SEO, keywords, and ops cadence.",
    tag: "Hub",
    tags: ["quick-commerce", "blinkit", "zepto"],
    siblings: [
      "blinkit-zepto-instamart-listing-keywords",
      "quick-commerce-catalogue-content-ops",
      "quick-commerce-and-ai-shopping-answers",
      "seo-for-d2c-brands-india",
      "product-data-feeds-and-ai-shopping",
    ],
    body: `Quick commerce search is SEO with tighter queries and crueler real-time constraints. Shoppers type “atta 5kg”, “cold coffee”, “baby wipes” — and pick from the first screen. This page is Fundaking’s **hub** for quick-commerce visibility work.

## In this Quick Commerce cluster

| Spoke | Use when |
| --- | --- |
| [Listing keywords for Blinkit / Zepto / Instamart](/blog/blinkit-zepto-instamart-listing-keywords) | Titles and search-term research |
| [Catalogue content ops](/blog/quick-commerce-catalogue-content-ops) | Variants, images, attributes at scale |
| [QC + AI shopping answers](/blog/quick-commerce-and-ai-shopping-answers) | Brand shows up in AI shopping surfaces |

Service: [Quick commerce enablement](/quick-commerce-enablement). Adjacent organic: [SEO for D2C brands](/blog/seo-for-d2c-brands-india). Feeds: [product data feeds and AI shopping](/blog/product-data-feeds-and-ai-shopping).

## How in-app ranking roughly works

Relevance (title/category/attributes) × availability × price competitiveness × rating/reviews × platform ads. You do not control the algorithm; you control **data quality and ops**.

## Founder scorecard (monthly)

1. % of SKUs with complete attributes  
2. Share of voice on 20 priority searches in target cities  
3. OOS rate on those SKUs  
4. Rating velocity  
5. Organic vs ad-assisted orders (if platform exposes it)

## 30-day launch path

**Week 1:** Category research + competitor title scrape.  
**Week 2:** Catalogue cleanse + image briefs.  
**Week 3:** Go live / resubmit; fix rejections.  
**Week 4:** Track top searches; iterate titles.

Book a [listing audit call](/contact) if you want a free review of current listings.
`,
  },
  {
    slug: "blinkit-zepto-instamart-listing-keywords",
    pillar: "quick-commerce",
    title: "Blinkit, Zepto & Instamart Listing Keywords",
    meta: "QC Listing Keywords Blinkit Zepto Instamart | Fundaking",
    desc: "How to research and write product titles and descriptions for Blinkit, Zepto, and Swiggy Instamart search.",
    tag: "Keywords",
    tags: ["quick-commerce", "keywords", "listings"],
    siblings: [
      "quick-commerce-seo-visibility-playbook-india",
      "quick-commerce-catalogue-content-ops",
      "seo-for-d2c-brands-india",
    ],
    body: `In-app search is literal. If the shopper types “cold pressed oil” and your title says “artisanal wellness elixir,” you lose. This spoke deepens the [quick commerce visibility playbook](/blog/quick-commerce-seo-visibility-playbook-india).

## Research sources

1. Autocomplete inside each app (incognito / fresh install)  
2. Competitor titles in top 5 for your hero SKUs  
3. Your site search / Shopify search logs  
4. Support chats (“do you have X?”)

Build a sheet: search_term → volume proxy (rank of competitor) → preferred title token → banned fluff words.

## Title formula that usually works

\`[Brand] + [Product] + [Variant/size] + [1–2 search modifiers]\`

Example: \`FarmGold Groundnut Oil 1L Cold Pressed\` — not a poem.

Keep platform character limits. Put the highest-intent modifier early. Pair with [catalogue content ops](/blog/quick-commerce-catalogue-content-ops) so variants do not cannibalize each other.

## Description / bullets

- What it is / size / pack  
- Use case (“daily cooking”, “baby sensitive skin”)  
- Differentiator with proof  
- Storage / FSSAI where relevant  

No keyword stuffing paragraphs. Apps and AI shopping surfaces prefer scannable facts — see [product data feeds](/blog/product-data-feeds-and-ai-shopping).

## City nuance

Pune vs Delhi demand can differ on flavors and pack sizes. Track SOV per city if you launch metro-by-metro via [quick commerce enablement](/quick-commerce-enablement).

## FAQ

**Same title on all three apps?** Same core tokens; tweak to each platform’s length and category taxonomy.

**Hindi terms?** Where shoppers type Hinglish (“sabun”, “atta”), include those tokens naturally.
`,
  },
  {
    slug: "quick-commerce-catalogue-content-ops",
    pillar: "quick-commerce",
    title: "Quick Commerce Catalogue Content Ops",
    meta: "QC Catalogue Content Operations | Fundaking",
    desc: "Operating system for QC catalogues — variants, images, attributes, rejection handling, and monthly optimisation.",
    tag: "Ops",
    tags: ["quick-commerce", "catalogue", "ops"],
    siblings: [
      "quick-commerce-seo-visibility-playbook-india",
      "blinkit-zepto-instamart-listing-keywords",
      "shopify-technical-seo-checklist",
    ],
    body: `Keyword research dies without ops. Brands that “optimise titles once” then let distributors upload junk lose visibility in weeks. Hub: [QC SEO playbook](/blog/quick-commerce-seo-visibility-playbook-india).

## Single source of truth

Maintain a master sheet / PIM: SKU ID, GTIN, title tokens, attributes, image set, platform category IDs, status per app. Website Shopify data should sync — [Shopify technical SEO](/blog/shopify-technical-seo-checklist) keeps the owned site clean while QC apps stay consistent.

## Image brief minimum

- White / clean background hero  
- Secondary lifestyle if allowed  
- Size / pack readable  
- No banned claims on image text  

## Monthly cadence

| Week | Focus |
| --- | --- |
| 1 | Rejection / missing attribute queue |
| 2 | Top-20 search SOV title tests |
| 3 | New SKU onboarding |
| 4 | Rating / OOS review with ops |

## Ownership

Marketing owns tokens and creative briefs; supply chain owns OOS; one person owns platform tickets. Without a named owner, catalogues rot.

## FAQ

**Distributor uploads?** Give them a locked template or you will re-fix forever.

**Need help?** [Quick commerce enablement](/quick-commerce-enablement) or [contact](/contact).
`,
  },
  {
    slug: "quick-commerce-and-ai-shopping-answers",
    pillar: "quick-commerce",
    title: "Quick Commerce and AI Shopping Answers",
    meta: "Quick Commerce + AI Shopping | Fundaking",
    desc: "How QC catalogue quality and product feeds influence AI shopping answers — and how to keep brand facts consistent.",
    tag: "AI bridge",
    tags: ["quick-commerce", "ai-shopping", "feeds"],
    siblings: [
      "quick-commerce-seo-visibility-playbook-india",
      "product-data-feeds-and-ai-shopping",
      "ecommerce-llm-seo-beyond-feeds",
      "what-is-ai-seo-definition-2026",
    ],
    body: `AI shopping answers and classic QC app search increasingly pull from the same messy product graph: titles, attributes, prices, availability. If your Blinkit title says “1L” and your site says “900ml”, assistants will invent a third number. Hub: [QC playbook](/blog/quick-commerce-seo-visibility-playbook-india). AI hub: [What is AI SEO?](/blog/what-is-ai-seo-definition-2026).

## Consistency checklist

1. Brand string identical across site, apps, Merchant Center  
2. Size / pack normalized  
3. Ingredients / material facts match  
4. Price bands not wildly contradictory  

Deepen feeds work via [product data feeds and AI shopping](/blog/product-data-feeds-and-ai-shopping) and [ecommerce LLM SEO beyond feeds](/blog/ecommerce-llm-seo-beyond-feeds).

## What to measure

- Named in shopping-style prompts (“best protein bar under 200 India”)  
- Correct size/price cited  
- Link to owned site vs only marketplace  

## Practical sequence

Fix catalogue master data → sync site → sync QC apps → then chase AI citations. Reverse order wastes content budget.

## FAQ

**Does QC SEO replace Google SEO?** No — [D2C SEO](/blog/seo-for-d2c-brands-india) still owns branded and category demand on the open web.

**Service path:** [Quick commerce enablement](/quick-commerce-enablement) + [AI enablement](/ai-enablement) when ops automation is the bottleneck.
`,
  },
  {
    slug: "seo-ready-website-builds-indian-b2b",
    pillar: "web-development-seo",
    isHub: true,
    title: "SEO-Ready Website Builds for Indian B2B",
    meta: "SEO-Ready Website Builds India B2B | Fundaking",
    desc: "How Fundaking builds corporate, manufacturing, and SaaS sites so crawl, speed, schema, and enquiry paths are correct on day one.",
    tag: "Hub",
    tags: ["web-development", "technical-seo", "b2b"],
    siblings: [
      "website-launch-seo-checklist-india",
      "crm-portal-seo-implications",
      "migrating-to-a-new-site-without-traffic-loss",
      "technical-seo-audit-checklist-2026",
      "nextjs-seo-rendering-guide",
    ],
    body: `Pretty sites that fail Search Console are expensive brochures. Because we also run SEO engagements, every Fundaking build ships with crawlable HTML, sane URLs, schema, analytics, and a path to enquiry. This is the **hub** for the Web Development × SEO cluster.

## In this Web Development cluster

| Spoke | Use when |
| --- | --- |
| [Website launch SEO checklist](/blog/website-launch-seo-checklist-india) | Go-live gates |
| [CRM / portal SEO implications](/blog/crm-portal-seo-implications) | Logged-in apps beside marketing site |
| [Migrating without traffic loss](/blog/migrating-to-a-new-site-without-traffic-loss) | Rebuilds and replatforms |

Service: [Web development](/web-development). Technical depth: [technical SEO audit checklist](/blog/technical-seo-audit-checklist-2026). Stack notes: [Next.js SEO rendering](/blog/nextjs-seo-rendering-guide). Proof: [Shubhshrey website & CRM](/case-study/shubhshrey-industries).

## Non-negotiables in every build

1. Server-rendered or prerendered money pages  
2. Unique titles/metas from CMS fields  
3. Organization + WebSite schema  
4. XML sitemap + robots  
5. Core Web Vitals budget  
6. 404 / redirect plan  
7. Enquiry CTA above the fold on service pages  

## Who this is for

Manufacturers in Baramati / Pune industrial belts, SaaS teams in Hinjewadi/Kharadi, professional services that need leads — not brochure WordPress themes with five page builders fighting each other.

## FAQ

**Already have a site?** Start with [technical SEO consulting](/technical-seo-consultant), not a vanity redesign.

**Need both site + CRM?** Same engagement model as Shubhshrey — public site + internal follow-up.
`,
  },
  {
    slug: "website-launch-seo-checklist-india",
    pillar: "web-development-seo",
    title: "Website Launch SEO Checklist (India)",
    meta: "Website Launch SEO Checklist India | Fundaking",
    desc: "Go-live SEO checklist for Indian business websites — Search Console, redirects, schema, CWV, and analytics.",
    tag: "Checklist",
    tags: ["launch", "checklist", "web-development"],
    siblings: [
      "seo-ready-website-builds-indian-b2b",
      "migrating-to-a-new-site-without-traffic-loss",
      "xml-sitemap-best-practices-2026",
      "core-web-vitals-indian-saas",
    ],
    body: `Launch day is when SEO debt becomes permanent. Use this checklist before DNS flip. Hub: [SEO-ready website builds](/blog/seo-ready-website-builds-indian-b2b).

## Pre-launch (staging)

- [ ] All money URLs return 200 with unique titles  
- [ ] Noindex on staging only; production will be indexable  
- [ ] Canonicals self-referencing on production hosts  
- [ ] Schema validates (Organization, WebSite, breadcrumbs)  
- [ ] Images compressed; LCP element agreed ([CWV India](/blog/core-web-vitals-indian-saas))  
- [ ] Sitemap generated ([XML sitemaps](/blog/xml-sitemap-best-practices-2026))  
- [ ] Forms fire to CRM / email with spam protection  

## Launch hour

- [ ] robots.txt allows crawl  
- [ ] Submit sitemap in Search Console  
- [ ] Verify domain + set preferred host  
- [ ] Smoke-test redirect map if replacing old site  
- [ ] Analytics + conversion events live  

## Week 1 after

- [ ] Coverage report for 404 / soft 404  
- [ ] Manual inspection of top 10 URLs  
- [ ] Fix anything blocked by auth / JS  

If this is a migration, use [migrating without traffic loss](/blog/migrating-to-a-new-site-without-traffic-loss) — not only this list.

## FAQ

**Who signs off?** Marketing + developer + SEO. One missing checkbox = weeks of crawl waste.

**Build with us:** [Web development](/web-development).
`,
  },
  {
    slug: "crm-portal-seo-implications",
    pillar: "web-development-seo",
    title: "CRM and Portal SEO Implications",
    meta: "CRM Portal SEO Implications | Fundaking",
    desc: "How to keep marketing sites crawlable when you also ship CRMs, client portals, and authenticated apps.",
    tag: "Architecture",
    tags: ["crm", "portal", "web-development"],
    siblings: [
      "seo-ready-website-builds-indian-b2b",
      "javascript-rendering-and-ai-crawlers",
      "nextjs-seo-rendering-guide",
    ],
    body: `Custom CRMs and portals are high value for sales ops — and high risk for SEO when teams put everything on one chaotic domain. Hub: [SEO-ready builds](/blog/seo-ready-website-builds-indian-b2b). Proof pattern: [Shubhshrey](/case-study/shubhshrey-industries).

## Separate concerns

| Surface | Indexing | Notes |
| --- | --- | --- |
| Marketing site | Index | Money pages, blog, case studies |
| CRM / admin | Noindex + auth | Never in sitemap |
| Client portal | Noindex + auth | Avoid thin public shells |

Subdomain (\`app.\`) or path with forced login both work if robots and auth are correct.

## Rendering traps

SPAs that hide marketing content behind the same JS bundle as the app confuse bots. Prefer [Next.js SEO rendering](/blog/nextjs-seo-rendering-guide) patterns and read [JS + AI crawlers](/blog/javascript-rendering-and-ai-crawlers).

## Lead capture bridge

Public forms should write to the CRM with UTM fields intact. SEO without CRM attribution looks like “traffic” with no pipeline.

## FAQ

**Same CMS as CRM?** Only if roles and noindex rules are bulletproof.

**Need both:** [Web development](/web-development).
`,
  },
  {
    slug: "migrating-to-a-new-site-without-traffic-loss",
    pillar: "web-development-seo",
    title: "Migrating to a New Site Without Traffic Loss",
    meta: "Site Migration Without Traffic Loss | Fundaking",
    desc: "Practical migration playbook for Indian B2B rebuilds — URL maps, 301s, Search Console, and the first 30 days.",
    tag: "Migration",
    tags: ["migration", "redirects", "web-development"],
    siblings: [
      "seo-ready-website-builds-indian-b2b",
      "website-launch-seo-checklist-india",
      "site-migration-seo-checklist",
      "https-redirect-chains-seo-fix",
    ],
    body: `Rebuilds destroy rankings when URL maps are improvised on launch night. This spoke is the Web Dev cluster view; the deep technical checklist is [site migration SEO checklist](/blog/site-migration-seo-checklist). Hub: [SEO-ready builds](/blog/seo-ready-website-builds-indian-b2b).

## URL map rules

1. Export all indexed URLs from GSC + analytics  
2. Map 1:1 where content still exists  
3. Consolidate true duplicates intentionally  
4. Never soft-404 money URLs  
5. Keep chains short ([HTTPS redirect chains](/blog/https-redirect-chains-seo-fix))

## Launch sequence

Staging parity → redirect test on preview host → DNS → Submit sitemaps → Monitor GSC 30 days. Pair with [website launch SEO checklist](/blog/website-launch-seo-checklist-india).

## Content parity

If the new design cuts half the service copy, expect rankings to fall even with perfect 301s. Migration is not a license to delete proof.

## FAQ

**WordPress to Next.js?** Doable — rendering and redirects are the risk, not the brand.

**Who owns it?** [Web development](/web-development) + [technical SEO](/technical-seo-consultant) jointly.
`,
  },
];

function writePost(p) {
  const pillar = map.pillars[p.pillar];
  const fm = `---
title: "${p.title}"
meta_title: "${p.meta}"
description: "${p.desc}"
date: 2026-11-04T09:00:00Z
date_modified: 2026-11-04T09:00:00Z
image: "/images/blog/featured/${p.slug}.svg"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "${p.tag}"
read_time: "12 min read"
categories: ["${pillar.category}"]
tags: ${JSON.stringify(p.tags)}
draft: false
---
`;
  fs.writeFileSync(
    path.join(blogDir, `${p.slug}.md`),
    fm + "\n" + p.body.trim() + "\n",
    "utf8",
  );
  const entry = { pillar: p.pillar, siblings: p.siblings };
  if (p.isHub) entry.isHub = true;
  map.posts[p.slug] = entry;
  console.log("wrote", p.slug);
}

for (const p of posts) writePost(p);

fs.writeFileSync(mapPath, JSON.stringify(map, null, 2) + "\n", "utf8");
console.log("[seed-qc-webdev-pillars] cluster-map updated");
