/**
 * Uniquely rewrite 16 commercial spokes — distinct H2 structure per slug.
 * Preserves frontmatter + existing blog-infographic figures.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");
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
  const t = fs.readFileSync(p, "utf8").match(/^title:\s*"(.*)"/m)?.[1] ?? slug;
  TITLE_CACHE.set(slug, t);
  return t;
}

function related(slug) {
  const post = map.posts[slug];
  const lines = [];
  if (post) {
    const pillar = map.pillars[post.pillar];
    if (!post.isHub && pillar?.hub)
      lines.push(`- [${titleFor(pillar.hub)}](/blog/${pillar.hub})`);
    for (const sib of (post.siblings || []).slice(0, 2)) {
      if (sib !== slug) lines.push(`- [${titleFor(sib)}](/blog/${sib})`);
    }
    if (pillar?.service)
      lines.push(`- [${pillar.serviceLabel}](${pillar.service})`);
    if (pillar?.proof) lines.push(`- [${pillar.proofLabel}](${pillar.proof})`);
  }
  return `

<!-- fk-cluster-links -->

## Related reading on Fundaking

${lines.join("\n")}

---

*Rahul Agarwal — Fundaking Media. SEO consultant based in Pune / Baramati, serving founders across India.*
`;
}

function figs(body) {
  return [...body.matchAll(/<figure class="blog-infographic">[\s\S]*?<\/figure>/g)].map(
    (m) => m[0],
  );
}

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : null;
}

function touchFm(fm) {
  let out = fm;
  if (!/^date_modified:/m.test(out)) {
    out = out.replace(/^(date:\s*.+)$/m, `$1\ndate_modified: 2026-10-28T06:00:00Z`);
  } else {
    out = out.replace(/^date_modified:\s*.+$/m, `date_modified: 2026-10-28T06:00:00Z`);
  }
  if (/^read_time:/m.test(out)) {
    out = out.replace(/^read_time:\s*.+$/m, `read_time: "16 min read"`);
  }
  return out;
}

/** @type {Record<string, (f1: string, f2: string) => string>} */
const BODIES = {
  "prompt-research-from-sales-calls": (f1, f2) => `
Sales calls are the highest-signal “keyword research” most Indian SaaS and service teams ignore. Prospects already tell you the comparisons, objections, and phrasing they type into Google or paste into ChatGPT. This guide shows how I turn call notes into a prompt/query library that feeds AI SEO and classic content — without buying another research tool.

## The sales-call capture system

I ask founders for the last 10 closed-won and 10 closed-lost call recordings or CRM notes. From each call I extract four fields only:

| Field | Example | Why it matters |
| --- | --- | --- |
| Exact phrases | “We need SEO that gets demos, not traffic” | Becomes H2 / FAQ language |
| Competitors named | Agency X, tool Y | Fuels comparison pages |
| Objections | “AI Overviews killed our CTR” | Becomes educational spokes |
| Desired outcome | “WhatsApp leads from Maps” | Ties content to revenue |

Store these in a shared Sheet: date, segment (SaaS / local / D2C), phrase, mapped URL, owner, status. Review it in the same weekly meeting as pipeline — not a separate SEO call.

## From phrase to URL ownership

Every phrase must map to **one primary URL**. If three blogs fight the same objection, none earns the Overview or the ranking. Rules I use:

1. Money intent (pricing, vs, implementation) → service or pricing URL  
2. Definition / how-to → one cluster spoke  
3. Local / city → city or service-area page  
4. If no URL fits, create one — do not bolt the phrase onto an unrelated post  

${f1}

## Building the prompt library for AI surfaces

For AI Overviews and assistants, rephrase each sales phrase as a **buyer prompt**:

- “Best SEO consultant in Pune for SaaS demos”  
- “How to fix Google Business Profile for WhatsApp leads in India”  
- “Shopify collection filters hurting SEO — what to do”

Then screenshot who currently wins the Overview or the classic SERP. That becomes the battleground list for the [AI Overview optimization checklist](/blog/ai-overview-optimization-checklist).

## Weekly operating cadence (90 minutes)

**Minutes 0–20:** Pull new call notes; add phrases.  
**Minutes 20–40:** Map unmapped phrases to URLs; flag orphans.  
**Minutes 40–70:** Ship one lede/FAQ rewrite on the highest-volume phrase.  
**Minutes 70–90:** Log CTR / demos from that URL; update status.

## Mistakes that waste the research

- Collecting phrases but never changing on-page copy  
- Letting SDRs invent jargon that buyers never type  
- Building 20 blogs from one call instead of fixing one BOFU page  
- Ignoring lost-deal language (often richer than wins)

${f2}

## How Fundaking uses this with clients

In [SEO consulting](/seo-consulting-services) and [AI enablement](/ai-enablement) engagements, the prompt library is a deliverable — not a slide. It connects sales language to crawlable HTML and, when ops are the bottleneck, to CRM automation as in the [Shubhshrey AI CRM case study](/case-study/shubhshrey-industries).

## FAQ

**Do we need call recordings or are CRM notes enough?**  
Notes work if they capture exact buyer language. Recordings are better for nuance.

**How many phrases before we start publishing?**  
Start after 15–20 mapped phrases. Volume without URL ownership creates orphans.

**Does this replace keyword tools?**  
It complements them. Tools show volume; calls show revenue language.

**What if sales refuses to share calls?**  
Sit in two demos yourself. One afternoon beats a month of guesswork.

**Where do prompts go next?**  
Into the five-query Overview sheet and into FAQ blocks that match visible copy.
`,

  "measuring-ai-citations-without-vanity-tools": (f1, f2) => `
Founders keep asking which “AI rank tracker” to buy. Most of them sell dashboards that do not change demos. Here is the measurement stack I use from Pune / Baramati for Indian SaaS and service teams — spreadsheets, Search Console, and disciplined screenshots.

## What “citation” means in practice

I track three states for each battleground prompt:

1. **Named** — brand appears in the AI Overview or assistant answer  
2. **Linked** — URL is cited as a source  
3. **Absent** — competitor or generic sources win  

Named without linked still helps brand search. Linked without demos is vanity. Measure both.

## The five-query sheet (minimum viable)

Columns: prompt, date, Overview present (Y/N), our state (named/linked/absent), competitor named, GSC landing URL, impressions, CTR, demos/calls attributed, notes.

Pick **five** prompts only — the ones sales actually hears. Expand after those stabilize.

${f1}

## Sources of truth (and what to ignore)

| Source | Use for | Ignore for |
| --- | --- | --- |
| Manual screenshots (India locale) | Overview presence + citations | Daily panic |
| Search Console | Impressions/CTR on mapped queries | “AI rank” |
| CRM / WhatsApp logs | Pipeline | Vanity tools |
| Brand SERP | Entity health | Short-term noise |
| Paid AI trackers | Optional secondary check | Primary KPI |

If a vendor cannot explain how their score maps to demos, do not renew.

## Cadence that founders accept

**Biweekly:** Refresh screenshots for the five prompts.  
**Weekly:** GSC CTR + assisted demos from organic landing pages.  
**Monthly:** Brand SERP + About/entity fact audit.

Bring the sheet into the pipeline meeting. If SEO reporting stays a separate PDF of keyword greenery, fire the format — see [monthly SEO reporting CEOs read](/blog/monthly-seo-reporting-that-ceos-read).

${f2}

## Connecting measurement to fixes

When state = absent, run the [AI Overview optimization checklist](/blog/ai-overview-optimization-checklist) on the mapped URL. When named but CTR falls, improve the next-step query (pricing, vs, implementation). When linked but zero demos, fix the CTA and internal path to [AI enablement](/ai-enablement) or [SEO consulting](/seo-consulting-services).

## FAQ

**Is a free Sheet enough for Series A SaaS?**  
Yes until you have more than ~25 battleground prompts and a dedicated SEO owner.

**How long before we see citation changes?**  
Often 2–6 weeks after a money-URL rewrite; entity cleanup can take longer.

**Should agencies report “AI Overview rankings”?**  
Ask for the five-query sheet and pipeline impact — not a proprietary score alone.

**Does this work for local businesses?**  
Pair with Maps/call metrics. Overviews matter less than GBP for many “near me” queries.

**What is the fastest instrumentation win?**  
Create the five rows this week and screenshot once. Everything else builds on that baseline.
`,

  "ai-enablement-plus-ai-seo-same-stack": (f1, f2) => `
AI SEO without operational enablement leaves citations stranded. AI enablement without discoverable pages leaves automation feeding on thin traffic. I run them as one stack for Indian founders: visibility in search/answer engines, then systems that turn that attention into qualified conversations.

## Two outcomes, one diagnosis

| Layer | Question | Owner signal |
| --- | --- | --- |
| AI SEO | Can crawlers and models quote accurate facts about us? | HTML answers, entity consistency, cluster links |
| AI enablement | Can we route, enrich, and respond to leads without chaos? | CRM hygiene, WhatsApp/desk workflows, enrichment |

If demos stall, I check both. The [Shubhshrey Industries](/case-study/shubhshrey-industries) engagement is the pattern: visibility work plus CRM/AI ops.

## Where teams split the stack wrongly

Marketing buys “AI content.” Ops buys a chatbot. Neither owns the money URL facts. Result: assistants invent pricing, SDRs contradict the site, and Search Console looks fine while pipeline does not.

${f1}

## The joint 30-day sequence

**Days 1–7:** Baseline GSC + five buyer prompts; map CRM lead stages; list contradictory facts (pricing, NAP, founder bio).  
**Days 8–14:** Fix one money URL for crawl/HTML answers; align CRM fields to the same facts.  
**Days 15–21:** Wire hub ↔ spoke ↔ [AI enablement](/ai-enablement) ↔ proof; automate one handoff (form → WhatsApp or enrichment).  
**Days 22–30:** Measure demos + citation log; decide next URL or next ops workflow.

## Governance that prevents drift

- One glossary of product/service names used in site, schema, and CRM  
- One primary CTA per educational URL  
- Strategist who diagnoses stays in the loop for both SEO tickets and automation tickets  

That is how [SEO consulting](/seo-consulting-services) and AI enablement are scoped from Pune / Baramati.

${f2}

## When to sequence SEO first vs ops first

**SEO first** when money pages are uncrawlable, facts conflict, or Overviews cite competitors.  
**Ops first** when traffic exists but leads rot in inboxes or WhatsApp is untracked.  
**Parallel** when both are broken — but still one prioritised backlog, not two agencies thrashing.

## FAQ

**Is AI enablement just chatbots?**  
No — enrichment, routing, and CRM hygiene matter more than a widget.

**Can we do AI SEO without enablement?**  
Yes briefly. Growth stalls when humans cannot handle the upside.

**Do we need a big engineering team?**  
No. Clear tickets with acceptance criteria beat vague “AI transformation” programmes.

**How does this relate to classic technical SEO?**  
Technical gates still come first — see the [technical SEO audit checklist](/blog/technical-seo-audit-checklist-2026).

**Where should a founder start on the site?**  
[What Is AI SEO?](/blog/what-is-ai-seo-definition-2026), then [AI enablement](/ai-enablement), then a [strategy call](/contact).
`,

  "brand-knowledge-panel-entity-cleanup": (f1, f2) => `
A messy brand SERP and Knowledge Panel quietly poison AI answers and classic trust. This is the cleanup playbook I run before scaling content for Indian brands — especially when Google shows the wrong industry, old address, or a namesake conflict.

## Symptoms that mean entity work is P0

- Brand search shows outdated NAP or a different business with a similar name  
- Knowledge Panel missing, duplicated, or mixing social profiles  
- AI Overviews invent founder names, cities, or offers  
- Organization schema disagrees with the About page  

If any two are true, pause vanity blogging and fix the entity.

## The entity inventory (one afternoon)

List every public fact Google might merge: legal name, trade name, founder, logo, address (Baramati / Pune), phone, email, sameAs profiles, categories. Diff that list against: homepage, About, contact, GBP, LinkedIn, schema JSON-LD, and top five blogs.

${f1}

## Cleanup sequence that usually works

1. **Align on-site facts** — About, contact, footer, schema Organization/LocalBusiness  
2. **Align GBP** — categories, services, website URL, hours  
3. **sameAs hygiene** — LinkedIn, Maps place URL, review URL; drop dead profiles  
4. **Disambiguation content** — clear “who we are / who we are not” on About  
5. **Request updates** where Google provides UI; document screenshots  
6. **Re-check brand SERP weekly** for 4–6 weeks  

Deep companion: [Entity SEO for AI Overviews](/blog/entity-seo-for-ai-overviews).

## What not to do

- Creating fake Wikipedia pages  
- Spamming directories to “force” a panel  
- Changing the brand name every quarter  
- Leaving old .php URLs with conflicting NAP in the index  

${f2}

## How this ties to Fundaking services

Entity cleanup is usually a workstream inside [SEO consulting](/seo-consulting-services) or [local SEO](/local-seo-consultant) when Maps and brand search both matter. For AI-heavy teams, pair with [AI enablement](/ai-enablement) so CRM facts match the public entity.

## FAQ

**Do we need a Knowledge Panel to rank?**  
No — but a wrong panel actively hurts trust and AI summaries.

**How long does cleanup take?**  
On-site fixes are days; Google’s reflection can take weeks.

**What if another company shares our name?**  
Strengthen NAP + founder + category co-occurrence; consider a clearer trade name in titles.

**Is schema enough?**  
Schema helps consistency; it does not override contradictory visible copy.

**Where do we start?**  
[About](/about) + Organization schema + brand SERP screenshots this week.
`,

  "seo-kpi-dashboard-for-founders": (f1, f2) => `
Founders do not need fifty SEO metrics. They need a dashboard that predicts demos and calls. This is the KPI set I put in front of CEOs in India — and the vanity metrics I delete from agency decks.

## The only tiles that earn a seat

| KPI | Definition | Cadence |
| --- | --- | --- |
| Organic qualified pipeline | Demos/calls/WhatsApp from organic landing pages | Weekly |
| Money-URL health | 200 + indexable + in sitemap for top 10 revenue URLs | Weekly |
| GSC CTR on battleground queries | Impressions stable, CTR movement | Weekly |
| Brand search impressions | Proxy for entity/demand | Monthly |
| Technical P0 open count | Redirects, noindex accidents, CWV fails on money URLs | Weekly |

Everything else (DA, average position across thousands of keywords) is optional colour.

${f1}

## How to build it in one week

**Day 1:** Export GSC landing pages; mark money URLs.  
**Day 2:** Connect analytics/CRM UTM or landing-page attribution.  
**Day 3:** Create a Sheet with the five tiles + owners.  
**Day 4:** Baseline technical P0s on money URLs.  
**Day 5:** Present in the pipeline meeting; kill the old rank PDF.

## Agency reporting that fails the founder test

If the deck leads with “keywords in top 10” and buries demos on slide 18, the operating system is wrong. Replace it with the [monthly SEO reporting CEOs read](/blog/monthly-seo-reporting-that-ceos-read) format.

${f2}

## Linking KPIs to actions

- Pipeline flat + impressions up → CTA / offer / speed on money URLs  
- CTR down on heads with Overviews → [AI Overview checklist](/blog/ai-overview-optimization-checklist)  
- Money-URL health red → [technical SEO](/technical-seo-consultant) tickets before content  
- Brand search soft → entity cleanup  

## FAQ

**Should we track keyword rankings at all?**  
Yes as a diagnostic for battleground queries — not as the north-star KPI.

**What about domain authority?**  
Ignore it for operating decisions.

**Can Looker/Data Studio replace the Sheet?**  
Later. Start simple so the CEO actually opens it.

**How does Pune/Baramati context change KPIs?**  
Local businesses weight calls/WhatsApp heavier; SaaS weights demos/MQLs.

**Who owns the dashboard?**  
Marketing ops or the strategist — not a junior who only updates ranks.
`,

  "when-to-fire-your-seo-agency": (f1, f2) => `
Firing an SEO agency is a business decision, not a tantrum about rankings. Use this scorecard when organic pipeline stalls while the monthly PDF still looks green.

## Hard fire signals (any two = serious conversation)

1. No access to the strategist who makes decisions — only account managers reading slides  
2. Cannot produce a five-query battleground sheet with screenshots  
3. Money URLs still have crawl/index defects after two quarters  
4. Reporting is rankings-only; demos/calls never appear  
5. Content volume without cluster architecture or internal links to BOFU  
6. Contradictory facts remain on pricing/About/GBP after you flagged them  

## Soft fire signals (coach first, then fire)

- Slow ticket turnaround but honest communication  
- Good technical work, weak commercial prioritisation  
- Over-indexed on one channel (only blogs, or only links)

${f1}

## The 30-day exit / transition plan

**Week 1:** Export all logins, GSC, analytics, content inventory, backlink exports.  
**Week 2:** Freeze new vanity content; list P0 technical defects.  
**Week 3:** Decide next model — in-house, consultant, or hybrid (see [in-house vs consultant vs agency](/blog/in-house-seo-vs-consultant-vs-agency)).  
**Week 4:** Hand off roadmap; rewrite one money URL so momentum does not die.

Do not ghost the agency without securing credentials. Do not hire a replacement on “guaranteed #1” pitches.

${f2}

## What “good” looks like after the switch

A 90-day roadmap tied to revenue URLs, weekly KPI tiles founders read, and a strategist who stays after the audit. That is how [SEO consulting](/seo-consulting-services) is scoped from Pune / Baramati — founder-led, capped engagements.

## FAQ

**Should we fire mid-contract?**  
Read the SOW. Often a scoped wind-down beats paying for theatre.

**What if rankings are up but leads are flat?**  
That is still a fail — fire the KPI system even if you keep some tactics.

**Is a cheaper freelancer the answer?**  
Only with a clear roadmap and QA. Cheap without prioritisation repeats the problem.

**How do we evaluate the next partner?**  
Use the [SEO RFP template](/blog/seo-rfp-template-india) and demand case-level proof.

**Can we pause SEO entirely for a quarter?**  
You can pause publishing; do not pause money-URL monitoring.
`,

  "in-house-seo-vs-consultant-vs-agency": (f1, f2) => `
The wrong operating model wastes a year. Here is the decision matrix I walk Indian founders through when choosing in-house SEO, an independent consultant, or an agency — based on stage, engineering access, and how decisions get made.

## Decision matrix

| Situation | Prefer | Why |
| --- | --- | --- |
| Early SaaS, founder-led priorities, few money URLs | Consultant | Strategy + roadmap without junior theatre |
| Multi-brand / multi-country with ticket volume | Agency or hybrid | Capacity, if strategist access is contractual |
| Strong eng + content team, needs prioritisation | Consultant advisory + in-house execution | Best cost/quality balance |
| Local multi-location ops heavy | Hybrid: consultant + local ops owner | Maps + pages need local context |
| No internal owner at all | Agency with named senior, or hire SEO lead first | Otherwise recommendations rot |

${f1}

## Cost and control tradeoffs

**In-house:** Highest context, slowest to seniority, risk of one-person bus factor.  
**Consultant:** High seniority per rupee, limited pair-of-hands — your team ships.  
**Agency:** Capacity and process, risk of bait-and-switch seniors.

Ask every option for: who diagnoses, who writes tickets, who QA’s, and which KPI tiles they own.

${f2}

## Hybrid patterns that work in India

1. Consultant sets 90-day roadmap; in-house marketer executes content; eng owns technical PRs  
2. Agency runs production; consultant does quarterly QA against the [SEO KPI dashboard](/blog/seo-kpi-dashboard-for-founders)  
3. Local SEO ops in-house; national/category SEO with consultant  

Proof of hybrid consulting style: [SaaS demo requests case study](/case-study/saas-demo-requests) and [SEO consulting services](/seo-consulting-services).

## FAQ

**When is a full-time SEO hire better than a consultant?**  
When ticket volume is continuous and you already have a clear roadmap to execute.

**Can an agency and consultant coexist?**  
Yes if roles are written down — otherwise they fight.

**What about freelancers?**  
Treat as consultants; demand the same scorecard.

**Does AI SEO change the model?**  
It raises the need for senior prioritisation — juniors shipping AI blogs without entity/technical gates fails faster.

**Where should we start if unsure?**  
[Book a strategy call](/contact) with a written recommendation of model, not a retainer pitch on day one.
`,

  "seo-roadmap-for-saas-founders-india": (f1, f2) => `
Indian SaaS founders do not need a 40-page SEO strategy deck. They need a six-month roadmap that protects demos while the product ships. This is the sequence I use for B2B SaaS from Pune / Baramati — remote across India.

## Month 0: freeze vanity, pick money URLs

List pricing, comparison, integration, and alternative pages. Confirm each returns 200, is indexable, and appears in the sitemap. If not, stop blogging.

## Months 1–2: technical + entity foundation

- Crawl money templates (especially JS-rendered marketing sites)  
- Align product names, pricing bands, founder bio across site and LinkedIn  
- Fix redirect chains and accidental noindex  
- Stand up the [KPI dashboard](/blog/seo-kpi-dashboard-for-founders)  

${f1}

## Months 3–4: BOFU depth, not blog volume

Rewrite or build:

1. One category definition hub  
2. Two comparison / alternatives pages using sales language ([prompt research](/blog/prompt-research-from-sales-calls))  
3. One implementation / integration guide  
4. Internal links from every new asset to pricing/demo  

Optional: AI Overview readiness on the five battleground queries.

## Months 5–6: cluster expansion + measurement

Expand only after BOFU pages convert. Add TOFU spokes that feed the hub. Review demos from organic monthly; cut anything that does not assist pipeline.

${f2}

## Resourcing the roadmap

Most Series A teams succeed with consultant advisory + one marketer + eng tickets — see [in-house vs consultant vs agency](/blog/in-house-seo-vs-consultant-vs-agency). Full [SEO consulting](/seo-consulting-services) when prioritisation thrash is the bottleneck. Proof pattern: [SaaS demo requests](/case-study/saas-demo-requests).

## FAQ

**Can we compress this into 90 days?**  
Yes if engineering bandwidth exists and you skip TOFU volume.

**What if product marketing owns the site?**  
SEO still needs ticket access; otherwise the roadmap is theatre.

**Do we need local SEO as a SaaS?**  
Only for hiring/brand city pages — not as the growth engine.

**How does AI search change the six months?**  
Same foundation; add citation logging in months 3–6.

**When do we hire in-house SEO?**  
After the roadmap is clear and ticket volume is steady.
`,

  "shopify-technical-seo-checklist": (f1, f2) => `
Shopify SEO fails in predictable places: theme apps, collection filters, product canonicals, and speed on Indian 4G. Use this checklist before you hire writers.

## Indexation and canonicals

- [ ] Homepage, collections, and products return 200 without multi-hop redirects  
- [ ] Canonicals on products point to the preferred product URL (not a duplicate variant URL you do not want indexed)  
- [ ] Search, cart, account, and filtered collection URLs are noindex or canonicalised intentionally  
- [ ] XML sitemap in GSC includes products/collections you want; excludes noise  

## Faceted navigation and crawl waste

Filters that create infinite \`?sort\` / attribute URLs split equity. Decide which facet combinations deserve indexation. Block or canonical the rest. Detail: [faceted navigation SEO](/blog/faceted-navigation-seo-ecommerce).

${f1}

## Speed and Core Web Vitals (India)

- Audit app scripts; remove unused apps  
- Compress hero media; lazy-load below-fold  
- Test money collections on mid-tier Android + 4G  
- Track LCP/INP on templates that sell, not only homepage  

See [Core Web Vitals for Shopify India](/blog/core-web-vitals-shopify-india).

## Structured data and content truth

- Product schema price/availability must match visible page  
- Avoid multiple conflicting Product blocks from apps  
- Collection copy should not be empty thin shells if you want rankings  

${f2}

## 14-day Shopify hardening sprint

Days 1–3: Crawl + GSC coverage. Days 4–7: Canonical/facet decisions + app purge. Days 8–11: CWV on top collections. Days 12–14: Schema QA + resubmit sitemaps.

When eng capacity is thin, [technical SEO consulting](/technical-seo-consultant) writes tickets with acceptance criteria your Shopify developer can merge.

## FAQ

**Is Shopify bad for SEO?**  
No — misconfigured apps and facets are.

**Do we need an SEO app?**  
Rarely as a silver bullet; fix theme/canonicals first.

**What about international / hreflang?**  
Only if you truly serve multiple markets — see [hreflang India multilingual](/blog/hreflang-seo-india-multilingual).

**Should we blog on the Shopify domain?**  
Yes if it links to collections/products; no if it is an orphan magazine.

**Fastest win?**  
Kill accidental indexation of filtered URLs and fix product canonicals.
`,

  "wordpress-technical-seo-hardening": (f1, f2) => `
WordPress SEO problems are usually plugin debt, not a missing Yoast toggle. This hardening checklist is what I run on Indian SMB and content-heavy WP sites before content scale-up.

## Crawl and index basics

- [ ] Pretty permalinks; no unintended \`/?p=\` exposure as canonical  
- [ ] XML sitemaps (core or SEO plugin) submitted; exclude thank-you, cart, account  
- [ ] noindex on thin archives you do not want (date archives, empty tags)  
- [ ] 404/410 for removed money URLs with redirects only when a true successor exists  

## Plugin and theme debt

List every plugin; remove abandoned ones. Page builders that ship empty HTML shells hurt both CWV and AI citation. Prefer server-rendered critical copy.

${f1}

## Performance and hosting

- Object/page cache appropriate to host (not three conflicting caches)  
- Image sizes disciplined; no full-bleed 4MB PNGs  
- Measure LCP on service/product templates on mobile India networks  
- Avoid stacking optimization plugins that rewrite the same assets  

## Schema and SEO plugins

One SEO plugin owns titles/canonicals/schema. Disable duplicate schema from page builders. Organization/LocalBusiness facts must match [About](/about) and GBP when local.

${f2}

## Hardening sprint (10 business days)

Day 1–2: Crawl + coverage report. Day 3–5: Plugin purge + sitemap rules. Day 6–8: Cache/CWV. Day 9–10: Schema QA + redirect map.

For WooCommerce, also run product/category canonical checks like Shopify. Escalate via [technical SEO consulting](/technical-seo-consultant) when migrations or multisite block progress — proof pattern in [fintech organic growth](/case-study/fintech-organic-growth).

## FAQ

**Is Rank Math vs Yoast the issue?**  
Almost never. Configuration and duplicate schema are.

**Should we rebuild on Headless?**  
Only with a rendering plan — see [Next.js SEO rendering](/blog/nextjs-seo-rendering-guide).

**How often to re-audit?**  
After major plugin/theme changes and quarterly otherwise.

**What about security plugins?**  
Keep them; ensure they do not block crawlers from CSS/JS needed to understand layout.

**Fastest win?**  
noindex empty archives + remove one heavy abandoned plugin.
`,

  "index-bloat-cleanup-playbook": (f1, f2) => `
Index bloat quietly drains crawl budget and dilutes topical authority. This playbook is how I shrink a noisy index for Indian ecommerce and content sites without deleting revenue URLs by accident.

## Diagnose before you prune

Export GSC pages report + site crawl. Segment URLs:

| Bucket | Examples | Default action |
| --- | --- | --- |
| Money | Product, service, pricing, city | Keep; fix if soft-404 |
| Useful support | Guides that convert | Keep; improve links |
| Parameter/facet noise | Sorted filters, session IDs | noindex/canonical/block |
| Thin archives | Empty tags, date archives | noindex |
| Expired campaigns | Old landing pages | 301 to successor or 410 |

Never mass-noindex without sampling 20 URLs per bucket.

${f1}

## Cleanup tactics ranked by risk

1. **Canonical/facet rules** — lowest drama for ecommerce  
2. **robots/meta noindex** on confirmed thin templates  
3. **Parameter handling in GSC** (legacy) + server rules  
4. **301** only with a clear replacement  
5. **410/404** for dead weight with no successor  

Document every rule in a Sheet: pattern, action, owner, date.

${f2}

## 21-day cleanup programme

Week 1: Segment + sample. Week 2: Ship rules on staging; validate. Week 3: Production + monitor coverage/impressions on money URLs daily.

Pair with [XML sitemap best practices](/blog/xml-sitemap-best-practices-2026) so the sitemap stops advertising junk. For AI-era pruning nuance see [prune/noindex in the AI era](/blog/prune-noindex-ai-era).

## FAQ

**Will pruning tank traffic?**  
Not if money URLs are protected and sampled. Reckless bulk noindex will.

**How do we know it worked?**  
Indexed count falls while money-URL impressions hold or rise.

**Who should approve deletions?**  
Marketing + eng together; SEO alone should not 410 product URLs.

**Is bloat only an ecommerce problem?**  
No — publishers with tag/date archives suffer too.

**Need help?**  
[Technical SEO consulting](/technical-seo-consultant) for crawl/index triage.
`,

  "internal-linking-architecture-seo": (f1, f2) => `
Internal links are the cheapest ranking and conversion lever most teams underuse. This is the architecture I install for topical clusters on Fundaking-style sites and client SaaS/service properties.

## Hub-and-spoke rules

1. One **hub** per commercial topic (definition + links to all spokes)  
2. Each **spoke** links up to the hub with a descriptive anchor  
3. Spokes link sideways to 1–2 siblings — not a random footer dump  
4. Every educational URL links once to a **service** and once to **proof** when claims get specific  
5. Hubs list spokes; orphans are bugs  

Fundaking’s four pillars follow this map — see [content cluster strategy](/blog/content-cluster-strategy-b2b-india).

${f1}

## Anchor text that helps humans and models

Use destination meaning: “technical SEO audit checklist”, not “click here”. Vary lightly; do not exact-match spam. In-body links beat only-nav links for discovery.

## Audit process (half day)

Crawl internal outlinks from hubs and money URLs. Flag: orphan spokes, hubs with <3 children, educational pages with zero BOFU link, over-optimised repeated anchors. Fix in batches of 20 links — measurable and reversible.

${f2}

## Linking for AI citations

Assistants follow clear entity paths. A cited guide that never links to pricing/demo wastes the click. Conversely, stuffing five CTAs dilutes trust — one primary CTA.

## FAQ

**How many internal links per article?**  
Enough to cover hub + sibling + service/proof; typically 5–12 in-body links for long guides.

**Should we automate links?**  
Carefully. Bad automation creates spammy sidebars.

**Do footer links count?**  
Weakly. Prioritise contextual body links.

**What about orphan case studies?**  
Link them from services and related spokes — proof should not hide.

**Where to start on Fundaking’s model?**  
Open a pillar hub, ensure every spoke is listed and reciprocates.
`,

  "google-maps-ranking-factors-india-2026": (f1, f2) => `
Google Maps ranking in India still hinges on relevance, distance, and prominence — but the operators who win in Pune, Baramati, and multi-city markets obsess over GBP hygiene, review velocity, and on-site city proof. Here is the 2026 working model I use with service businesses.

## Factors I weight in audits

| Factor | What “good” looks like in India | Common fail |
| --- | --- | --- |
| Relevance | Exact categories + services matching queries | Too-broad categories |
| Distance | Real service area; honest coverage | Fake pin / overclaiming cities |
| Prominence | Reviews, citations, brand search, links | Review gating or spam citations |
| GBP activity | Photos, posts, Q&A, products/services | Abandoned profile |
| On-site proof | Unique city/service pages | Spun city clones |

${f1}

## GBP operating checklist (weekly)

- Respond to every review within 48 hours  
- Add real photos from jobs (not stock)  
- Post once weekly with service + city language  
- Keep hours, phone, WhatsApp, and website UTM consistent  
- Monitor for duplicate listings weekly  

## On-site pages that support Maps

City pages need unique proof: service area description, FAQs, photos, embedded map, and click-to-call/WhatsApp. Template: [local landing page India](/blog/local-landing-page-template-india). Decision frame: [local vs national SEO](/blog/local-seo-vs-national-seo-decision).

${f2}

## 30-day Maps sprint

Week 1: Duplicate listing scan + category cleanup. Week 2: Photo/review response blitz. Week 3: One city page rewrite. Week 4: Measure calls/WhatsApp; compare pack screenshots.

Engage [local SEO consulting](/local-seo-consultant) when multi-location or agency networks create conflicting NAPs — proof: [Real Group case study](/case-study/real-group).

## FAQ

**Do backlinks still matter for Maps?**  
Yes as prominence — but spam directories without proximity relevance underperform.

**Is review quantity or velocity more important?**  
Both; sudden fake spikes are risky. Steady authentic velocity wins.

**Can we rank in a city without an office?**  
Service-area businesses can, with honest settings and strong proof — not fake addresses.

**How often do factors change?**  
Weighting shifts; the hygiene basics rarely do.

**Fastest win?**  
Fix categories, remove duplicates, respond to reviews, add 10 real photos.
`,

  "nap-consistency-india-directories": (f1, f2) => `
NAP inconsistency (Name, Address, Phone) is still one of the fastest ways to confuse Google and customers across India. This guide prioritises which directories matter and how to keep them boringly identical.

## The canonical NAP record

Write one line each for:

- **Name** — legal vs trade name (pick the public trade name and stick to it)  
- **Address** — same punctuation and pin code (e.g. Baramati / Pune district realities)  
- **Phone** — one primary click-to-call number (+91 format consistent)  

Propagate that record to: website contact/footer/schema, GBP, LinkedIn, and the small set of directories that actually refer traffic.

${f1}

## Directory priority for India (not a spam list)

Focus first on: Google Business Profile, Justdial/IndiaMART only if they send leads for your category, industry associations, and chamber/listings your buyers already use. Do **not** submit to 200 random citation sites.

Audit quarterly: screenshot mismatches; fix high-traffic properties first.

${f2}

## Operational habit

One person owns NAP changes. Any office move updates the Sheet first, then GBP, then site schema, then directories. Marketing campaigns never invent a second phone number “for tracking” without UTM/call-tracking that still displays the same public NAP where required.

## FAQ

**Should name include keyword city?**  
Avoid spammy “Best SEO Pune Fundaking” style names on GBP.

**What if we serve pan-India from Baramati?**  
Be honest in service area; do not fake city addresses.

**Are citations dead because of AI?**  
Core NAP consistency still matters for Maps and trust.

**How does schema fit?**  
LocalBusiness/Organization telephone and address must match visible NAP.

**Need a cleanup project?**  
[Local SEO consulting](/local-seo-consultant) + [citation building without spam](/blog/citation-building-without-spam-india).
`,

  "whatsapp-leads-from-google-maps-india": (f1, f2) => `
In India, the Maps pack often converts on WhatsApp before the website form. If you treat GBP as a brochure, you leave money on the table. Here is how I set up WhatsApp-driven local lead flow without breaking NAP or tracking.

## Why WhatsApp is the conversion layer

Buyers message after hours. Sales already lives in WhatsApp. Your job is to make the path from pack → chat tracked and fast — then still keep a website path for those who prefer it.

## GBP setup for chat-led leads

- Primary phone correct; WhatsApp business linked where supported  
- Website button uses a UTM’d URL that still opens a clear WhatsApp CTA above the fold on mobile  
- Services and products filled so relevance matches queries  
- Messaging / chat features enabled and monitored  

${f1}

## On-site and landing-page pattern

City/service pages should show: click-to-call, WhatsApp deep link with pre-filled text, and one short form. Do not hide WhatsApp in the footer only. Example structure in [local landing page template](/blog/local-landing-page-template-india).

## Tracking without fake phone numbers chaos

Use unique UTM links and WhatsApp pre-filled codes per campaign. Keep the **public NAP** stable for citations/GBP. Log chats into CRM daily — AI enablement helps when volume spikes ([AI enablement](/ai-enablement)).

${f2}

## 14-day experiment

Days 1–3: Baseline call/WhatsApp volume from GBP insights + CRM. Days 4–7: Add WhatsApp CTA on top city page + GBP. Days 8–14: Compare qualified chats; keep what converts.

## FAQ

**Will WhatsApp links hurt SEO?**  
No if pages still have crawlable content and a normal website UX.

**Should we remove forms?**  
Keep both; WhatsApp often wins on mobile.

**How fast must we reply?**  
Under 15 minutes during business hours — speed-to-lead is the ranking factor customers feel.

**Multi-location?**  
Per-location WhatsApp routing or clear labels so chats do not land in the wrong city inbox.

**Who helps implement?**  
[Local SEO consulting](/local-seo-consultant) plus ops via [AI enablement](/ai-enablement) when routing breaks.
`,

  "citation-building-without-spam-india": (f1, f2) => `
Citation building in India went wrong when agencies sold “1,000 directories” packages. Useful citations are few, accurate, and category-relevant. This is the non-spam playbook.

## Quality over quantity

A citation earns its keep when: NAP matches, the site has real referral or prominence value for your category, and you can maintain the listing. Ten clean citations beat two hundred with wrong pin codes.

${f1}

## Build list (examples of thinking, not a blast list)

- GBP (non-negotiable)  
- Industry marketplaces your buyers already use (e.g. relevant B2B directories for manufacturing)  
- Local chamber / trade associations when legitimate  
- Partner / supplier public listings  
- PR and digital news only when the story is real  

Skip: automated submission blasts, keyword-stuffed titles, duplicate spawns.

${f2}

## Maintenance cadence

Quarterly NAP audit across the active list. After any move or phone change, update GBP and site the same day, directories within a week. Remove duplicates rather than “claiming everything.”

## Tie-in to Maps and entity

Citations support prominence for [Maps ranking](/blog/google-maps-ranking-factors-india-2026) and reinforce entity cleanup. They do not replace reviews, photos, or on-site proof.

## FAQ

**Do citations still matter in 2026?**  
Yes for local prominence — as accuracy, not volume.

**Should SaaS chase local citations?**  
Usually no beyond brand entity consistency.

**How many is enough?**  
Often 10–30 meaningful ones for a single-location service business.

**Can AI tools auto-build citations?**  
They often create spam. Manual QA required.

**Get help?**  
[Local SEO consulting](/local-seo-consultant) and the [NAP consistency guide](/blog/nap-consistency-india-directories).
`,
};

const SLUGS = Object.keys(BODIES);
let n = 0;
for (const slug of SLUGS) {
  const file = path.join(blogDir, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const parsed = parse(raw);
  if (!parsed) throw new Error(`parse fail ${slug}`);
  const f = figs(parsed.body);
  const f1 = f[0] ? `\n${f[0]}\n` : "";
  const f2 = f[1] ? `\n${f[1]}\n` : "";
  const body = BODIES[slug](f1, f2).trim() + related(slug);
  const payload = `---\n${touchFm(parsed.fm)}\n---\n\n${body.trim()}\n`;
  fs.writeFileSync(file, payload, "utf8");
  n++;
  const wc = body.split(/\s+/).filter(Boolean).length;
  console.log(`${slug}: ~${wc} words`);
}
console.log(`[rewrite-priority-16] Wrote ${n} unique posts`);
