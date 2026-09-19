<?php
require_once __DIR__ . '/site-base.php';
if (is_file(__DIR__ . '/theme-assets.php')) {
    require __DIR__ . '/theme-assets.php';
} else {
    $themeStylesheets = [];
    $themeScripts = ['/scripts/main.js', '/scripts/animations.js'];
}

$metaTitle = $metaTitle ?? 'SEO Consultant in Pune | Fundaking Media';
$metaDesc = $metaDesc ?? 'Technical SEO, AI/LLM SEO, and local lead generation — Rahul Agarwal, Fundaking Media.';
$metaKeywords = $metaKeywords ?? 'SEO consultant Pune, technical SEO, local SEO';
$canonicalUrl = $canonicalUrl ?? 'https://fundaking.com/';
$ogTitle = $ogTitle ?? $metaTitle;
$ogDesc = $ogDesc ?? $metaDesc;
$ogImage = $ogImage ?? 'https://fundaking.com/og-image.png';
$ogUrl = $ogUrl ?? $canonicalUrl;
$navCtaText = $navCtaText ?? 'Book free SEO audit';
$navContactHref = fk_url('/contact');
$bodyClass = $bodyClass ?? 'theme-php-page';
require_once __DIR__ . '/schema-fundaking.php';
$schemaExtra = $schemaExtra ?? [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    <title><?php echo htmlspecialchars($metaTitle); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($metaDesc); ?>" />
    <meta name="keywords" content="<?php echo htmlspecialchars($metaKeywords); ?>" />
    <meta name="author" content="Rahul Agarwal, Founder, Fundaking Media" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="<?php echo htmlspecialchars($canonicalUrl); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php echo htmlspecialchars($ogTitle); ?>" />
    <meta property="og:description" content="<?php echo htmlspecialchars($ogDesc); ?>" />
    <meta property="og:image" content="<?php echo htmlspecialchars($ogImage); ?>" />
    <meta property="og:url" content="<?php echo htmlspecialchars($ogUrl); ?>" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="<?php echo fk_url('/images/favicon.svg'); ?>" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="<?php echo fk_url('/images/og-image.png'); ?>" />
    <meta name="theme-color" content="#03010E" />
<?php foreach ($themeStylesheets as $href): ?>
    <link rel="stylesheet" href="<?php echo fk_url($href); ?>" />
<?php endforeach; ?>
    <link rel="stylesheet" href="<?php echo fk_url('/assets/css/php-theme-bridge.css'); ?>" />
    <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
    <script defer src="https://unpkg.com/lenis@1.3.17/dist/lenis.min.js"></script>
<?php foreach ($themeScripts as $src): ?>
    <script defer src="<?php echo fk_url($src); ?>"></script>
<?php endforeach; ?>
<?php
if (empty($skipFundakingBaseSchema)) {
    fundaking_schema_print(
        fundaking_schema_graph($metaTitle, $metaDesc, $canonicalUrl, $schemaExtra)
    );
}
?>
</head>
<body class="<?php echo htmlspecialchars($bodyClass); ?>">
<div id="site-preloader" class="site-preloader fixed inset-0 z-[100] grid place-items-center bg-[#03010E]" aria-hidden="true">
    <div class="text-center site-preloader__inner">
        <div class="site-preloader__mark mx-auto mb-3" aria-hidden="true">
            <svg width="56" height="56" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 0 12px rgba(147,122,255,.45))">
                <rect width="32" height="32" rx="8" fill="#937AFF"/>
                <text x="16" y="21" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="11" fill="#FFFFFF">FK</text>
            </svg>
        </div>
        <p class="text-[#E5E5E5] text-sm font-medium tracking-wide">Fundaking Media</p>
    </div>
</div>
<style>
.site-preloader__mark { animation: fk-preloader-pulse .85s ease-in-out infinite; }
@keyframes fk-preloader-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.06);opacity:.92} }
@media (prefers-reduced-motion:reduce){ .site-preloader__mark{animation:none} }
</style>
<script>
(function(){function h(){var e=document.getElementById('site-preloader');if(!e||e.dataset.dismissed==='1')return;e.dataset.dismissed='1';e.style.transition='opacity .12s ease-out';e.style.opacity='0';setTimeout(function(){e.remove();document.dispatchEvent(new CustomEvent('preloader:hidden'));},130);}var s=performance.now();function g(){setTimeout(h,Math.max(0,45-(performance.now()-s)));}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',g,{once:true});else g();setTimeout(h,280);})();
</script>
<header class="header z-50 w-full transition-all duration-300 fixed top-0">
    <nav class="navbar container relative z-30">
        <div class="order-0">
            <a href="<?php echo fk_url('/'); ?>" class="navbar-brand inline-block">
                <img src="<?php echo fk_url('/images/logo.svg'); ?>" alt="Fundaking Media" width="160" height="48" style="height:45px;width:auto" />
            </a>
        </div>
        <input id="nav-toggle" type="checkbox" class="peer hidden" />
        <label for="nav-toggle" class="order-3 cursor-pointer flex items-center lg:hidden text-white lg:order-1 bg-dark/10 backdrop-blur-lg size-12 rounded-xl justify-center">
            <span class="sr-only">Menu</span>
            <svg class="h-6 fill-current block peer-checked:hidden" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0V0z"/></svg>
            <svg class="h-6 fill-current hidden peer-checked:block" viewBox="0 0 20 20"><polygon points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2" transform="rotate(45 10 10)"/></svg>
        </label>
        <ul id="nav-menu" class="navbar-nav order-3 hidden peer-checked:flex peer-checked:flex-col lg:flex w-full py-6 max-lg:mt-5 lg:order-1 lg:w-auto lg:gap-x-2 lg:py-0 xl:gap-x-8 bg-light/90 lg:bg-dark/30 backdrop-blur-lg rounded-2xl lg:rounded-full px-6">
            <li class="nav-item"><a class="nav-link block" href="<?php echo fk_url('/features'); ?>">Services</a></li>
            <li class="nav-item"><a class="nav-link block" href="<?php echo fk_url('/case-study'); ?>">Case Studies</a></li>
            <li class="nav-item"><a class="nav-link block" href="<?php echo fk_url('/blog'); ?>">Blog</a></li>
            <li class="nav-item"><a class="nav-link block" href="<?php echo fk_url('/about'); ?>">About</a></li>
            <li class="nav-item"><a class="nav-link block" href="<?php echo fk_url('/contact'); ?>">Contact</a></li>
            <li class="pt-4 inline-block lg:hidden"><a class="btn-outline btn-sm" href="<?php echo fk_url('/contact'); ?>"><?php echo htmlspecialchars($navCtaText); ?></a></li>
        </ul>
        <div class="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
            <a class="btn btn-primary hidden lg:inline-block" href="<?php echo fk_url('/contact'); ?>"><?php echo htmlspecialchars($navCtaText); ?></a>
        </div>
    </nav>
    <div class="bg-dark/50 backdrop-blur-sm -z-10" id="nav-menu-bg"></div>
</header>
<main id="main-content" class="overflow-x-hidden theme-php-main pt-24">
