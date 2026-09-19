<?php
require_once __DIR__ . '/site-base.php';
// Default values if not set
$metaTitle = $metaTitle ?? 'SEO Consultant in Pune | Rahul Agarwal - Fundaking Media';
$metaDesc = $metaDesc ?? 'Top SEO Consultant in Pune helping CEOs, startups & agencies rank #1 on Google. Technical SEO, content strategy, CRO & monthly advisory.';
$metaKeywords = $metaKeywords ?? 'SEO consultant in Pune, SEO expert Pune, best SEO consultant Pune';
$canonicalUrl = $canonicalUrl ?? 'https://fundaking.com/';
$ogTitle = $ogTitle ?? $metaTitle;
$ogDesc = $ogDesc ?? $metaDesc;
$ogImage = $ogImage ?? 'https://fundaking.com/og-image.png';
$ogUrl = $ogUrl ?? $canonicalUrl;
$navCtaText = $navCtaText ?? "Book free SEO audit";
$navContactHref = $navContactHref ?? '/#contact';
$activePage = $activePage ?? '';
$bodyClass = $bodyClass ?? 'site-showcase';
$headerExtraClass = $headerExtraClass ?? 'site-header--showcase';
$navShowWhatsApp = $navShowWhatsApp ?? true;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- SEO OPTIMIZED TITLE & META -->
    <title><?php echo $metaTitle; ?></title>
    <meta name="description" content="<?php echo $metaDesc; ?>" />
    <meta name="keywords" content="<?php echo $metaKeywords; ?>" />
    <meta name="author" content="Rahul Agarwal" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="<?php echo $canonicalUrl; ?>" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php echo $ogTitle; ?>" />
    <meta property="og:description" content="<?php echo $ogDesc; ?>" />
    <meta property="og:image" content="<?php echo $ogImage; ?>" />
    <meta property="og:url" content="<?php echo $ogUrl; ?>" />
    <meta property="og:site_name" content="Fundaking Media" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo $ogTitle; ?>" />
    <meta name="twitter:description" content="<?php echo $ogDesc; ?>" />
    <meta name="twitter:image" content="<?php echo $ogImage; ?>" />

    <!-- Favicon -->
    <link rel="icon" href="<?php echo fk_url('/favicon.svg'); ?>" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="<?php echo fk_url('/og-image.png'); ?>" />

    <!-- Fonts & Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        crossorigin="anonymous">

    <!-- Main Stylesheet -->
    <link rel="stylesheet" href="<?php echo fk_url('/assets/css/style.css?v=fk9'); ?>">

    <?php if (isset($extraHead))
        echo $extraHead; ?>
</head>

<body<?php echo !empty($bodyClass) ? ' class="' . htmlspecialchars($bodyClass, ENT_QUOTES, 'UTF-8') . '"' : ''; ?>>
    <canvas id="bgCanvas" aria-hidden="true"></canvas>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-nav-overlay">
        <a href="/" class="<?php echo ($activePage == 'home') ? 'active' : ''; ?>">Home</a>
        <div class="mobile-dropdown">
            <span class="mobile-dropdown-title">Services <i class="fas fa-chevron-down"></i></span>
            <div class="mobile-dropdown-content">
                <a href="/seo-consulting-services"
                    class="<?php echo ($activePage == 'consulting-services') ? 'active' : ''; ?>">SEO Consulting
                    Services</a>
                <a href="/technical-seo-consultant"
                    class="<?php echo ($activePage == 'technical') ? 'active' : ''; ?>">Technical SEO</a>
                <a href="/local-seo-consultant" class="<?php echo ($activePage == 'local') ? 'active' : ''; ?>">Local
                    SEO</a>
                <a href="/ecommerce-seo-consultant"
                    class="<?php echo ($activePage == 'ecommerce') ? 'active' : ''; ?>">Ecommerce SEO</a>
                <a href="/saas-seo-consultant" class="<?php echo ($activePage == 'saas') ? 'active' : ''; ?>">SaaS
                    SEO</a>
                <a href="/llm-seo-consultant" class="<?php echo ($activePage == 'llm') ? 'active' : ''; ?>">LLM SEO
                    (GEO)</a>
            </div>
        </div>
        <div class="mobile-dropdown">
            <span class="mobile-dropdown-title">Locations <i class="fas fa-chevron-down"></i></span>
            <div class="mobile-dropdown-content">
                <a href="/seo-consultant-india" class="<?php echo ($activePage == 'india') ? 'active' : ''; ?>">India</a>
                <a href="/" class="<?php echo ($activePage == 'home') ? 'active' : ''; ?>">Pune</a>
                <a href="/seo-consultant-mumbai"
                    class="<?php echo ($activePage == 'mumbai') ? 'active' : ''; ?>">Mumbai</a>
                <a href="/seo-consultant-kolkata"
                    class="<?php echo ($activePage == 'kolkata') ? 'active' : ''; ?>">Kolkata</a>
                <a href="/seo-consultant-delhi" class="<?php echo ($activePage == 'delhi') ? 'active' : ''; ?>">Delhi</a>
                <a href="/seo-consultant-bangalore"
                    class="<?php echo ($activePage == 'bangalore') ? 'active' : ''; ?>">Bangalore</a>
            </div>
        </div>
        <div class="mobile-dropdown">
            <span class="mobile-dropdown-title">Resources <i class="fas fa-chevron-down"></i></span>
            <div class="mobile-dropdown-content">
                <a href="/blog" class="<?php echo ($activePage == 'blog') ? 'active' : ''; ?>">Blog</a>
                <a href="/hire-seo-consultant-pune"
                    class="<?php echo ($activePage == 'hire-guide') ? 'active' : ''; ?>">Hiring Guide</a>
                <a href="/seo-consultant-vs-agency"
                    class="<?php echo ($activePage == 'vs-agency') ? 'active' : ''; ?>">Consultant vs Agency</a>
                <a href="/eeat-grader" class="<?php echo ($activePage == 'tools') ? 'active' : ''; ?>">EEAT Audit
                    Tool</a>
            </div>
        </div>
        <a href="<?php echo fk_url('/#approach'); ?>">Approach</a>
        <a href="<?php echo fk_url('/case-studies'); ?>" class="<?php echo ($activePage == 'case-studies') ? 'active' : ''; ?>">Case
            Studies</a>
        <a href="<?php echo $navContactHref; ?>">Contact</a>
        <a href="<?php echo $navContactHref; ?>" class="cta-btn"><?php echo $navCtaText; ?></a>
    </div>

    <header class="site-header<?php echo !empty($headerExtraClass) ? ' ' . htmlspecialchars($headerExtraClass, ENT_QUOTES, 'UTF-8') : ''; ?>">
        <div class="container nav-inner">
            <a class="brand" href="<?php echo fk_url('/'); ?>">
                <span class="brand-lockup">
                    <span class="brand-funda">फंडा</span>
                    <span class="brand-king">King<span class="brand-dot" aria-hidden="true"></span></span>
                </span>
                <span class="brand-sub">Fundaking Media</span>
            </a>
            <nav class="main-nav">
                <a href="<?php echo fk_url('/'); ?>" class="<?php echo ($activePage == 'home') ? 'active' : ''; ?>">Home</a>
                <div class="dropdown">
                    <a href="/seo-consulting-services"
                        class="dropdown-trigger <?php echo in_array($activePage, ['technical', 'local', 'ecommerce', 'llm', 'saas', 'consulting-services', 'audit', 'enterprise', 'amazon', 'healthcare', 'b2b']) ? 'active' : ''; ?>">Services
                        <i class="fas fa-chevron-down" style="font-size:0.7em;margin-left:4px"></i></a>
                    <div class="dropdown-menu">
                        <a href="/seo-consulting-services"
                            class="<?php echo ($activePage == 'consulting-services') ? 'active' : ''; ?>"><i
                                class="fas fa-briefcase"></i> Consulting Services</a>
                        <a href="/technical-seo-consultant"
                            class="<?php echo ($activePage == 'technical') ? 'active' : ''; ?>"><i
                                class="fas fa-code"></i> Technical SEO</a>
                        <a href="/local-seo-consultant"
                            class="<?php echo ($activePage == 'local') ? 'active' : ''; ?>"><i
                                class="fas fa-map-marker-alt"></i> Local SEO</a>
                        <a href="/ecommerce-seo-consultant"
                            class="<?php echo ($activePage == 'ecommerce') ? 'active' : ''; ?>"><i
                                class="fas fa-shopping-cart"></i> Ecommerce SEO</a>
                        <a href="/saas-seo-consultant"
                            class="<?php echo ($activePage == 'saas') ? 'active' : ''; ?>"><i class="fas fa-cloud"></i>
                            SaaS SEO</a>
                        <a href="/llm-seo-consultant"
                            class="<?php echo ($activePage == 'llm') ? 'active' : ''; ?>"><i class="fas fa-robot"></i>
                            LLM SEO (GEO)</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="/seo-consultant-india"
                        class="dropdown-trigger <?php echo in_array($activePage, ['india', 'mumbai', 'kolkata', 'delhi', 'bangalore', 'ahmedabad', 'chennai', 'chandigarh', 'lucknow']) ? 'active' : ''; ?>">Locations
                        <i class="fas fa-chevron-down" style="font-size:0.7em;margin-left:4px"></i></a>
                    <div class="dropdown-menu">
                        <a href="/seo-consultant-india"
                            class="<?php echo ($activePage == 'india') ? 'active' : ''; ?>"><i
                                class="fas fa-globe-asia"></i> India</a>
                        <a href="/" class="<?php echo ($activePage == 'home') ? 'active' : ''; ?>"><i
                                class="fas fa-map-pin"></i> Pune</a>
                        <a href="/seo-consultant-mumbai"
                            class="<?php echo ($activePage == 'mumbai') ? 'active' : ''; ?>"><i
                                class="fas fa-city"></i> Mumbai</a>
                        <a href="/seo-consultant-kolkata"
                            class="<?php echo ($activePage == 'kolkata') ? 'active' : ''; ?>"><i
                                class="fas fa-city"></i> Kolkata</a>
                        <a href="/seo-consultant-delhi"
                            class="<?php echo ($activePage == 'delhi') ? 'active' : ''; ?>"><i class="fas fa-city"></i>
                            Delhi</a>
                        <a href="/seo-consultant-bangalore"
                            class="<?php echo ($activePage == 'bangalore') ? 'active' : ''; ?>"><i
                                class="fas fa-city"></i> Bangalore</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="/blog"
                        class="dropdown-trigger <?php echo in_array($activePage, ['hire-guide', 'vs-agency', 'tools', 'blog']) ? 'active' : ''; ?>">Resources
                        <i class="fas fa-chevron-down" style="font-size:0.7em;margin-left:4px"></i></a>
                    <div class="dropdown-menu">
                        <a href="/blog" class="<?php echo ($activePage == 'blog') ? 'active' : ''; ?>"><i
                                class="fas fa-newspaper"></i> Blog</a>
                        <a href="/hire-seo-consultant-pune"
                            class="<?php echo ($activePage == 'hire-guide') ? 'active' : ''; ?>"><i
                                class="fas fa-user-check"></i> Hiring Guide</a>
                        <a href="/seo-consultant-vs-agency"
                            class="<?php echo ($activePage == 'vs-agency') ? 'active' : ''; ?>"><i
                                class="fas fa-balance-scale"></i> Consultant vs Agency</a>
                        <a href="/eeat-grader" class="<?php echo ($activePage == 'tools') ? 'active' : ''; ?>"><i
                                class="fas fa-shield-alt"></i> EEAT Audit Tool</a>
                    </div>
                </div>
                <a href="<?php echo fk_url('/#approach'); ?>">Approach</a>
                <a href="<?php echo fk_url('/case-studies'); ?>" class="<?php echo ($activePage == 'case-studies') ? 'active' : ''; ?>">Case
                    Studies</a>
                <a href="<?php echo $navContactHref; ?>">Contact</a>
            </nav>
            <div class="nav-actions">
                <?php if (!empty($navShowWhatsApp)): ?>
                <a class="cta-btn secondary nav-whatsapp" href="https://wa.me/918421053710">WhatsApp</a>
                <?php endif; ?>
                <a class="cta-btn" href="<?php echo $navContactHref; ?>"><?php echo $navCtaText; ?></a>
                <!-- Mobile Toggle Button -->
                <div class="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>
