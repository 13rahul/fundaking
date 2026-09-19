import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "src/content/blog");
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
    slug: "google-ai-overviews-practical-guide",
    title: "Google AI Overviews: What Actually Moves the Needle",
    meta_title: "Google AI Overviews SEO Guide | Practical Steps",
    description:
      "I treat AI Overviews like a new SERP slot—not magic. Here is how I audit, prioritize, and measure pages that earn the summary and the click.",
    category: "AI SEO",
    tag: "AI Overviews",
    date: "2026-02-10",
    intro:
      "When AI Overviews showed up in my clients’ Search Console, clicks dipped on some head terms—and held steady on others. The difference was never “more AI content.” It was **clarity, structure, and pages that answer one job well**.",
    sections: [
      {
        h2: "Start with queries where an overview already appears",
        p: [
          "I pull 90 days of Search Console and flag queries with high impressions, soft CTR, and visible overview in manual checks. Those are your battleground URLs—not every keyword in the plan.",
          "For each query I open an incognito window and screenshot who gets named, which URLs are linked, and whether the overview satisfies the intent without a click. If it does, I stop chasing position 1 fantasies and shift to **brand accuracy** and **next-step queries** (comparison, pricing, implementation).",
        ],
      },
      {
        h2: "Page patterns I see cited",
        p: [
          "Definitions in the first 120 words with the product/category name repeated plainly.",
          "Short H2s phrased as questions buyers actually type.",
          "Tables for comparisons, steps for procedures, and dated stats when you claim outcomes.",
          "Internal links from the cited page to BOFU pages so humans who do click land somewhere useful.",
        ],
      },
      {
        h2: "Technical mistakes that keep you out",
        p: [
          "Blocked resources, lazy-loaded body copy, and faceted URLs that split signals.",
          "Conflicting facts between FAQ schema and visible copy—models cross-check.",
          "Thin affiliate-style pages with no first-party proof.",
        ],
      },
      {
        h2: "What I do in week one",
        p: [
          "Pick five overview queries, one URL each, rewrite lede + one H2 block per page, add a comparison table if missing, resubmit in GSC, re-test in 14 days.",
        ],
      },
    ],
  },
  {
    slug: "perplexity-citation-strategies",
    title: "Perplexity and Answer Engines: How I Earn Citations",
    meta_title: "Perplexity SEO & Citation Strategies",
    description:
      "Answer engines reward fetchable, quotable passages. This is my checklist for becoming a source—not just another indexed URL.",
    category: "LLM SEO",
    tag: "Perplexity",
    date: "2026-02-12",
    intro:
      "I run the same 25 prompts in Perplexity monthly for B2B clients. You learn quickly: **citations go to pages that look like primary sources**, not pages that look like ads.",
    sections: [
      {
        h2: "Build a prompt library from sales calls",
        p: [
          "Export themes from Gong/CRM notes: objections, ‘how does X compare to Y,’ implementation fears. Turn each into a natural-language prompt.",
          "Track citation share in a simple sheet: date, prompt, cited domains, quoted sentence, accurate Y/N.",
        ],
      },
      {
        h2: "Make passages quotable",
        p: [
          "One claim per paragraph, subject named in the first sentence, numbers dated.",
          "Publish original benchmarks—even small n=30 surveys beat generic listicles.",
          "Host charts as HTML tables when possible; they survive extraction better than PNGs alone.",
        ],
      },
      {
        h2: "Off-site without spam",
        p: [
          "Expert quotes in trade press, podcast show notes with transcripts, and GitHub readmes for dev tools—all reinforce the same entity facts as your site.",
        ],
      },
    ],
  },
  {
    slug: "fix-wrong-brand-facts-ai-hallucinations",
    title: "When AI Gets Your Brand Wrong: A Fix Playbook",
    meta_title: "Fix AI Hallucinations About Your Brand",
    description:
      "Wrong pricing, fake integrations, and confused competitors in AI answers hurt deals. Here is how I clean up the facts systematically.",
    category: "LLM SEO",
    tag: "Reputation",
    date: "2026-02-14",
    intro:
      "A founder forwarded me a Copilot answer that listed a competitor’s pricing as theirs. Sales lost a week. **Hallucinations are a GTM problem**, not a marketing trivia problem.",
    sections: [
      {
        h2: "Document errors like incidents",
        p: [
          "Log prompt, engine, wrong claim, screenshot, deal impact. Prioritize revenue-adjacent mistakes (pricing, compliance, integrations) over cosmetic ones.",
        ],
      },
      {
        h2: "Fix the source graph",
        p: [
          "Align pricing, integrations, and company name on site, LinkedIn, G2, Crunchbase, and PDFs sales sends.",
          "Publish a single ‘Facts’ or FAQ page sales can link in email—models latch onto stable URLs.",
          "Use Organization + Product schema that mirrors visible copy exactly.",
        ],
      },
      {
        h2: "Create correcting content",
        p: [
          "If models confuse you with a similarly named company, publish a short ‘Not to be confused with…’ section on About—carefully, without sounding petty.",
          "Comparison pages that name the competitor honestly often become citation targets for ‘X vs Y’ prompts—with your framing.",
        ],
      },
    ],
  },
  {
    slug: "llm-seo-for-b2b-saas",
    title: "LLM SEO for B2B SaaS: Demos, Docs, and BOFU Pages",
    meta_title: "LLM SEO for B2B SaaS Founders",
    description:
      "Pipeline still lives in BOFU search and AI answers. I map SaaS sites so models and humans both reach demo-ready pages.",
    category: "LLM SEO",
    tag: "SaaS",
    date: "2026-02-17",
    intro:
      "Most SaaS sites are built for brand storytelling. Buyers ask AI **pain questions**—‘reduce churn after price increase,’ ‘SOC 2 timeline if we switch CRM.’ If you have no page for that sentence, you do not exist in the answer.",
    sections: [
      {
        h2: "Three page types that compound",
        p: [
          "**Problem pages** — symptom → diagnosis → how teams solve it (your category, not only your product).",
          "**Comparison pages** — respectful, fact-checked, updated quarterly.",
          "**Implementation pages** — time-to-value, team size, stack requirements; kills procurement FUD.",
        ],
      },
      {
        h2: "Docs are SEO for LLMs",
        p: [
          "Public docs with stable anchors beat blog fluff for ‘how to configure…’ prompts. Index them, interlink from marketing, keep changelogs dated.",
        ],
      },
      {
        h2: "Measure beyond MQLs",
        p: [
          "Branded search lift, direct traffic, and ‘heard about you from ChatGPT’ fields on demo forms—messy but directional.",
        ],
      },
    ],
  },
  {
    slug: "comparison-pages-ai-citation",
    title: "Comparison Pages Models Love to Quote",
    meta_title: "Comparison Pages for AI Citations",
    description:
      "‘X vs Y’ prompts need tables, fairness, and updates. I share the comparison template I use with SaaS and agency clients.",
    category: "AI SEO",
    tag: "Content",
    date: "2026-02-19",
    intro:
      "I have seen one well-maintained comparison page outrank ten blog posts for citation frequency—because **the format matches the question**.",
    sections: [
      {
        h2: "Structure",
        p: [
          "H1 with both brands, lede with who each is for, table with criteria rows (not feature spam), ‘best for’ summary, last updated date, author byline.",
        ],
      },
      {
        h2: "Fairness wins long term",
        p: [
          "Acknowledge where a competitor is strong; models and humans both trust you more. Link to their official pricing if public.",
        ],
      },
      {
        h2: "Maintenance",
        p: [
          "Calendar quarterly review when either vendor ships pricing or packaging changes—stale comparisons become misinformation.",
        ],
      },
    ],
  },
  {
    slug: "pricing-pages-ai-summaries",
    title: "Pricing Pages That Survive AI Summaries",
    meta_title: "Pricing Pages for AI Search Summaries",
    description:
      "Models quote pricing wrong when your page is vague. I make pricing explicit, scoped, and hard to misread.",
    category: "AI SEO",
    tag: "Conversion",
    date: "2026-02-21",
    intro:
      "If your pricing is ‘Contact us,’ AI will invent a number. I am not saying publish secrets you cannot support—**I am saying publish ranges and rules models can repeat accurately**.",
    sections: [
      {
        h2: "What to expose",
        p: [
          "Starting tiers, what moves price (seats, usage, support), billing cadence, refund policy one-liner, enterprise motion (call vs self-serve).",
        ],
      },
      {
        h2: "Schema and copy alignment",
        p: [
          "Offer or Product schema with priceCurrency and description matching visible numbers—no bait-and-switch between JSON-LD and HTML.",
        ],
      },
      {
        h2: "FAQ under pricing",
        p: [
          "‘Do you charge per seat?’ ‘Is there a free trial?’—exact Q&A blocks reduce support burden and give models clean chunks.",
        ],
      },
    ],
  },
  {
    slug: "help-center-docs-llm-seo",
    title: "Help Centers and Docs as LLM SEO Assets",
    meta_title: "Help Center SEO for LLM Visibility",
    description:
      "Support articles are underrated acquisition. I wire docs into IA so crawlers and models treat them as authoritative product truth.",
    category: "LLM SEO",
    tag: "Documentation",
    date: "2026-02-24",
    intro:
      "When a developer asks an assistant how to integrate your API, the answer should come from **your** docs—not a random forum thread from 2019.",
    sections: [
      {
        h2: "IA rules",
        p: [
          "One topic per article, title = the error or task, first paragraph = prerequisites and outcome.",
          "Cross-link ‘Related tasks’; avoid duplicate articles that split embeddings.",
        ],
      },
      {
        h2: "Technical",
        p: [
          "Allow indexing of public docs, canonicalize versioned URLs, expose sitemap for /docs.",
        ],
      },
      {
        h2: "Feedback loop",
        p: [
          "Top support tickets → new doc → link from in-app → watch citation prompts in AI tools monthly.",
        ],
      },
    ],
  },
  {
    slug: "youtube-podcast-ai-search-visibility",
    title: "YouTube, Podcasts, and Showing Up in AI Answers",
    meta_title: "YouTube & Podcast SEO for AI Search",
    description:
      "Transcripts and show notes feed models. I treat audio SEO as entity reinforcement—not vanity reach.",
    category: "AI SEO",
    tag: "Multimedia",
    date: "2026-02-26",
    intro:
      "I am not a YouTuber. But when clients publish weekly podcasts, **transcripts on their own domain** change what assistants say about their category.",
    sections: [
      {
        h2: "Own the transcript",
        p: [
          "Publish full text on site with episode title, guest credentials, summary bullets, and internal links to product pages—not only on Spotify.",
        ],
      },
      {
        h2: "Entity reinforcement",
        p: [
          "Repeat canonical product name, spell founder name consistently, mention city/market when relevant.",
        ],
      },
      {
        h2: "Clip strategy",
        p: [
          "Short clips are fine for social; long-form transcript is what models train and retrieve on.",
        ],
      },
    ],
  },
  {
    slug: "competitor-citation-analysis",
    title: "Competitor Citation Analysis in AI Search",
    meta_title: "Competitor Citation Analysis for AI SEO",
    description:
      "I score who wins AI answers for our prompt library—and steal structure, not sentences.",
    category: "LLM SEO",
    tag: "Research",
    date: "2026-02-28",
    intro:
      "Classic competitor gap analysis looks at keywords. **Citation analysis looks at sentences**—who gets quoted, for which prompts, with what angle.",
    sections: [
      {
        h2: "Setup",
        p: [
          "20–40 prompts, three engines, log cited URL, brand mentioned Y/N, sentiment, accuracy.",
          "Tag competitors and neutrals (Wikipedia, Reddit, G2).",
        ],
      },
      {
        h2: "Reverse engineer format",
        p: [
          "If a competitor doc wins on ‘implementation timeline,’ outline their headings and data types—then publish something more current with your POV.",
        ],
      },
      {
        h2: "Avoid plagiarism",
        p: [
          "Structure is fair game; copy is not. Add first-party data they do not have.",
        ],
      },
    ],
  },
  {
    slug: "ai-seo-roadmap-90-days",
    title: "A 90-Day AI SEO Roadmap I Actually Hand to Founders",
    meta_title: "90-Day AI SEO Roadmap",
    description:
      "No infinite backlog—just phases: fix facts, win prompts, compound BOFU. My default roadmap for teams new to GEO.",
    category: "AI SEO",
    tag: "Roadmap",
    date: "2026-03-03",
    intro:
      "Founders want a plan, not a glossary. **This is the 90-day sequence I use** when a SaaS or D2C brand asks where to start with AI visibility.",
    sections: [
      {
        h2: "Days 1–30: Truth layer",
        p: [
          "Entity audit, pricing/integration alignment, prompt baseline, fix top three wrong AI claims, technical blockers on top 10 URLs.",
        ],
      },
      {
        h2: "Days 31–60: Quotable BOFU",
        p: [
          "Ship or refresh 4–6 pages: two comparisons, one pricing clarity pass, one implementation guide, one ‘what is’ category page.",
        ],
      },
      {
        h2: "Days 61–90: Measure and iterate",
        p: [
          "Re-run prompt library, track citation share, double down on winning formats, prune pages that confuse entities.",
        ],
      },
    ],
  },
  {
    slug: "ai-crawler-logs-user-agents",
    title: "AI Crawlers in Your Logs: What to Look For",
    meta_title: "AI Crawler User Agents & Log Analysis",
    description:
      "If bots cannot fetch, you cannot be cited. I review server logs for AI and extended search crawlers the same way I review Googlebot.",
    category: "AI SEO",
    tag: "Technical",
    date: "2026-03-05",
    intro:
      "Clients ask which user-agent to allow. **My answer: know what hits you today** before you paste a robots.txt from Twitter.",
    sections: [
      {
        h2: "Log workflow",
        p: [
          "Export 30 days, filter known AI/search bots, chart status codes and top paths, compare to money pages and doc sections.",
        ],
      },
      {
        h2: "Fix patterns",
        p: [
          "429/503 spikes, redirect chains, WAF blocks, geo blocks on CDN.",
        ],
      },
      {
        h2: "Policy",
        p: [
          "Decide allow/deny per bot based on business policy—document it, do not wing it per environment.",
        ],
      },
    ],
  },
  {
    slug: "local-seo-plus-ai-answers",
    title: "Local SEO When Answers Come From AI, Not Just Maps",
    meta_title: "Local SEO + AI Answers",
    description:
      "Near-me queries now blend Maps, AI summaries, and reviews. I connect GBP work to how models describe local businesses.",
    category: "AI SEO",
    tag: "Local",
    date: "2026-03-07",
    intro:
      "I still fix GBP categories and NAP. **But I also ask:** when someone prompts ‘best X in Pune,’ does the answer match what Maps shows?",
    sections: [
      {
        h2: "Consistency",
        p: [
          "Same services list on site, GBP, and top directories; location pages with unique proof, not copy-paste suburbs.",
        ],
      },
      {
        h2: "Review narrative",
        p: [
          "Reviews that mention specific services help models associate you with intents—not just five stars.",
        ],
      },
      {
        h2: "Local content",
        p: [
          "One page per priority area with local projects, photos, and FAQs—feeds both classic local pack and conversational search.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-trust-india-founders",
    title: "AI Search and Trust: Notes for India Founders",
    meta_title: "AI Search Trust for India Founders",
    description:
      "Buyers in India ask AI the same trust questions they ask on WhatsApp. I adapt GEO for price sensitivity and proof expectations here.",
    category: "AI SEO",
    tag: "India",
    date: "2026-03-10",
    intro:
      "I work from Pune with teams across India and abroad. **Trust signals here are concrete**: named founders, GSTIN on site, case numbers, phone numbers that answer.",
    sections: [
      {
        h2: "Proof beats adjectives",
        p: [
          "Publish implementation timelines, team size required, rupee ranges where possible, client logos only with permission.",
        ],
      },
      {
        h2: "English + local context",
        p: [
          "Write for clear Indian English; add city pages where service is local; do not machine-translate Hindi pages without native review.",
        ],
      },
      {
        h2: "WhatsApp-ready facts",
        p: [
          "Short FAQ answers founders can paste into chats should match site copy—models and humans both copy from the same source.",
        ],
      },
    ],
  },
  {
    slug: "prompt-library-workshop-seo-teams",
    title: "Running a Prompt Library Workshop with Your SEO Team",
    meta_title: "Prompt Library Workshop for SEO Teams",
    description:
      "I facilite a half-day workshop that replaces keyword-only planning with prompts sales and support already hear.",
    category: "LLM SEO",
    tag: "Process",
    date: "2026-03-12",
    intro:
      "Keyword volumes lie quietly; **prompts from CRM do not**. This workshop is how I align marketing, sales, and SEO on AI visibility.",
    sections: [
      {
        h2: "Agenda (4 hours)",
        p: [
          "Hour 1: import top objections from sales. Hour 2: cluster into prompts by funnel stage. Hour 3: baseline test in two engines. Hour 4: assign URLs or gaps.",
        ],
      },
      {
        h2: "Outputs",
        p: [
          "Spreadsheet: prompt, owner, target URL, citation baseline, refresh cadence.",
        ],
      },
      {
        h2: "Anti-patterns",
        p: [
          "Do not let the team invent fantasy prompts—ground in tickets and calls.",
        ],
      },
    ],
  },
  {
    slug: "prune-noindex-ai-era",
    title: "Pruning and Noindex in the AI Era",
    meta_title: "Prune & Noindex Strategy for AI Search",
    description:
      "Index bloat hurt classic SEO; it confuses entities in AI answers too. I prune with the same discipline I use for GSC performance.",
    category: "AI SEO",
    tag: "Technical",
    date: "2026-03-14",
    intro:
      "More indexed URLs is not more visibility. **Models pick the clearest source**—often one strong page, not twelve thin variants.",
    sections: [
      {
        h2: "Candidates to prune",
        p: [
          "Tag pages with no clicks, duplicate intents, old campaign LPs, parameterized faceted URLs.",
        ],
      },
      {
        h2: "How I decide",
        p: [
          "If it does not serve a human or a citation-worthy fact, merge or noindex. Redirect merged content with 301.",
        ],
      },
      {
        h2: "After prune",
        p: [
          "Re-test top prompts—wrong competitor citations sometimes drop when noise leaves the index.",
        ],
      },
    ],
  },
  {
    slug: "internal-wiki-vs-public-content-llm",
    title: "Internal Wiki vs Public Site: What LLMs Should See",
    meta_title: "Internal Wiki vs Public Content for LLMs",
    description:
      "Not everything belongs in public SEO. I draw a line between internal playbooks and customer-facing truth pages.",
    category: "LLM SEO",
    tag: "Strategy",
    date: "2026-03-17",
    intro:
      "Teams ask if they should dump Notion into public docs for AI. **Usually no**—you need a public layer of stable facts, not internal chaos.",
    sections: [
      {
        h2: "Public layer",
        p: [
          "Product facts, pricing rules, security posture, integration list, support procedures customers can run themselves.",
        ],
      },
      {
        h2: "Keep internal",
        p: [
          "Margins, roadmap debates, draft positioning—leaking them hurts trust if indexed.",
        ],
      },
      {
        h2: "Sync process",
        p: [
          "When internal wiki updates, ticket a public doc update within 48 hours for customer-visible changes.",
        ],
      },
    ],
  },
  {
    slug: "brand-sentiment-generated-answers",
    title: "Brand Sentiment When Answers Are Generated",
    meta_title: "Brand Sentiment in AI-Generated Answers",
    description:
      "Neutral is not always bad; inaccurate is. I track tone in AI answers the way I track review sentiment.",
    category: "LLM SEO",
    tag: "Reputation",
    date: "2026-03-19",
    intro:
      "I score answers: positive, neutral, negative, wrong. **Wrong triggers a content fix; negative triggers a product or support fix.**",
    sections: [
      {
        h2: "Scoring rubric",
        p: [
          "Accurate + helpful, accurate + lukewarm, inaccurate, competitor favored unfairly.",
        ],
      },
      {
        h2: "Responses",
        p: [
          "Inaccurate → fact layer. Unfair negative → proof content + third-party validation. Fair negative → fix the underlying issue.",
        ],
      },
    ],
  },
  {
    slug: "enterprise-rag-publisher-seo",
    title: "Enterprise Publishers and RAG-Scale SEO",
    meta_title: "Enterprise RAG Publisher SEO",
    description:
      "Large catalogues need chunk-friendly templates. I help publishers avoid duplicate embeddings drowning good articles.",
    category: "LLM SEO",
    tag: "Enterprise",
    date: "2026-03-21",
    intro:
      "News and edtech clients have thousands of URLs. **Template discipline** matters more than another AI writing tool.",
    sections: [
      {
        h2: "Template rules",
        p: [
          "Stable H1/H2 patterns, synopsis box at top, byline + date, related links manual not infinite auto-tags.",
        ],
      },
      {
        h2: "Canonical strategy",
        p: [
          "Syndication with canonical back; avoid same article on five paths.",
        ],
      },
    ],
  },
  {
    slug: "ecommerce-llm-seo-beyond-feeds",
    title: "Ecommerce LLM SEO Beyond Product Feeds",
    meta_title: "Ecommerce LLM SEO Beyond Feeds",
    description:
      "Feeds fix shopping tabs; LLM SEO needs buying guides, fit FAQs, and policy clarity. I connect catalog SEO to conversational queries.",
    category: "AI SEO",
    tag: "Ecommerce",
    date: "2026-03-24",
    intro:
      "D2C founders obsess over Merchant Center—and ignore **‘best X for Y’** pages assistants quote.",
    sections: [
      {
        h2: "Guide pages",
        p: [
          "Use-case landing pages with criteria tables, not only collection filters.",
        ],
      },
      {
        h2: "Post-purchase content",
        p: [
          "Care, sizing, warranty—reduces returns and gives models factual chunks.",
        ],
      },
    ],
  },
  {
    slug: "weekly-ai-seo-operating-cadence",
    title: "My Weekly AI SEO Operating Cadence",
    meta_title: "Weekly AI SEO Operating Cadence",
    description:
      "What I do every week for clients: prompts, patches, and proof—not another dashboard.",
    category: "LLM SEO",
    tag: "Operations",
    date: "2026-03-26",
    intro:
      "GEO fails when it is a one-time audit. **This is my recurring cadence**—lightweight enough for founders, strict enough for results.",
    sections: [
      {
        h2: "Monday",
        p: ["Re-run 10 priority prompts; log changes in citations or wording."],
      },
      {
        h2: "Wednesday",
        p: ["Ship one content patch: lede, table, or FAQ block on a target URL."],
      },
      {
        h2: "Friday",
        p: [
          "Review GSC + branded search; note sales feedback; adjust next week’s patch.",
        ],
      },
      {
        h2: "Monthly",
        p: [
          "Full prompt library refresh, competitor citation sheet, prune candidates.",
        ],
      },
    ],
  },
];

function renderBody(post) {
  let md = post.intro + "\n\n";
  for (const s of post.sections) {
    md += `## ${s.h2}\n\n`;
    for (const para of s.p) {
      md += para + "\n\n";
    }
  }
  md += `---\n\n*I am Rahul Agarwal, founder of Fundaking Media. I work with founders on technical SEO, LLM visibility, and local lead gen—usually from Pune, often remotely across India and abroad. If this helped, share it with whoever owns search at your company.*\n`;
  return md.trim();
}

function frontmatter(post, i) {
  const img = images[i % images.length];
  const tags =
    post.category === "LLM SEO" ? ["llm-seo", "geo", "deep-dive"] : ["ai-seo", "deep-dive"];
  return `---
title: "${post.title.replace(/"/g, '\\"')}"
meta_title: "${post.meta_title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
date: ${post.date}T09:00:00Z
image: "${img}"
author: "Rahul Agarwal"
author_title: "Founder, Fundaking Media"
author_image: "/images/og-image.png"
tag: "${post.tag}"
read_time: "12 min read"
categories: ["${post.category}"]
tags: ${JSON.stringify(tags)}
draft: false
---

`;
}

for (let i = 0; i < posts.length; i++) {
  const p = posts[i];
  const file = path.join(outDir, `${p.slug}.md`);
  fs.writeFileSync(file, frontmatter(p, i) + renderBody(p), "utf8");
  console.log("wrote", p.slug);
}

console.log(`Done: ${posts.length} deep posts.`);
