<?php
/**
 * Blog post layout. Set $metaTitle, $metaDesc, $canonicalUrl, $postTitle, $postDate, $postHtml before include.
 */
$activePage = 'blog';
$navCtaText = $navCtaText ?? 'Book Free SEO Audit';
$postDate = $postDate ?? '2026-08-25';
$postModified = $postModified ?? $postDate;
$origin = 'https://fundaking.com';
$authorBio = 'Rahul Agarwal is an independent SEO consultant based in Pune with 8+ years helping SaaS, D2C, and B2B teams. He focuses on technical SEO, AI/LLM visibility, and dev-ready roadmaps that tie organic search to pipeline—not vanity rankings.';
$authorLinkedIn = 'https://www.linkedin.com/in/rahul-agarwal-510a5b79/';

$breadcrumbSchema = [
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => [
        ["@type" => "ListItem", "position" => 1, "name" => "Home", "item" => $origin . "/"],
        ["@type" => "ListItem", "position" => 2, "name" => "Blog", "item" => $origin . "/blog"],
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
        "@id" => $origin . "/#founder",
    ],
    "publisher" => [
        "@type" => "Organization",
        "name" => "Fundaking Media",
        "url" => $origin . "/",
        "logo" => ["@type" => "ImageObject", "url" => $origin . "/images/logo.svg"],
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
            <?php if ($postModified !== $postDate): ?>
                · <span>Updated <?php echo date('M j, Y', strtotime($postModified)); ?></span>
            <?php endif; ?>
        </p>
        <h1 class="hero-title"><?php echo htmlspecialchars($postTitle); ?></h1>
        <p class="hero-sub" style="max-width:720px"><?php echo htmlspecialchars($metaDesc); ?></p>
    </section>
    <article class="section container article-body">
        <?php echo $postHtml; ?>
        <aside class="author-bio" style="margin-top:48px;padding:28px;border-radius:24px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start">
            <img src="/images/author/rahul-agarwal.png" alt="Rahul Agarwal" width="128" height="128" loading="lazy" decoding="async" style="width:112px;height:112px;object-fit:cover;object-position:top;border-radius:16px;flex-shrink:0" />
            <div style="flex:1;min-width:220px">
                <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:var(--accent-2);margin:0 0 8px">About the author</p>
                <h2 style="font-size:1.25rem;margin:0 0 4px"><a href="/about" style="color:inherit;text-decoration:none">Rahul Agarwal</a></h2>
                <p class="muted" style="margin:0 0 12px;font-size:0.9rem">Founder, Fundaking Media · SEO consultant in Pune</p>
                <p style="margin:0 0 16px;line-height:1.6"><?php echo htmlspecialchars($authorBio); ?></p>
                <a href="<?php echo htmlspecialchars($authorLinkedIn); ?>" target="_blank" rel="noopener noreferrer" style="color:var(--accent-2);font-weight:600">LinkedIn</a>
                · <a href="mailto:consult@fundaking.com" style="color:var(--accent-2)">Email</a>
            </div>
        </aside>
        <div style="margin-top:32px;padding:24px;border-radius:24px;border:1px solid rgba(124,58,237,0.35);background:rgba(124,58,237,0.12)">
            <h3 style="margin:0 0 12px;font-size:1.15rem">Need help shipping this on your site?</h3>
            <p class="muted" style="margin:0 0 16px">Book a free SEO audit — technical priorities and a roadmap your team can execute.</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
                <a class="cta-btn" href="/contact">Book free SEO audit</a>
                <a class="cta-btn secondary" href="/case-study">Case studies</a>
            </div>
        </div>
    </article>
</main>
<?php include __DIR__ . '/theme-footer.php'; ?>
