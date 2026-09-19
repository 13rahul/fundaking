<?php
require_once __DIR__ . '/../includes/site-base.php';
require_once __DIR__ . '/../includes/case-studies-data.php';

$studies = fundaking_cs_studies();
$tagMap = fundaking_cs_tags();

$metaTitle = 'Case Studies in SEO, Web & Content | Fundaking Media';
$metaDesc = 'Tagged case studies from Fundaking Media: SEO programmes with published results, plus web development, content systems, and CRM builds including Shubhshrey, CollegeAstra, and UltraLooper.';
$metaKeywords = 'seo case studies, web development case studies, content development case study, crm website india, fundaking media work';
$canonicalUrl = 'https://fundaking.com/case-studies';
$activePage = 'case-studies';
$navCtaText = 'Get Similar Results';

$itemList = [];
$i = 1;
foreach ($studies as $study) {
    $itemList[] = [
        '@type' => 'ListItem',
        'position' => $i++,
        'url' => 'https://fundaking.com/case-studies/' . $study['slug'],
        'name' => $study['title'],
    ];
}

$listingSchema = [
    '@context' => 'https://schema.org',
    '@type' => 'CollectionPage',
    'name' => 'Fundaking Media Case Studies',
    'description' => $metaDesc,
    'url' => $canonicalUrl,
    'isPartOf' => ['@type' => 'WebSite', 'name' => 'Fundaking Media', 'url' => 'https://fundaking.com/'],
    'mainEntity' => [
        '@type' => 'ItemList',
        'itemListElement' => $itemList,
    ],
];

$breadcrumbSchema = [
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => 'https://fundaking.com/'],
        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Case Studies', 'item' => $canonicalUrl],
    ],
];

$bodyClass = 'theme-php-page';
include __DIR__ . '/../includes/theme-header.php';
?>
<script type="application/ld+json"><?php echo json_encode($listingSchema, JSON_UNESCAPED_SLASHES); ?></script>
<script type="application/ld+json"><?php echo json_encode($breadcrumbSchema, JSON_UNESCAPED_SLASHES); ?></script>

<div class="theme-php-content">
    <?php
    $pageHeroEyebrow = 'Case studies · Fundaking Media';
    $pageHeroTitle = 'Work in the open';
    $pageHeroSub = '<p class="muted">Filter by discipline. SEO stories use published Search Console numbers. Web and content builds describe what shipped.</p>';
    $pageHeroFootHtml = '<p class="page-hero-showcase__areas">+57% clicks · +115% demo requests · named web builds</p>';
    $pageHeroPanelTitle = 'Published outcomes';
    $pageHeroPanelHtml = '<div class="kpi"><div class="kpi-item"><div class="k">+57%</div><div class="small">Organic clicks</div></div>'
        . '<div class="kpi-item"><div class="k">+115%</div><div class="small">Demo requests</div></div></div>'
        . '<p class="small" style="margin-top:12px"><a href="' . fk_url('/case-studies/fintech-organic-growth') . '">Browse SEO case studies →</a></p>';
    $pageHeroPrimaryLabel = 'Book a call';
    include __DIR__ . '/../includes/page-hero-showcase.php';
    ?>

    <section class="page-section page-section--alt container cs-listing-section" aria-labelledby="cs-filter-heading">
        <h2 id="cs-filter-heading" class="cs-filter-heading">Browse by type</h2>
        <div class="cs-filters" data-cs-filters role="group" aria-label="Filter case studies by type">
            <button type="button" class="cs-filter is-active" data-tag="all" aria-pressed="true">All</button>
            <?php foreach ($tagMap as $slug => $label): ?>
            <button type="button" class="cs-filter" data-tag="<?php echo htmlspecialchars($slug, ENT_QUOTES, 'UTF-8'); ?>" aria-pressed="false"><?php echo htmlspecialchars($label, ENT_QUOTES, 'UTF-8'); ?></button>
            <?php endforeach; ?>
        </div>

        <div class="brief-stack" data-cs-grid>
            <?php foreach ($studies as $study): ?>
            <?php echo fundaking_cs_render_row($study); ?>
            <?php endforeach; ?>
        </div>
        <p class="cs-empty" data-cs-empty hidden>No case studies in this category yet.</p>
    </section>
</div>

<?php include __DIR__ . '/../includes/theme-footer.php'; ?>
