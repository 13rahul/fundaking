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

function fundaking_schema_founder()
{
    return [
        '@type' => 'Person',
        '@id' => fundaking_schema_origin() . '/#founder',
        'name' => 'Rahul Agarwal',
        'jobTitle' => 'Founder, Fundaking Media',
        'url' => fundaking_schema_origin() . '/about',
        'image' => fundaking_schema_origin() . '/images/og-image.png',
        'worksFor' => ['@id' => fundaking_schema_origin() . '/#organization'],
    ];
}

function fundaking_schema_organization()
{
    $origin = fundaking_schema_origin();
    return [
        '@type' => 'Organization',
        '@id' => $origin . '/#organization',
        'name' => 'Fundaking Media OPC Pvt Ltd',
        'alternateName' => 'Fundaking Media',
        'url' => $origin,
        'logo' => $origin . '/images/logo.svg',
        'email' => 'consult@fundaking.com',
        'telephone' => '+91 84210 53710',
        'founder' => ['@id' => $origin . '/#founder'],
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => 'Baramati',
            'addressRegion' => 'Maharashtra',
            'addressCountry' => 'IN',
        ],
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
