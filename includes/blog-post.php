<?php
/**
 * Blog post layout. Set $metaTitle, $metaDesc, $canonicalUrl, $postTitle, $postDate, $postHtml before include.
 */
$activePage = 'blog';
$navCtaText = $navCtaText ?? 'Book Free SEO Audit';
$postDate = $postDate ?? '2026-08-25';
$postModified = $postModified ?? $postDate;

$breadcrumbSchema = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => [
        ["@type" => "ListItem", "position" => 1, "name" => "Home", "item" => "https://fundaking.com/"],
        ["@type" => "ListItem", "position" => 2, "name" => "Blog", "item" => "https://fundaking.com/blog"],
        ["@type" => "ListItem", "position" => 3, "name" => $postTitle, "item" => $canonicalUrl]
    ]
];
$articleSchema = [
    "@type" => "BlogPosting",
    "headline" => $postTitle,
    "description" => $metaDesc,
    "datePublished" => $postDate,
    "dateModified" => $postModified,
    "author" => [
        "@type" => "Person",
        "name" => "Rahul Agarwal",
        "jobTitle" => "Founder, Fundaking Media",
        "url" => "https://fundaking.com/about",
    ],
    "publisher" => [
        "@type" => "Organization",
        "name" => "Fundaking Media",
        "url" => "https://fundaking.com/",
        "logo" => ["@type" => "ImageObject", "url" => "https://fundaking.com/images/logo.svg"],
    ],
    "mainEntityOfPage" => $canonicalUrl,
];
$schemaExtra = [$breadcrumbSchema, $articleSchema];
include __DIR__ . '/theme-header.php';
?>
<main>
    <section class="hero container" style="min-height:auto;padding:100px 0 30px">
        <p class="small" style="margin-bottom:12px"><a href="/blog" style="color:var(--accent-2)">Blog</a> ·
            <time datetime="<?php echo htmlspecialchars($postDate); ?>"><?php echo date('M j, Y', strtotime($postDate)); ?></time>
        </p>
        <h1 class="hero-title"><?php echo htmlspecialchars($postTitle); ?></h1>
        <p class="hero-sub" style="max-width:720px"><?php echo htmlspecialchars($metaDesc); ?></p>
    </section>
    <article class="section container article-body">
        <?php echo $postHtml; ?>
        <div style="margin-top:48px;padding-top:28px;border-top:1px solid rgba(255,255,255,0.08)">
            <p class="muted">I’m Rahul Agarwal — <a href="/" style="color:var(--accent-2)">SEO consultant in Pune</a>
                serving brands across <a href="/seo-consultant-india" style="color:var(--accent-2)">India</a>.</p>
            <div style="margin-top:20px;display:flex;gap:14px;flex-wrap:wrap">
                <a class="cta-btn" href="/#contact">Book Free SEO Audit</a>
                <a class="cta-btn secondary" href="/blog">More articles</a>
            </div>
        </div>
    </article>
</main>
<?php include __DIR__ . '/theme-footer.php'; ?>
