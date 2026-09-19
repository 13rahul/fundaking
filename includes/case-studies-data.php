<?php
/**
 * Shared case-study catalogue used by the listing, detail pages, cards, and related rows.
 */

function fundaking_cs_tags()
{
    return [
        'seo' => 'SEO',
        'web-development' => 'Web Development',
        'content-development' => 'Content Development',
        'crm' => 'CRM',
    ];
}

function fundaking_cs_studies()
{
    return [
        'fintech-organic-growth' => [
            'slug' => 'fintech-organic-growth',
            'client' => 'Fintech firm',
            'sector' => 'Finance',
            'title' => 'Scaling organic visibility for a fintech firm',
            'h1' => 'Scaling organic visibility for a fintech firm',
            'metaTitle' => 'Fintech SEO Case Study: +57% Organic Clicks | Fundaking',
            'metaDesc' => 'How a 6-month technical SEO and content-silo programme cut index bloat and grew organic clicks 57% for a finance brand. Case study by Rahul Agarwal.',
            'metaKeywords' => 'fintech seo case study, finance seo results, technical seo case study india',
            'summary' => 'Index bloat and weak keyword targeting were capping growth. We pruned thousands of low-value URLs and rebuilt topic clusters around investor intent.',
            'outcome' => '+57% organic clicks in 6 months',
            'resultLine' => 'A 6-month technical prune and content-silo rebuild lifted clicks 57% and impressions 29% without buying more ads.',
            'tags' => ['seo'],
            'duration' => '6 month campaign',
            'liveUrl' => null,
            'liveLabel' => null,
            'kpis' => [
                ['value' => '+57%', 'label' => 'Total clicks'],
                ['value' => '+29%', 'label' => 'Impressions'],
                ['value' => '+21%', 'label' => 'CTR'],
                ['value' => '+18%', 'label' => 'Avg. position'],
            ],
            'scope' => ['Technical SEO', 'Content strategy', 'Schema', 'GSC measurement'],
            'media' => [
                'type' => 'image',
                'src' => '/assets/images/finance-case-study.jpg',
                'alt' => 'Search Console graph showing click growth after the fintech SEO programme',
                'caption' => 'Verified GSC data after the prune and silo work.',
            ],
            'mock' => [
                'theme' => 'finance',
                'mark' => 'FT',
                'name' => 'Fintech SEO',
            ],
            'flipSplit' => false,
        ],
        'saas-demo-requests' => [
            'slug' => 'saas-demo-requests',
            'client' => 'B2B CRM startup',
            'sector' => 'B2B SaaS',
            'title' => 'Doubling demo requests for a CRM startup',
            'h1' => 'Doubling demo requests for a CRM startup',
            'metaTitle' => 'SaaS SEO Case Study: +115% Demo Requests | Fundaking',
            'metaDesc' => 'Pain-point content and comparison pages grew demo requests 115% in 4 months for a B2B CRM startup. Organic SEO case study by Rahul Agarwal.',
            'metaKeywords' => 'saas seo case study, b2b seo results, crm seo consultant',
            'summary' => 'Strong product, almost no organic pipeline. We targeted long-tail pain queries and built comparison pages that convert evaluators, not browsers.',
            'outcome' => '+115% demo requests in 4 months',
            'resultLine' => 'Bottom-of-funnel pages and tighter on-page CTR work more than doubled demo requests in four months.',
            'tags' => ['seo', 'content-development'],
            'duration' => '4 month campaign',
            'liveUrl' => null,
            'liveLabel' => null,
            'kpis' => [
                ['value' => '+115%', 'label' => 'Demo requests'],
                ['value' => '+3.5x', 'label' => 'Traffic value'],
                ['value' => 'Top 3', 'label' => 'Remote CRM queries'],
                ['value' => '82', 'label' => 'Backlinks earned'],
            ],
            'scope' => ['Content strategy', 'On-page SEO', 'Internal linking', 'Digital PR'],
            'media' => [
                'type' => 'mock',
                'src' => '',
                'alt' => '',
                'caption' => 'Pipeline impact from organic demo demand.',
            ],
            'mock' => [
                'theme' => 'saas',
                'mark' => '+115%',
                'name' => 'Demo requests',
            ],
            'flipSplit' => true,
        ],
        'shubhshrey-industries' => [
            'slug' => 'shubhshrey-industries',
            'client' => 'Shubhshrey Industries',
            'sector' => 'Manufacturing',
            'title' => 'Website and CRM for Shubhshrey Industries',
            'h1' => 'A manufacturing site with a CRM behind it',
            'metaTitle' => 'Shubhshrey Industries Web & CRM Case Study | Fundaking',
            'metaDesc' => 'We designed and built shubhshrey.com plus a custom CRM so a Baramati manufacturer could present products publicly and run enquiries, follow-ups, and orders internally.',
            'metaKeywords' => 'manufacturing website case study, custom crm development, industrial web design india',
            'summary' => 'Public product site for a welding manufacturer, wired to an internal CRM so sales is not trapped in WhatsApp threads and spreadsheets.',
            'outcome' => 'Public site + custom CRM in one build',
            'resultLine' => 'One engagement delivered the public brand site and the internal CRM that captures and works every enquiry.',
            'tags' => ['web-development', 'crm'],
            'duration' => 'Website + CRM build',
            'liveUrl' => 'https://www.shubhshrey.com/',
            'liveLabel' => 'Visit shubhshrey.com',
            'kpis' => [
                ['value' => 'Site + CRM', 'label' => 'What shipped'],
                ['value' => 'Leads in', 'label' => 'Enquiry capture'],
                ['value' => 'Internal', 'label' => 'Follow-up workspace'],
            ],
            'scope' => ['UI/UX', 'Frontend', 'Backend', 'CRM', 'Lead capture'],
            'media' => [
                'type' => 'mock',
                'src' => '',
                'alt' => '',
                'caption' => 'Industrial brand site paired with an internal sales CRM.',
            ],
            'mock' => [
                'theme' => 'shubhshrey',
                'mark' => 'SI',
                'name' => 'Shubhshrey',
            ],
            'flipSplit' => false,
        ],
        'real-group' => [
            'slug' => 'real-group',
            'client' => 'Real Group',
            'sector' => 'Corporate',
            'title' => 'Corporate website for Real Group',
            'h1' => 'A corporate site that explains the group, not the org chart',
            'metaTitle' => 'Real Group Website Case Study | Web Design | Fundaking',
            'metaDesc' => 'Information architecture, visual design, and development of a corporate website for Real Group — so visitors can find the business, the story, and a way to get in touch.',
            'metaKeywords' => 'corporate website case study, company website design, web development india',
            'summary' => 'A group site planned around how outsiders actually look for a company: who you are, what you do, how to reach you — without a maze of PDFs.',
            'outcome' => 'Corporate web presence, designed and built',
            'resultLine' => 'We designed and developed the public website so the group reads as one brand, with clear paths to the businesses and to contact.',
            'tags' => ['web-development'],
            'duration' => 'Website design & build',
            'liveUrl' => null,
            'liveLabel' => null,
            'kpis' => [
                ['value' => 'IA first', 'label' => 'Structure before visuals'],
                ['value' => 'Brand', 'label' => 'One group story'],
                ['value' => 'Contact', 'label' => 'Enquiry path'],
            ],
            'scope' => ['Information architecture', 'UI/UX', 'Frontend', 'Backend'],
            'media' => [
                'type' => 'mock',
                'src' => '',
                'alt' => '',
                'caption' => 'Corporate site framed around group story and contact.',
            ],
            'mock' => [
                'theme' => 'realgroup',
                'mark' => 'RG',
                'name' => 'Real Group',
            ],
            'flipSplit' => true,
        ],
        'collegeastra' => [
            'slug' => 'collegeastra',
            'client' => 'CollegeAstra',
            'sector' => 'Edtech',
            'title' => 'CollegeAstra college discovery platform',
            'h1' => 'A college directory students can actually filter',
            'metaTitle' => 'CollegeAstra Web & Content Case Study | Fundaking',
            'metaDesc' => 'We designed and built CollegeAstra.com — a college discovery platform with location pages, structured college content, and filters for specialisation, type, exam, and fees.',
            'metaKeywords' => 'edtech website case study, college directory web development, content system design',
            'summary' => 'Students comparing colleges needed filters and structured pages, not a brochure. We built the platform IA, UI, and the content model behind the catalogue.',
            'outcome' => 'Discovery platform + college content system',
            'resultLine' => 'CollegeAstra.com ships as a location-aware directory: structured college content, not a static list, with filters that match how students shortlist.',
            'tags' => ['web-development', 'content-development'],
            'duration' => 'Platform design & build',
            'liveUrl' => 'https://collegeastra.com/',
            'liveLabel' => 'Visit collegeastra.com',
            'kpis' => [
                ['value' => 'Directory', 'label' => 'College catalogue'],
                ['value' => 'Filters', 'label' => 'Spec, type, exam, fees'],
                ['value' => 'Locations', 'label' => 'City landing pages'],
            ],
            'scope' => ['UX', 'Frontend', 'Backend', 'Content model', 'Location pages'],
            'media' => [
                'type' => 'mock',
                'src' => '',
                'alt' => '',
                'caption' => 'College discovery UI organised by place and filters.',
            ],
            'mock' => [
                'theme' => 'collegeastra',
                'mark' => 'CA',
                'name' => 'CollegeAstra',
            ],
            'flipSplit' => false,
        ],
        'ultralooper' => [
            'slug' => 'ultralooper',
            'client' => 'UltraLooper',
            'sector' => 'AI product',
            'title' => 'UltraLooper product website and content system',
            'h1' => 'A product site for an AI agent workplace',
            'metaTitle' => 'UltraLooper Web & Content Case Study | Fundaking',
            'metaDesc' => 'We designed and developed ultralooper.com — the marketing and product web layer for an AI agent platform, including IA, UI, and content surfaces for agents, workplace apps, and pricing.',
            'metaKeywords' => 'saas website case study, ai product web design, product content development',
            'summary' => 'A dense AI product needed a site that explains agents, workplace apps, and credits without sounding like a pitch deck. We designed the IA, UI, and content architecture.',
            'outcome' => 'Product marketing site + content architecture',
            'resultLine' => 'ultralooper.com presents the agent fleet, Ultra Workplace apps, and credit pricing as one product story instead of a pile of feature pages.',
            'tags' => ['web-development', 'content-development'],
            'duration' => 'Product site design & build',
            'liveUrl' => 'https://ultralooper.com/',
            'liveLabel' => 'Visit ultralooper.com',
            'kpis' => [
                ['value' => 'IA', 'label' => 'Agents, apps, pricing'],
                ['value' => 'Product UI', 'label' => 'Marketing + web layer'],
                ['value' => 'Content', 'label' => 'Pages that explain the fleet'],
            ],
            'scope' => ['Product IA', 'UI/UX', 'Frontend', 'Content development'],
            'media' => [
                'type' => 'mock',
                'src' => '',
                'alt' => '',
                'caption' => 'Product marketing layer for the UltraLooper agent platform.',
            ],
            'mock' => [
                'theme' => 'ultralooper',
                'mark' => 'UL',
                'name' => 'UltraLooper',
            ],
            'flipSplit' => true,
        ],
    ];
}

function fundaking_cs_get($slug)
{
    $all = fundaking_cs_studies();
    return $all[$slug] ?? null;
}

function fundaking_cs_related($slug, $limit = 3)
{
    $current = fundaking_cs_get($slug);
    if (!$current) {
        return [];
    }
    $scored = [];
    foreach (fundaking_cs_studies() as $study) {
        if ($study['slug'] === $slug) {
            continue;
        }
        $overlap = count(array_intersect($current['tags'], $study['tags']));
        $scored[] = ['overlap' => $overlap, 'study' => $study];
    }
    usort($scored, function ($a, $b) {
        return $b['overlap'] <=> $a['overlap'];
    });
    $picked = array_slice($scored, 0, $limit);
    return array_column($picked, 'study');
}

function fundaking_cs_tag_labels($tagSlugs)
{
    $map = fundaking_cs_tags();
    $out = [];
    foreach ($tagSlugs as $slug) {
        if (isset($map[$slug])) {
            $out[$slug] = $map[$slug];
        }
    }
    return $out;
}

function fundaking_cs_render_media($study, $caption = false)
{
    $theme = htmlspecialchars($study['mock']['theme'] ?? 'default', ENT_QUOTES, 'UTF-8');
    $mark = htmlspecialchars($study['mock']['mark'] ?? '', ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($study['mock']['name'] ?? $study['client'], ENT_QUOTES, 'UTF-8');
    $html = '';
    if (($study['media']['type'] ?? '') === 'image' && !empty($study['media']['src'])) {
        $src = htmlspecialchars($study['media']['src'], ENT_QUOTES, 'UTF-8');
        $alt = htmlspecialchars($study['media']['alt'] ?? $study['title'], ENT_QUOTES, 'UTF-8');
        $html .= '<div class="cs-card__media cs-media--' . $theme . '">';
        $html .= '<img src="' . $src . '" alt="' . $alt . '" width="960" height="600" loading="lazy">';
        $html .= '</div>';
    } else {
        $html .= '<div class="cs-card__media cs-media--' . $theme . '" aria-hidden="true">';
        $html .= '<div class="cs-mock"><span class="cs-mock__mark">' . $mark . '</span><span class="cs-mock__name">' . $name . '</span></div>';
        $html .= '</div>';
    }
    if ($caption && !empty($study['media']['caption'])) {
        $html .= '<p class="cs-media-caption">' . htmlspecialchars($study['media']['caption'], ENT_QUOTES, 'UTF-8') . '</p>';
    }
    return $html;
}

function fundaking_cs_render_card($study)
{
    $href = '/case-study/' . rawurlencode($study['slug']);
    if (function_exists('fk_url')) {
        $href = fk_url($href);
    }
    $tags = fundaking_cs_tag_labels($study['tags']);
    $tagAttr = htmlspecialchars(implode(' ', $study['tags']), ENT_QUOTES, 'UTF-8');
    $html = '<a class="cs-card" data-cs-card data-tags="' . $tagAttr . '" href="' . htmlspecialchars($href, ENT_QUOTES, 'UTF-8') . '">';
    $html .= fundaking_cs_render_media($study);
    $html .= '<span class="cs-card__body">';
    $html .= '<span class="cs-card__pills">';
    foreach ($tags as $slug => $label) {
        $html .= '<span class="cs-pill">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</span>';
    }
    $html .= '</span>';
    $html .= '<span class="cs-card__client">' . htmlspecialchars($study['client'], ENT_QUOTES, 'UTF-8') . '</span>';
    $html .= '<span class="cs-card__title">' . htmlspecialchars($study['title'], ENT_QUOTES, 'UTF-8') . '</span>';
    $kpis = array_slice($study['kpis'] ?? [], 0, 2);
    if ($kpis) {
        $html .= '<span class="cs-card__metrics">';
        foreach ($kpis as $kpi) {
            $html .= '<span class="cs-card__metric"><b>' . htmlspecialchars($kpi['value'], ENT_QUOTES, 'UTF-8') . '</b><span>' . htmlspecialchars($kpi['label'], ENT_QUOTES, 'UTF-8') . '</span></span>';
        }
        $html .= '</span>';
    } else {
        $html .= '<span class="cs-card__desc">' . htmlspecialchars($study['outcome'], ENT_QUOTES, 'UTF-8') . '</span>';
    }
    $html .= '<span class="cs-card__link">Read case study <span aria-hidden="true">→</span></span>';
    $html .= '</span></a>';
    return $html;
}

function fundaking_cs_render_row($study)
{
    $href = '/case-study/' . rawurlencode($study['slug']);
    if (function_exists('fk_url')) {
        $href = fk_url($href);
    }
    $tags = fundaking_cs_tag_labels($study['tags']);
    $kpi = $study['kpis'][0] ?? null;
    $tagAttr = htmlspecialchars(implode(' ', $study['tags']), ENT_QUOTES, 'UTF-8');
    $html = '<article class="brief-row" data-cs-card data-tags="' . $tagAttr . '">';
    $html .= '<a class="brief-row__link" href="' . htmlspecialchars($href, ENT_QUOTES, 'UTF-8') . '">';
    $html .= fundaking_cs_render_media($study);
    $html .= '<span class="brief-row__copy">';
    $html .= '<span class="brief-row__meta">' . htmlspecialchars($study['client'], ENT_QUOTES, 'UTF-8') . ' · ' . htmlspecialchars($study['sector'], ENT_QUOTES, 'UTF-8');
    foreach ($tags as $label) {
        $html .= ' · ' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
    }
    $html .= '</span>';
    $html .= '<span class="brief-row__title">' . htmlspecialchars($study['title'], ENT_QUOTES, 'UTF-8') . '</span>';
    $html .= '<span class="brief-row__desc">' . htmlspecialchars($study['resultLine'] ?? $study['outcome'], ENT_QUOTES, 'UTF-8') . '</span>';
    if ($kpi) {
        $html .= '<span class="brief-row__kpi"><b>' . htmlspecialchars($kpi['value'], ENT_QUOTES, 'UTF-8') . '</b> ' . htmlspecialchars($kpi['label'], ENT_QUOTES, 'UTF-8') . '</span>';
    }
    $html .= '<span class="brief-row__go">Read case study</span>';
    $html .= '</span></a></article>';
    return $html;
}
