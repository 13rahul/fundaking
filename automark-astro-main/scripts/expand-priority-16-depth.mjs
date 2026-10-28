/**
 * Appends unique long-form depth to the 16 priority posts (target ~1800+ words).
 * Distinct H2 titles per slug — not a shared template.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "../src/content/blog");

const DEPTH = {
  "prompt-research-from-sales-calls": `
## Call tagging taxonomy I actually use

I tag every extracted phrase with one of: **problem**, **comparison**, **pricing**, **implementation**, **trust**, or **local**. Problem phrases become hub/spoke education. Comparison and pricing become BOFU pages. Trust phrases feed About, case studies, and review asks. Local phrases feed GBP and city pages.

Without taxonomy, teams dump everything into the blog and wonder why demos do not move. Taxonomy forces URL ownership.

## Example: SaaS discovery call → three assets

Prospect says: “We tried an agency for a year, got traffic, zero demos, and now AI Overviews stole our head terms.”

Mapped assets:

1. **Service page** lede updated to “demos, not traffic” language  
2. **Spoke** on AI Overview CTR diagnosis linking to the checklist  
3. **Case study** proof block on qualified pipeline  

That is three ships from one sentence — not thirty thin posts.

## Objection library for India SaaS

Recurring objections I hear in Pune and remote India calls: agency theatre, “SEO takes forever,” paid ads dependency, engineering bandwidth, fear of AI zero-click. Each objection gets a living FAQ answer on the money URL and a longer spoke only if the FAQ cannot hold the nuance.

## CRM fields that make this durable

Add optional fields: \`seo_phrases\`, \`competitors_mentioned\`, \`primary_objection\`. SDRs need a 10-second habit, not a novel. Review weekly with marketing.

## What “done” looks like after 60 days

- 40+ mapped phrases with owners  
- Five battleground URLs rewritten with sales language in the first screen  
- Prompt/Overview sheet updated biweekly  
- At least one closed-won deal where the buyer quoted your page language back  

If those four are missing, you are collecting folklore, not running research.
`,

  "measuring-ai-citations-without-vanity-tools": `
## Screenshot protocol (so the sheet stays honest)

Same browser profile, India locale, logged-out, same device class when possible. Save PNG with date in filename: \`2026-10-28_prompt-slug.png\`. Never compare a branded logged-in SERP to an incognito one without noting it.

For assistants (ChatGPT, Perplexity, Gemini), paste the exact prompt, note model/date, and whether your brand is named or linked. Assistants are unstable — treat them as directional, GSC + demos as decisive.

## Attribution without fantasy multi-touch models

Until you have a data team, use **last non-direct organic landing page** before demo booking, plus a “touched organic money URL in 14 days” assist flag. Perfect attribution is less important than consistent direction.

## Red flags in vendor AI dashboards

- Scores with no URL-level evidence  
- US-centric SERP sampling sold as India truth  
- Daily rank volatility alerts that trigger panic publishing  
- No export of raw prompts/URLs  

Ask for a sample export before buying. If they refuse, walk.

## Quarterly executive one-pager

One page only: five prompts table, pipeline from organic, top three technical P0s, decision asked of the CEO (invest / hold / cut). That beats a 30-slide SEO theatre deck.
`,

  "ai-enablement-plus-ai-seo-same-stack": `
## Shared fact registry

Maintain a single Notion/Sheet “source of truth” for: product names, pricing bands, cities served, founder bio, SLA claims. Site, schema, CRM snippets, and chatbot answers must pull from it. When sales updates pricing, marketing and ops get the same change ticket.

## Automation tickets that pair with SEO tickets

Good pairs:

- Money URL rewrite ↔ form/WhatsApp routing update  
- Entity cleanup ↔ CRM company name normalisation  
- New comparison page ↔ battlecard in HubSpot/Zoho for SDRs  

Bad pairs: chatbot launch while pricing page 404s; AI blog batch while leads sit unanswered for two days.

## Risk controls

Do not let generative tools invent case metrics. Do not auto-publish AI drafts to money URLs without human QA. Do not connect a scraper to production CRM without access controls.

## Staffing the stack in a 15-person company

One marketer owns URL facts. One ops owner owns CRM hygiene. Consultant/strategist owns prioritisation across both for 90 days. Engineering gets tickets with acceptance criteria, not vibes.
`,

  "brand-knowledge-panel-entity-cleanup": `
## Namesake and category collision playbook

If Google merges you with another firm:

1. Strengthen unique identifiers (founder full name, distinctive trade name, exact address)  
2. Publish a clear About disambiguation paragraph  
3. Align logo consistently across GBP and LinkedIn  
4. Avoid abbreviated names that collide  
5. Document evidence for support requests  

## Social profile hygiene

sameAs should list living profiles only. Dead Facebook pages and old Clutch profiles with wrong NAP hurt more than they help. Prefer LinkedIn company + founder + Maps place URL.

## After a rebrand or office move

Treat it like a migration: update site + schema day 0, GBP day 0, directories within 7 days, monitor brand SERP for 6 weeks. Keep 301s from old trademark URLs if they had equity.

## Measuring entity health

Monthly brand SERP screenshot, Knowledge Panel field checklist, and a spot-check of three AI prompts containing your brand name for hallucinated facts.
`,

  "seo-kpi-dashboard-for-founders": `
## Sample Sheet schema

Tabs: \`Executive\`, \`MoneyURLs\`, \`Queries\`, \`TechP0\`, \`Decisions\`. Executive has five tiles with sparklines (even hand-copied WoW deltas). Decisions tab logs every CEO ask and outcome — closes the loop.

## Guardrails against metric theatre

Ban vanity slides in the weekly meeting. If a metric does not change a shipping decision, archive it. Average position across 5,000 queries is almost always theatre.

## Connecting product launches to SEO KPIs

New feature launches get a money URL checklist before the blog announcement. If docs/pricing are thin, SEO KPIs will look “bad” for reasons marketing cannot fix alone — escalate to product marketing jointly.
`,

  "when-to-fire-your-seo-agency": `
## Conversation script with the agency

Bring: five-query sheet, money-URL crawl defects, pipeline trend, and two examples of ranking-only reporting. Ask for a written recovery plan in seven days with owners and dates. If they respond with more keyword promises, you have your answer.

## Legal and operational offboarding checklist

Credentials, GSC ownership verification, ad platform access if bundled, content file exports, backlink vendor contracts, outstanding invoices, non-disparagement realities. Assign an internal owner before the final call.

## Interim 60-day DIY mode

Freeze new links purchases. Fix P0 technical. Rewrite one BOFU page. Keep publishing only if it supports that page. Hire next partner against a written RFP, not a LinkedIn DM.
`,

  "in-house-seo-vs-consultant-vs-agency": `
## Interview questions that expose bait-and-switch

- Who will be on the weekly call in month four?  
- Show a sample ticket you wrote for engineering.  
- Walk me through a money URL you improved and the pipeline effect.  
- How do you handle AI Overview measurement without vanity tools?  

## Budget bands (directional, India)

Independent consultant advisory often beats mid-agency retainers on seniority per rupee. Agencies win when you need production volume with process. In-house wins when context and speed of iteration matter daily.

## Failure modes by model

In-house: isolation and outdated tactics. Consultant: recommendations without execution muscle. Agency: junior delivery after senior sales. Design the contract to block your most likely failure mode.
`,

  "seo-roadmap-for-saas-founders-india": `
## Product-led content rules for SaaS

Docs and changelogs can rank if they are crawlable and linked from marketing. Do not duplicate docs as thin blogs. Integration pages should name the partner plainly and include setup steps in HTML.

## Competitive alternatives pages without legal pain

Be factual, dated, and fair. Use sales-approved comparison tables. Link to pricing. Avoid fabricated “we always win” claims.

## Hiring and geo pages

If you hire in Pune/Bengaluru, those pages are HR SEO — useful, but not the growth roadmap core. Keep them out of the six-month demo-critical path unless brand search is the goal.
`,

  "shopify-technical-seo-checklist": `
## App audit worksheet

For each app: purpose, loads on which templates, schema injected (Y/N), last updated, kill/keep. Merchants often run three review apps and two SEO apps simultaneously — pick one of each job.

## Markets and markets domains

If you use Shopify Markets, confirm canonical/hreflang behaviour on sample SKUs per market. Wrong market canonicals create duplicate English pages that fight each other.

## Launch checklist for new product lines

Before collection goes live: unique copy, condensed images, internal links from hub guides, sitemap ping, GSC inspection on five sample products.
`,

  "wordpress-technical-seo-hardening": `
## Multisite and subdirectory traps

Shared plugins can noindex the wrong site. Always verify on the specific domain you care about. Staging search engines should be blocked; production should not inherit staging noindex.

## WooCommerce notes

Paginated category pages, product variations, and faceted filters need explicit index intent. Disable indexing of cart/checkout/account via SEO plugin + robots where appropriate.

## Migration off WordPress

If moving to Headless/Next, budget rendering QA. Empty view-source body is a silent SEO and AI citation killer.
`,

  "index-bloat-cleanup-playbook": `
## Sampling protocol

For each URL pattern, open 20 random samples. If ≥80% are thin/duplicate, the pattern rule is justified. If mixed, split the pattern before acting.

## Communication with leadership

Show indexed count vs organic sessions on money URLs. Executives fear pruning; show that noise URLs contribute near-zero sessions.

## Re-bloat prevention

Add CI or publish checklist: new templates default to sensible index rules; UTM parameters never become indexable; tag creation restricted.
`,

  "internal-linking-architecture-seo": `
## Navigation vs contextual links

Primary nav should stay small. Contextual links carry topical signals. Related-posts modules help only if they are relevant — random popular posts modules dilute.

## Link equity during redesigns

When IA changes, ship a redirect + internal link update together. Updating nav without fixing in-body links leaves soft 404 paths in old articles.

## Measuring link work

Track: orphan count, average clicks-to-money-URL from hubs, and ranking movement on spokes you recently linked. Anecdotes are not enough after 30 days.
`,

  "google-maps-ranking-factors-india-2026": `
## Review acquisition that stays safe

Ask after successful jobs, provide easy links, never gate or incentivise dishonestly. Respond to negatives with facts and an offline path. Photo reviews with geo context help prominence.

## Multi-location brands

Each location needs accurate pages and GBP entities. Shared phone numbers across cities create routing pain — prefer local numbers or clear IVR without NAP lies.

## Pack vs local finder vs Maps app

Results differ by surface. Screenshot the surface your customers use (often mobile Maps). Optimising only desktop local finder misleads.
`,

  "nap-consistency-india-directories": `
## Formatting standards sheet

Decide once: “Pvt Ltd” vs “Private Limited”, floor/building order, landmark usage, hyphenation in phone numbers. Train every vendor on that sheet.

## When acquisitions change NAP

Inherit listings carefully. Close or claim duplicates. Do not leave the acquired brand’s old phone live if support is gone.

## Tools

Spreadsheets beat most “citation tools” for small counts. Tools help discovery; humans fix mismatches.
`,

  "whatsapp-leads-from-google-maps-india": `
## Message templates that convert

Pre-filled text should state service + city + intent: “Hi, I need local SEO for our Pune clinic — saw you on Maps.” Train staff to ask qualifying questions in the first reply.

## After-hours protocol

Auto-reply with next response window and emergency call path if relevant. Unanswered WhatsApp is worse than no button.

## Fraud and spam controls

Rate-limit public forms; do not publish personal numbers for staff; keep Business API or official WhatsApp Business practices as you scale.
`,

  "citation-building-without-spam-india": `
## Disavow is not a citations strategy

Cleaning toxic blast-package links may need attention, but building more spam to “compete” makes it worse. Focus on GBP + relevant industry presence.

## Partner and sponsorship citations

Sponsor local events only if the brand mention is accurate and on a real page. Exact-match anchor spam in footers of unrelated sites is not the goal.

## Annual cleanup day

Once a year, review the citation Sheet, fix drift, remove dead listings, and confirm GBP still matches the site.
`,
};

let n = 0;
for (const [slug, block] of Object.entries(DEPTH)) {
  const file = path.join(blogDir, `${slug}.md`);
  let raw = fs.readFileSync(file, "utf8");
  if (raw.includes("<!-- fk-priority-depth -->")) {
    console.log(`skip ${slug}`);
    continue;
  }
  const insert = `\n<!-- fk-priority-depth -->\n${block.trim()}\n`;
  if (raw.includes("<!-- fk-cluster-links -->")) {
    raw = raw.replace("<!-- fk-cluster-links -->", `${insert}\n<!-- fk-cluster-links -->`);
  } else {
    raw = raw.trimEnd() + "\n" + insert + "\n";
  }
  fs.writeFileSync(file, raw, "utf8");
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  const wc = body.split(/\s+/).filter(Boolean).length;
  console.log(`${slug}: ~${wc} words`);
  n++;
}
console.log(`[expand-priority-16-depth] Expanded ${n}`);
