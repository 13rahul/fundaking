<?php
/**
 * Shared JSON-LD for PHP theme pages (matches Astro schema.ts / fundaking.com).
 */

function fundaking_schema_origin()
{
    if (function_exists('fk_url')) {
        $home = fk_url('/');
        if (strpos($home, 'fundaking.com') !== false) {
            return rtrim($home, '/');
        }
    }
    return 'https://fundaking.com';
}

function fundaking_schema_reviews()
{
    $origin = fundaking_schema_origin();
    $orgId = $origin . '/#organization';
    $rows = [
        [
            'name' => 'Nazeeya Hullur',
            'date' => '2026-10-26',
            'url' => 'https://www.google.com/maps/contrib/104885566326503659305/reviews?hl=en-GB',
            'body' => 'We got good SEO consultancy services from Rahul Agarwal',
        ],
        [
            'name' => 'Aadhya Aadhya',
            'date' => '2026-01-26',
            'url' => 'https://www.google.com/maps/contrib/116062319221733651272/reviews?hl=en-GB',
            'body' => 'We partnered with Mr Rahul Agarwal to improve our organic traffic and technical SEO. Within 3 months our organic search traffic grew by 80%, and we saw a direct 100% increase in qualified leads.',
        ],
        [
            'name' => 'Shivani',
            'date' => '2026-01-26',
            'url' => 'https://www.google.com/maps/contrib/112686839398182202375/reviews?hl=en-GB',
            'body' => 'When we worked with Rahul we understand we got good SEO Consultant in Pune',
        ],
        [
            'name' => 'shubhra saraswat',
            'date' => '2026-01-26',
            'url' => 'https://www.google.com/maps/contrib/114338103977307766039/reviews?hl=en-GB',
            'body' => 'Good SEO consultancy service. Professional and helpful.',
        ],
        [
            'name' => 'Suraj Pandey',
            'date' => '2026-01-26',
            'url' => 'https://www.google.com/maps/contrib/101578909917098502987/reviews?hl=en-GB',
            'body' => 'Very helpful regarding SEO, Marketing and Rankings',
        ],
        [
            'name' => 'Work',
            'date' => '2026-01-26',
            'url' => 'https://www.google.com/maps/contrib/112513390823915461418/reviews?hl=en-GB',
            'body' => 'I got seo consultant service from Rahul Agarwal. He is best guy for growing traffic',
        ],
        [
            'name' => 'Manish Kumar',
            'date' => '2026-01-26',
            'url' => 'https://www.google.com/maps/contrib/117583565324346828962/reviews?hl=en-GB',
            'body' => '5-star Google review for Fundaking Media — Rahul Agarwal (SEO consultant).',
        ],
    ];

    $reviews = [];
    foreach ($rows as $r) {
        $reviews[] = [
            '@type' => 'Review',
            'author' => ['@type' => 'Person', 'name' => $r['name']],
            'datePublished' => $r['date'],
            'reviewBody' => $r['body'],
            'reviewRating' => [
                '@type' => 'Rating',
                'ratingValue' => '5',
                'bestRating' => '5',
                'worstRating' => '1',
            ],
            'url' => $r['url'],
            'itemReviewed' => ['@id' => $orgId],
        ];
    }
    return $reviews;
}

function fundaking_schema_founder()
{
    $origin = fundaking_schema_origin();
    return [
        '@type' => 'Person',
        '@id' => $origin . '/#founder',
        'name' => 'Rahul Agarwal',
        'alternateName' => 'Rahul Vijay Agarwal',
        'jobTitle' => 'Founder & SEO Consultant, Fundaking Media',
        'url' => $origin . '/about',
        'image' => $origin . '/images/author/rahul-agarwal.png',
        'sameAs' => [
            'https://www.linkedin.com/in/rahul-agarwal-510a5b79/',
            $origin . '/about',
        ],
        'worksFor' => ['@id' => $origin . '/#organization'],
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => 'Baramati',
            'addressRegion' => 'Maharashtra',
            'postalCode' => '413110',
            'addressCountry' => 'IN',
        ],
        'knowsAbout' => [
            'Technical SEO',
            'Local SEO',
            'SEO consulting',
            'Content architecture',
            'AI search visibility',
        ],
    ];
}

function fundaking_schema_organization()
{
    $origin = fundaking_schema_origin();
    $mapsPlace = 'https://www.google.com/maps/place/Fundaking+Media+-+Rahul+Agarwal/@21.0680074,82.7525294,5z/data=!3m1!4b1!4m6!3m5!1s0x3bc3a78b97137889:0x2464feeefb15a44d!8m2!3d21.0680074!4d82.7525294!16s%2Fg%2F11p4l9ptl4';
    $reviews = fundaking_schema_reviews();
    return [
        '@type' => ['Organization', 'ProfessionalService', 'LocalBusiness'],
        '@id' => $origin . '/#organization',
        'name' => 'Fundaking Media OPC Pvt Ltd',
        'alternateName' => 'Fundaking Media',
        'url' => $origin,
        'logo' => $origin . '/images/logo.png',
        'image' => $origin . '/images/logo.png',
        'email' => 'consult@fundaking.com',
        'telephone' => '+918421053710',
        'priceRange' => '₹₹',
        'founder' => ['@id' => $origin . '/#founder'],
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => 'H S No. 155, Near Bhairavnath Temple, Pandare',
            'addressLocality' => 'Baramati',
            'addressRegion' => 'Maharashtra',
            'postalCode' => '413110',
            'addressCountry' => 'IN',
        ],
        'geo' => [
            '@type' => 'GeoCoordinates',
            'latitude' => '18.1517',
            'longitude' => '74.5777',
        ],
        'areaServed' => [
            ['@type' => 'City', 'name' => 'Pune'],
            ['@type' => 'City', 'name' => 'Baramati'],
            ['@type' => 'City', 'name' => 'Mumbai'],
            ['@type' => 'City', 'name' => 'Bengaluru'],
            ['@type' => 'Country', 'name' => 'India'],
        ],
        'sameAs' => [
            'https://www.linkedin.com/in/rahul-agarwal-510a5b79/',
            $origin . '/about',
            $mapsPlace,
            'https://g.page/r/CU2kFfvu_mQkEAE/review',
        ],
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'telephone' => '+918421053710',
            'contactType' => 'sales',
            'areaServed' => 'IN',
            'availableLanguage' => ['English', 'Hindi', 'Marathi'],
        ],
        'hasMap' => 'https://www.google.com/maps?cid=2623935863145284685',
        'aggregateRating' => [
            '@type' => 'AggregateRating',
            'ratingValue' => '5.0',
            'reviewCount' => (string) count($reviews),
            'bestRating' => '5',
            'worstRating' => '1',
        ],
        'review' => $reviews,
    ];
}

function fundaking_schema_website()
{
    $origin = fundaking_schema_origin();
    return [
        '@type' => 'WebSite',
        '@id' => $origin . '/#website',
        'url' => $origin,
        'name' => 'Fundaking Media',
        'publisher' => ['@id' => $origin . '/#organization'],
    ];
}

function fundaking_schema_webpage($name, $description, $url)
{
    $origin = fundaking_schema_origin();
    return [
        '@type' => 'WebPage',
        '@id' => $url . '#webpage',
        'url' => $url,
        'name' => $name,
        'description' => $description,
        'isPartOf' => ['@id' => $origin . '/#website'],
        'about' => ['@id' => $origin . '/#organization'],
    ];
}

function fundaking_schema_graph($webPageName, $webPageDesc, $canonicalUrl, $extra = [])
{
    $graph = [
        fundaking_schema_organization(),
        fundaking_schema_founder(),
        fundaking_schema_website(),
        fundaking_schema_webpage($webPageName, $webPageDesc, $canonicalUrl),
    ];
    foreach ($extra as $node) {
        $graph[] = $node;
    }
    return ['@context' => 'https://schema.org', '@graph' => $graph];
}

function fundaking_schema_print($data)
{
    echo '<script type="application/ld+json">';
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    echo '</script>' . "\n";
}

/** Compact expert / proof strip for niche and city PHP pages. */
function fundaking_eeat_strip_html()
{
    $about = function_exists('fk_url') ? fk_url('/about/') : 'https://fundaking.com/about/';
    $cases = function_exists('fk_url') ? fk_url('/case-study/') : 'https://fundaking.com/case-study/';
    $photo = function_exists('fk_url')
        ? fk_url('/images/author/rahul-agarwal.png')
        : 'https://fundaking.com/images/author/rahul-agarwal.png';
    $wa = 'https://wa.me/918421053710?text=Hi%20Rahul%2C%20I%20want%20to%20book%20a%20free%20SEO%20audit';

    return '<section class="section container" aria-label="Who you work with">'
        . '<div class="card" style="display:flex;flex-wrap:wrap;gap:24px;align-items:center">'
        . '<img src="' . htmlspecialchars($photo, ENT_QUOTES, 'UTF-8') . '" alt="Rahul Agarwal" width="96" height="96" style="border-radius:16px;object-fit:cover;width:96px;height:96px" loading="lazy" decoding="async">'
        . '<div style="flex:1;min-width:220px">'
        . '<h2 style="margin:0 0 8px;font-size:1.35rem">Who you work with</h2>'
        . '<p class="muted" style="margin:0 0 12px">Rahul Agarwal — founder &amp; SEO consultant, Fundaking Media. 8+ years · Google 5.0 from 7 reviews · direct access, no junior account layer.</p>'
        . '<p style="margin:0;display:flex;flex-wrap:wrap;gap:12px">'
        . '<a href="' . htmlspecialchars($about, ENT_QUOTES, 'UTF-8') . '">About Rahul</a>'
        . '<a href="' . htmlspecialchars($cases, ENT_QUOTES, 'UTF-8') . '">Case studies</a>'
        . '<a href="' . htmlspecialchars($wa, ENT_QUOTES, 'UTF-8') . '" target="_blank" rel="noopener noreferrer">WhatsApp audit</a>'
        . '</p></div></div></section>';
}
