<?php
$metaTitle = "SEO Consulting Services India | Professional SEO Consulting - Rahul Agarwal";
$metaDesc = "SEO consulting services for Indian startups and enterprises: audits, technical SEO, content strategy, local SEO, ecommerce and monthly advisory. Independent consultant — not a diluted agency.";
$metaKeywords = "seo consulting services, seo consulting services india, seo consulting company, seo consulting firm, professional seo consulting services, seo strategy consulting";
$canonicalUrl = "https://fundaking.com/seo-consulting-services";
$ogTitle = $metaTitle;
$ogDesc = $metaDesc;
$nicheName = 'SEO Consulting Services';
$activePage = 'consulting-services';
$heroEyebrow = 'SEO Consulting Services';
$heroTitle = 'SEO Consulting Services Built for Revenue, Not Reports';
$heroSub = 'Professional SEO consulting for India-based teams who want a senior strategist — not a 40-client agency factory. Audits, roadmaps, technical delivery governance, and monthly advisory.';
$services = [
    ['title' => 'SEO Strategy & Roadmaps', 'text' => '90-day and 12-month plans tied to pipeline, LTV and CAC — keyword clusters with business intent.'],
    ['title' => 'Technical SEO Consulting', 'text' => 'Crawl, indexation, CWV, JS rendering, schema. Deep fixes agencies skip.'],
    ['title' => 'Content & Topical Authority', 'text' => 'Pillar systems, briefs, and CRO-aware landing pages that convert.'],
    ['title' => 'Local SEO Consulting', 'text' => 'Maps, Local Pack, citations and review systems for multi-location India brands.'],
    ['title' => 'Ecommerce & Marketplace', 'text' => 'Shopify/D2C architecture plus Amazon SEO where relevant.'],
    ['title' => 'Monthly SEO Advisory', 'text' => 'CEO-level governance for your internal team or white-label agency partners.'],
];
$relatedLinks = [
    '/technical-seo-consultant' => 'Technical SEO',
    '/local-seo-consultant' => 'Local SEO',
    '/ecommerce-seo-consultant' => 'Ecommerce SEO',
    '/seo-audit-consultant' => 'SEO Audit',
    '/seo-consultant-india' => 'SEO Consultant India',
];
$nicheBodyHtml = <<<'HTML'
        <h2>Independent consulting — not a fake “SEO consulting company”</h2>
        <p class="muted">Searchers often type “SEO consulting firm” or “SEO consulting company” when they want senior help.
            I’m an independent consultant (Fundaking Media) with a capped client load. If you need a large production bench,
            I’ll help you structure an agency hybrid — see
            <a href="/seo-consultant-vs-agency" style="color:var(--accent-2)">consultant vs agency</a>.</p>
        <h2>Engagement models</h2>
        <ul class="muted article-list">
            <li>Project audits & roadmaps</li>
            <li>Fractional SEO leadership (monthly)</li>
            <li>White-label technical support for agencies</li>
        </ul>
HTML;
$faqs = [
    ['q' => 'What is included in SEO consulting services?', 'a' => 'Diagnosis, prioritized roadmap, technical recommendations, content direction, and optional ongoing advisory. Execution can be your team, your agency, or specialists I coordinate.'],
    ['q' => 'Do you offer SEO consulting services across India?', 'a' => 'Yes — remote-first from Pune with city coverage via the India hub and location pages.'],
    ['q' => 'Is this affordable SEO consulting?', 'a' => 'Pricing reflects senior hours. Cheap retainers usually mean junior execution — I scope clearly after a free discovery call.']
];
include 'includes/niche-page.php';
