<?php
// Security: Prevent code leakage via error display
error_reporting(0);
ini_set('display_errors', 0);

$metaTitle = "Advanced SEO & E-E-A-T Audit Tool | Fundaking Media";
$metaDesc = "The ultimate one-stop SEO audit tool. Analyze E-E-A-T credentials, technical health, content depth, and performance signals in one click.";
$canonicalUrl = "https://fundaking.com/eeat-grader";
$navCtaText = "Get Full Audit";
$activePage = 'tools';

// LEAD CAPTURE HANDLER (Priority - Must be before any output)
if (isset($_POST['action']) && $_POST['action'] === 'save_lead') {
    header('Content-Type: application/json');
    $leadEmail = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $auditedUrl = filter_var($_POST['audited_url'] ?? '', FILTER_SANITIZE_URL);

    if ($leadEmail && $auditedUrl) {
        $score = $_POST['score'] ?? '0';
        $issues = $_POST['issues'] ?? '0';

        $dataDir = __DIR__ . '/data';
        if (!is_dir($dataDir))
            mkdir($dataDir, 0755, true);

        $file = $dataDir . '/leads.csv';
        $isNew = !file_exists($file);
        $fp = fopen($file, 'a');
        if ($isNew)
            fputcsv($fp, ['Timestamp', 'Email', 'Audited URL', 'Score', 'Issues']);
        fputcsv($fp, [date('Y-m-d H:i:s'), $leadEmail, $auditedUrl, $score, $issues]);
        fclose($fp);

        // Set lead cookie for 30 days
        setcookie('fu_lead_captured', '1', time() + (86400 * 30), "/");

        // Notify
        $to = "consult@fundaking.com";
        $subject = "🔥 New SEO Lead [" . $score . "/100]: $leadEmail";
        $message = "New SEO Lead Captured!\nEmail: $leadEmail\nSite: $auditedUrl\nScore: $score/100\nIssues Found: $issues";
        @mail($to, $subject, $message, "From: leads@fundaking.com");

        echo json_encode(['status' => 'success']);
        exit;
    }
    echo json_encode(['status' => 'error']);
    exit;
}

include 'includes/header.php';

// Google PageSpeed Insights API Key
$GOOGLE_PSI_API_KEY = 'AIzaSyBtF7odhguzW5z6iBC8dpxW92WT2OO15Tc';

$url = $_GET['url'] ?? '';
$keyword = $_GET['keyword'] ?? '';
$globalScore = 0;
$categories = [
    'trust' => ['score' => 0, 'total' => 0, 'title' => 'E-E-A-T & Trust', 'icon' => 'fa-shield-alt'],
    'content' => ['score' => 0, 'total' => 0, 'title' => 'Content Optimization', 'icon' => 'fa-file-alt'],
    'tech' => ['score' => 0, 'total' => 0, 'title' => 'Technical Health', 'icon' => 'fa-server'],
    'performance' => ['score' => 0, 'total' => 0, 'title' => 'Performance & Speed', 'icon' => 'fa-tachometer-alt']
];
$auditResults = [];
$error = '';
$performanceData = null;
$detailedFindings = [];
$extractedMeta = [];

/**
 * Helper to add a check result
 */
function addCheck($cat, $key, $passed, $label, $desc, $points = 10, $details = [], $priority = 'Medium', $fix = '')
{
    global $auditResults, $categories, $detailedFindings;
    $auditResults[$key] = [
        'category' => $cat,
        'pass' => $passed,
        'label' => $label,
        'desc' => $desc,
        'priority' => $priority,
        'fix' => $fix
    ];
    $categories[$cat]['total'] += $points;
    if ($passed)
        $categories[$cat]['score'] += $points;

    if (!empty($details)) {
        $detailedFindings[$key] = $details;
    }
}

/**
 * Basic Syllable Counter for Readability
 */
function countSyllables($text)
{
    $text = strtolower($text);
    if (strlen($text) <= 3)
        return 1;
    $text = preg_replace('/(?:[^laeiouy]es|ed|[^laeiouy]e)$/', '', $text);
    $text = preg_replace('/^y/', '', $text);
    preg_match_all('/[aeiouy]{1,2}/', $text, $res);
    return count($res[0]);
}

/**
 * Safe getAttribute
 */
function attr($node, $name)
{
    if ($node instanceof DOMElement) {
        return $node->getAttribute($name);
    }
    return '';
}

/**
 * Resolve relative URL to absolute
 */
function rel2abs($rel, $base)
{
    if (parse_url($rel, PHP_URL_SCHEME) != '')
        return $rel;
    if (!$rel || $rel[0] == '#' || $rel[0] == '?')
        return $base . $rel;

    $baseParts = parse_url($base);
    $scheme = $baseParts['scheme'] ?? 'http';
    $host = $baseParts['host'] ?? '';
    $path = $baseParts['path'] ?? '/';

    $path = preg_replace('#/[^/]*$#', '', $path);
    if ($rel[0] == '/')
        $path = '';

    $abs = $host . $path . '/' . ltrim($rel, '/');
    $re = array('#(/\.?/)#', '#/(?!\.\.)[^/]+/\.\./#');
    for ($n = 1; $n > 0; $abs = preg_replace($re, '/', $abs, -1, $n)) {
    }
    return $scheme . '://' . rtrim($abs, '/');
}

if ($url) {
    if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
        $url = "https://" . $url;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Compatible; FundakingBot/1.0)');
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $html = curl_exec($ch);
    $info = curl_getinfo($ch);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($html === false || $info['http_code'] >= 400) {
        $error = "Could not crawl URL. Status: " . $info['http_code'] . ". Error: $curlError";
    } else {
        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new DOMXPath($dom);
        $bodyText = strtolower($dom->textContent);

        // Metadata extraction
        $extractedMeta = [];
        $titles = $dom->getElementsByTagName('title');
        $extractedMeta['title'] = $titles->length > 0 ? $titles->item(0)->textContent : 'No title found';

        foreach ($dom->getElementsByTagName('meta') as $meta) {
            $name = attr($meta, 'name');
            $property = attr($meta, 'property');
            $content = attr($meta, 'content');
            if ($name == 'description')
                $extractedMeta['description'] = $content;
            if ($property == 'og:title')
                $extractedMeta['og_title'] = $content;
            if ($property == 'og:description')
                $extractedMeta['og_description'] = $content;
            if ($property == 'og:image')
                $extractedMeta['og_image'] = $content;
        }

        // Images metadata
        $extractedMeta['images'] = [];
        $allImages = $dom->getElementsByTagName('img');
        $imageCount = 0;
        foreach ($allImages as $img) {
            if ($imageCount >= 10)
                break;
            $src = attr($img, 'src');
            if ($src) {
                $extractedMeta['images'][] = [
                    'src' => $src,
                    'alt' => attr($img, 'alt') ?: 'Missing alt text',
                    'width' => attr($img, 'width') ?: 'Not specified',
                    'height' => attr($img, 'height') ?: 'Not specified',
                    'loading' => attr($img, 'loading') ?: 'eager'
                ];
                $imageCount++;
            }
        }

        // --- Determine Page Type ---
        $urlLower = strtolower($url);
        $isBlog = (strpos($urlLower, '/blog/') !== false || strpos($urlLower, '/article/') !== false || strpos($urlLower, '/post/') !== false);

        $blogSignals = ['written by', 'author:', 'posted on', 'published'];
        $blogSignalCount = 0;
        foreach ($blogSignals as $s)
            if (strpos($bodyText, $s) !== false)
                $blogSignalCount++;

        if ($isBlog || $blogSignalCount >= 2) {
            $pageType = 'blog';
            $pageTypeLabel = 'Blog Post/Article';
            $pageTypeIcon = 'fa-newspaper';
        } else {
            $pageType = 'landing';
            $pageTypeLabel = 'Landing/Homepage';
            $pageTypeIcon = 'fa-home';
        }

        // --- 1. PRECISE E-E-A-T ANALYSIS ---

        // Experience
        $hasExperience = false;
        $experienceSignals = ['i tested', 'i tried', 'my experience', 'i used', 'case study', 'real results'];
        foreach ($experienceSignals as $s)
            if (strpos($bodyText, $s) !== false) {
                $hasExperience = true;
                break;
            }
        addCheck('trust', 'experience', $hasExperience, 'First-Hand Experience', 'Content shows real-world experience signals.', 15, [], 'Medium', 'Add personal anecdotes or unique case study data.');

        // Expertise 
        $hasCredentials = false;
        $credSignals = ['phd', 'certified', 'expert', 'specialist', 'years of experience', 'professional', 'degree'];
        foreach ($credSignals as $s)
            if (strpos($bodyText, $s) !== false) {
                $hasCredentials = true;
                break;
            }
        addCheck('trust', 'credentials', $hasCredentials, 'Expert Credentials', 'Author qualifications/expertise mentioned.', 15, [], 'Medium', 'Mention author certifications or years of industry experience.');

        // Authoritativeness
        $links = $dom->getElementsByTagName('a');
        $hasCitations = false;
        $citationDomains = ['wikipedia.org', 'edu', 'gov', '.org', 'research', 'study'];
        foreach ($links as $link) {
            $href = strtolower(attr($link, 'href'));
            foreach ($citationDomains as $d)
                if (strpos($href, $d) !== false) {
                    $hasCitations = true;
                    break 2;
                }
        }
        addCheck('trust', 'citations', $hasCitations, 'Authoritative Citations', 'Links to credible external sources (.edu, .gov, research).', 15, [], 'Medium', 'Link out to high-authority research papers or government sites.');

        // Author Bio (Blog only)
        if ($pageType === 'blog') {
            $hasAuthorBio = false;
            if (strpos($bodyText, 'about the author') !== false || strpos($bodyText, 'author bio') !== false)
                $hasAuthorBio = true;
            addCheck('trust', 'author_bio', $hasAuthorBio, 'Author Biography', 'Dedicated author bio section found.', 15, [], 'Medium', 'Add a short author biography at the end of the post.');
        }

        // Trust Signals
        $isSsl = strpos($url, 'https://') === 0;
        addCheck('trust', 'ssl', $isSsl, 'HTTPS Security', 'Site is served over a secure connection.', 20, [], 'High', 'Install an SSL certificate.');

        $hasAbout = $hasContact = $hasPrivacy = $hasTerms = false;
        foreach ($links as $link) {
            $href = strtolower(attr($link, 'href'));
            $text = strtolower($link->nodeValue);
            if (strpos($href, 'about') !== false || strpos($text, 'about') !== false)
                $hasAbout = true;
            if (strpos($href, 'contact') !== false || strpos($text, 'contact') !== false)
                $hasContact = true;
            if (strpos($href, 'privacy') !== false || strpos($text, 'privacy') !== false)
                $hasPrivacy = true;
            if (strpos($href, 'terms') !== false || strpos($text, 'terms') !== false)
                $hasTerms = true;
        }
        addCheck('trust', 'about', $hasAbout, 'About Page', 'Link to About page found.', 10, [], 'Medium', 'Create an About Us page for brand transparency.');
        addCheck('trust', 'contact', $hasContact, 'Contact Info', 'Contact page or link found.', 10, [], 'High', 'Add a Contact page with email/phone.');
        addCheck('trust', 'privacy', $hasPrivacy, 'Privacy Policy', 'Privacy Policy link found.', 10, [], 'Medium', 'Add a Privacy Policy for legal trust.');

        // Entity Identity Schema
        $hasPersonOrg = false;
        foreach ($dom->getElementsByTagName('script') as $script) {
            $type = strtolower(trim(attr($script, 'type')));

            // Clean up type attribute if it contains other chars (unlikely, but safe)
            if (preg_match('/application\/ld\+json/i', $type)) {
                $schema = $script->nodeValue;
                if (stripos($schema, '"Person"') !== false || stripos($schema, '"Organization"') !== false) {
                    $hasPersonOrg = true;
                    break;
                }
            }
        }
        // Fallback: Check raw HTML if DOM missed it
        if (!$hasPersonOrg) {
            if (
                (stripos($html, '"@type": "Organization"') !== false) || (stripos($html, '"@type":"Organization"') !== false) ||
                (stripos($html, '"@type": "Person"') !== false) || (stripos($html, '"@type":"Person"') !== false)
            ) {
                $hasPersonOrg = true;
            }
        }
        addCheck('trust', 'entity_schema', $hasPersonOrg, 'Entity Identity Schema', 'Person or Organization Schema found.', 15, [], 'Medium', 'Add Org or Person JSON-LD schema.');

        // Review signals
        $hasReviews = (strpos($bodyText, 'review') !== false || strpos($bodyText, 'rating') !== false || strpos($bodyText, 'testimonial') !== false);
        addCheck('trust', 'social_proof', $hasReviews, 'Social Proof', 'Reviews/testimonials mentioned.', 10);

        // --- 2. PRECISE CONTENT ANALYSIS ---

        // Title Tag
        $titleLine = $extractedMeta['title'];
        $titleLen = strlen($titleLine);
        addCheck('content', 'title', ($titleLen >= 30 && $titleLen <= 60), 'Title Tag Analysis', "Length: $titleLen.", 20, [$titleLine], 'High', "Ensure title is 30-60 chars.");

        // Meta Description
        $descLine = $extractedMeta['description'];
        $descLen = strlen($descLine);
        addCheck('content', 'meta_desc', ($descLen >= 120 && $descLen <= 160), 'Meta Description Analysis', "Length: $descLen.", 15, [$descLine], 'High', "Write a compelling description (120-160 chars).");

        // Word Count
        $wordCountResult = str_word_count($bodyText);
        addCheck('content', 'word_count', $wordCountResult > 600, 'Content Depth', "Words: ~" . number_format($wordCountResult), 20, [], 'Medium', "Increase word count with original content.");

        // Readability (Flesch Ease)
        $sentences = preg_split('/[.!?](\s|$)/', $bodyText, -1, PREG_SPLIT_NO_EMPTY);
        $sentenceCount = max(1, count($sentences));
        $syllablesCount = 0;
        $wordsArray = str_word_count($bodyText, 1);
        foreach ($wordsArray as $w)
            $syllablesCount += countSyllables($w);
        $readingEase = 206.835 - 1.015 * ($wordCountResult / $sentenceCount) - 84.6 * ($syllablesCount / max(1, $wordCountResult));
        addCheck('content', 'readability', $readingEase > 30, 'Readability Score', "Flesch Ease: " . round($readingEase, 1), 10, [], 'Medium', 'Simplify writing for better readability.');

        // H1 Heading
        $h1s = $dom->getElementsByTagName('h1');
        $h1Count = $h1s->length;
        addCheck('content', 'h1', $h1Count === 1, 'H1 Hierarchy', $h1Count === 0 ? "Missing H1" : ($h1Count > 1 ? "Multiple H1s ($h1Count)" : "Unique H1 found"), 15, [], 'High', 'Use exactly one H1 per page.');

        // Keyword Density (if keyword provided)
        if ($keyword) {
            $kw = strtolower($keyword);
            $kwCount = preg_match_all('/\b' . preg_quote($kw, '/') . '\b/i', $bodyText, $matches);
            $density = ($wordCountResult > 0) ? round(($kwCount / $wordCountResult) * 100, 2) : 0;
            $densityPass = ($density >= 0.5 && $density <= 3.0);
            addCheck('content', 'kw_density', $densityPass, 'Keyword Density', "Density: $density% ($kwCount occurrences).", 10, [], 'Medium', "Target 0.5% - 3.0% keyword density.");
        }

        // --- 3. PRECISE TECHNICAL ANALYSIS ---

        // Broken Links (Priority check top 15)
        $brokenLinksArray = [];
        $linksElements = $dom->getElementsByTagName('a');
        $checkedLinks = 0;
        foreach ($linksElements as $l) {
            $href = attr($l, 'href');
            if (!$href || strpos($href, 'http') !== 0)
                continue;
            if ($checkedLinks < 15) {
                $checkedLinks++;
                $lh = curl_init($href);
                curl_setopt($lh, CURLOPT_NOBODY, 1);
                curl_setopt($lh, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($lh, CURLOPT_TIMEOUT, 3);
                curl_setopt($lh, CURLOPT_USERAGENT, 'Mozilla/5.0 (Compatible; FundakingBot/1.0)');
                curl_setopt($lh, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($lh, CURLOPT_FOLLOWLOCATION, true);
                curl_exec($lh);
                if (curl_getinfo($lh, CURLINFO_HTTP_CODE) >= 400)
                    $brokenLinksArray[] = $href;
                curl_close($lh);
            }
        }
        addCheck('tech', 'broken_links', count($brokenLinksArray) === 0, 'Link Integrity', count($brokenLinksArray) === 0 ? 'No broken links found.' : count($brokenLinksArray) . ' broken links detected.', 15, $brokenLinksArray, 'High', 'Fix 404 broken links.');

        // Security Headers
        $headers = get_headers($url, 1);
        $missingHeads = [];
        foreach (['Strict-Transport-Security', 'X-Frame-Options', 'X-Content-Type-Options'] as $h) {
            $found = false;
            foreach ($headers as $hk => $hv)
                if (strtolower($hk) == strtolower($h))
                    $found = true;
            if (!$found)
                $missingHeads[] = $h;
        }
        addCheck('tech', 'security_headers', count($missingHeads) === 0, 'Security Headers', count($missingHeads) === 0 ? 'Security headers found.' : count($missingHeads) . ' security headers missing.', 10, $missingHeads, 'Low', 'Configure HSTS and Content-Security headers.');

        // Robots.txt
        $urlParts = parse_url($url);
        $rootBase = ($urlParts['scheme'] ?? 'http') . '://' . ($urlParts['host'] ?? '');
        $robotsCh = curl_init($rootBase . '/robots.txt');
        curl_setopt($robotsCh, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($robotsCh, CURLOPT_USERAGENT, 'Mozilla/5.0 (Compatible; FundakingBot/1.0)');
        curl_setopt($robotsCh, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($robotsCh, CURLOPT_FOLLOWLOCATION, true);
        curl_exec($robotsCh);
        $hasRobots = curl_getinfo($robotsCh, CURLINFO_HTTP_CODE) == 200;
        curl_close($robotsCh);
        addCheck('tech', 'robots_txt', $hasRobots, 'Robots.txt File', $hasRobots ? 'Found' : 'Missing', 10, [], 'High', 'Create a robots.txt file.');

        // XML Sitemap
        $sitemapUrl = $rootBase . '/sitemap.xml';
        $siteCh = curl_init($sitemapUrl);
        curl_setopt($siteCh, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($siteCh, CURLOPT_NOBODY, 1);
        curl_setopt($siteCh, CURLOPT_USERAGENT, 'Mozilla/5.0 (Compatible; FundakingBot/1.0)');
        curl_setopt($siteCh, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($siteCh, CURLOPT_FOLLOWLOCATION, true);
        curl_exec($siteCh);
        $hasSitemap = curl_getinfo($siteCh, CURLINFO_HTTP_CODE) == 200;
        curl_close($siteCh);
        addCheck('tech', 'sitemap_xml', $hasSitemap, 'XML Sitemap', $hasSitemap ? 'Found' : 'Not found at root', 10, [], 'Medium', 'Ensure sitemap.xml is at root & submitted.');

        // TTFB
        $ttStart = microtime(true);
        $ttCh = curl_init($url);
        curl_setopt($ttCh, CURLOPT_NOBODY, 1);
        curl_exec($ttCh);
        curl_close($ttCh);
        $ttfb = round((microtime(true) - $ttStart) * 1000);
        addCheck('tech', 'ttfb', $ttfb < 600, 'Server Response (TTFB)', "Time: {$ttfb}ms", 15, [], 'Medium', 'Optimize server response time (<600ms).');

        // --- 4. EXTENDED CHECKS (Restored from previous version) ---

        // Social Presence
        $socialDomains = ['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com', 'youtube.com', 'pinterest.com'];
        $foundSocials = [];
        foreach ($links as $link) {
            $href = strtolower(attr($link, 'href'));
            foreach ($socialDomains as $sd) {
                if (strpos($href, $sd) !== false) {
                    $foundSocials[] = $href;
                    break;
                }
            }
        }
        $foundSocials = array_unique($foundSocials);
        addCheck('trust', 'social_links', count($foundSocials) > 0, 'Social Presence', count($foundSocials) > 0 ? "Links to social media profiles found (important for Brand Trust)." : "No social profiles linked.", 10, $foundSocials, 'Low', 'Link to your social media profiles.');

        // Authority Signals
        $authTerms = ['award', 'winner', 'recognized', 'certified', 'honored', 'voted'];
        $hasAuthSignal = false;
        foreach ($authTerms as $at) {
            if (stripos($bodyText, $at) !== false) {
                $hasAuthSignal = true;
                break;
            }
        }
        addCheck('trust', 'authority_signals', $hasAuthSignal, 'Authority Signals', $hasAuthSignal ? "Mentions of awards or independent recognitions found." : "No explicit authority keywords found.", 10, [], 'Low', 'Mention awards or certifications.');

        // Structured Data (General)
        $hasSchema = false;
        foreach ($dom->getElementsByTagName('script') as $s) {
            $type = strtolower(trim(attr($s, 'type')));
            if ($type == 'application/ld+json' || $type == 'application/json+ld') {
                $hasSchema = true;
                break;
            }
        }
        // Fallback: Check raw HTML for common schema patterns if DOM check fails
        if (!$hasSchema) {
            if (stripos($html, '"@context":') !== false && stripos($html, 'schema.org') !== false) {
                $hasSchema = true;
            }
        }
        addCheck('trust', 'any_schema', $hasSchema, 'Structured Data', $hasSchema ? "Schema markup detected on page." : "No structured data found.", 10, [], 'Medium', 'Implement JSON-LD Schema markup.');

        // Keyword Placement
        if ($keyword) {
            $kw = strtolower($keyword);
            // Title
            $kwInTitle = stripos(strtolower($extractedMeta['title']), $kw) !== false;
            addCheck('content', 'kw_title', $kwInTitle, 'Keyword in Title', $kwInTitle ? "Keyword found in page title." : "Keyword missing from title.", 15, [], 'High', "Include '$keyword' in your title tag.");

            // Desc
            $kwInDesc = stripos(strtolower($extractedMeta['description'] ?? ''), $kw) !== false;
            addCheck('content', 'kw_desc', $kwInDesc, 'Keyword in Meta Description', $kwInDesc ? "Keyword found in meta description." : "Keyword missing from description.", 10, [], 'Medium', "Include '$keyword' in meta description.");

            // H1
            $kwInH1 = false;
            foreach ($h1s as $h1) {
                if (stripos(strtolower($h1->textContent), $kw) !== false) {
                    $kwInH1 = true;
                    break;
                }
            }
            addCheck('content', 'kw_h1', $kwInH1, 'Keyword in H1', $kwInH1 ? "Keyword found in H1 tag." : "Target keyword should be prominently in the H1.", 15, [], 'High', "Include '$keyword' in your H1.");
        }

        // Canonical Alignment
        $canonical = '';
        foreach ($dom->getElementsByTagName('link') as $l) {
            if (attr($l, 'rel') == 'canonical')
                $canonical = attr($l, 'href');
        }
        $isCanonicalMatch = ($canonical == $url || $canonical == $url . '/');
        addCheck('tech', 'canonical', $isCanonicalMatch, 'Canonical Alignment', $canonical ? "URL matches canonical tag." : "Canonical tag missing or mismatch.", 10, [$canonical], 'Medium', 'Ensure self-referencing canonical tag.');

        // Mobile Viewport
        $hasViewport = false;
        foreach ($dom->getElementsByTagName('meta') as $m) {
            if (attr($m, 'name') == 'viewport')
                $hasViewport = true;
        }
        addCheck('tech', 'viewport', $hasViewport, 'Mobile Viewport', $hasViewport ? "Viewport meta tag present for mobile responsiveness." : "Missing viewport tag.", 20, [], 'High', 'Add <meta name="viewport" ...>');

        // Image Alt Audit
        $missingAltCount = 0;
        foreach ($allImages as $img) {
            if (!attr($img, 'alt'))
                $missingAltCount++;
        }
        addCheck('tech', 'image_alt', $missingAltCount === 0, 'Image Alt Audit', $missingAltCount === 0 ? "Every single image has an Alt tag." : "$missingAltCount images missing Alt text.", 15, [], 'High', 'Add descriptive alt text to all images.');

        // Language Declaration
        $htmlLang = '';
        foreach ($dom->getElementsByTagName('html') as $h) {
            $htmlLang = attr($h, 'lang');
        }
        addCheck('tech', 'lang_tag', !empty($htmlLang), 'Language Declaration', $htmlLang ? "Language set to: $htmlLang" : "Missing lang attribute on HTML tag.", 5, [], 'Low', 'Set <html lang="en">.');

        // Favicon
        $hasFavicon = false;
        foreach ($dom->getElementsByTagName('link') as $l) {
            $rel = strtolower(attr($l, 'rel'));
            if (strpos($rel, 'icon') !== false)
                $hasFavicon = true;
        }
        addCheck('tech', 'favicon', $hasFavicon, 'Favicon', $hasFavicon ? "Favicon detected." : "No favicon detected.", 5, [], 'Medium', 'Add a favicon.');

        // Link Architecture
        $intLinks = 0;
        $extLinks = 0;
        $host = parse_url($url, PHP_URL_HOST);
        foreach ($links as $l) {
            $h = attr($l, 'href');
            if (!$h)
                continue;
            if (strpos($h, $host) !== false || strpos($h, '/') === 0)
                $intLinks++;
            else
                $extLinks++;
        }
        addCheck('tech', 'link_arch', true, 'Link Architecture', "Internal: $intLinks | External: $extLinks. (Balanced linking helps SEO).", 10); // Always pass as info

        // --- 5. PERFORMANCE SIGNALS (DOM Based) ---

        // HTML Page Size
        $pageSize = strlen($html) / 1024;
        addCheck('performance', 'page_size', $pageSize < 500, 'HTML Page Size', "Page size: " . round($pageSize, 2) . "KB (Target: <500KB for fast loading)", 15, [], 'Medium', 'Minify HTML and reduce inline scripts.');

        // External Resources
        $extResources = 0;
        foreach ($dom->getElementsByTagName('link') as $l)
            if (attr($l, 'rel') == 'stylesheet')
                $extResources++;
        foreach ($dom->getElementsByTagName('script') as $s)
            if (attr($s, 'src'))
                $extResources++;
        addCheck('performance', 'ext_resources', $extResources < 15, 'External Resources', "$extResources external scripts/styles (Target: <15 to reduce requests)", 10, [], 'Medium', 'Combine CSS/JS files.');

        // Image Lazy Loading
        $lazyCount = 0;
        foreach ($allImages as $img) {
            if (attr($img, 'loading') == 'lazy')
                $lazyCount++;
        }
        addCheck('performance', 'lazy_load', $lazyCount > 0 || count($allImages) == 0, 'Image Lazy Loading', "$lazyCount of " . count($allImages) . " images use lazy loading (improves initial load)", 10, [], 'Medium', 'Add loading="lazy" to below-fold images.');

        // Image Dimensions
        $missingDims = 0;
        foreach ($allImages as $img) {
            if (!attr($img, 'width') || !attr($img, 'height'))
                $missingDims++;
        }
        addCheck('performance', 'img_dims', $missingDims === 0, 'Image Dimensions', "$missingDims of " . count($allImages) . " images missing width/height (causes layout shift)", 10, [], 'Medium', 'Specify width & height attributes for all images.');

        // Render Blocking
        $blocking = 0;
        $blockingScripts = [];
        foreach ($dom->getElementsByTagName('script') as $s) {
            if (attr($s, 'src') && !attr($s, 'async') && !attr($s, 'defer')) {
                $blocking++;
                if (count($blockingScripts) < 3)
                    $blockingScripts[] = attr($s, 'src');
            }
        }
        addCheck('performance', 'render_blocking', $blocking < 3, 'Render-Blocking Scripts', "$blocking scripts block rendering (Use async/defer attributes)", 15, $blockingScripts, 'Medium', 'Add defer or async attribute to scripts.');

        // Total Score
        $totalP = 0;
        $earnedP = 0;
        foreach ($categories as $c) {
            $totalP += $c['total'];
            $earnedP += $c['score'];
        }
        $globalScore = ($totalP > 0) ? round(($earnedP / $totalP) * 100) : 0;
    }
}
?>

<style>
    #audit-loader {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(4, 4, 10, 0.98);
        backdrop-filter: blur(20px);
        z-index: 10000;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
    }

    .spinner-ring {
        position: relative;
        width: 150px;
        height: 150px;
        border: 3px solid transparent;
        border-top: 3px solid var(--accent);
        border-radius: 50%;
        animation: loader-spin 1.5s infinite;
    }

    @keyframes loader-spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .loader-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.5rem;
        color: var(--accent);
    }

    .circular-chart {
        display: block;
        margin: 10px auto;
        max-width: 100%;
        max-height: 250px;
    }

    .circle-bg {
        fill: none;
        stroke: rgba(255, 255, 255, 0.05);
        stroke-width: 2.5;
    }

    .circle {
        fill: none;
        stroke-width: 2.5;
        stroke-linecap: round;
        animation: progress 1.5s ease-out forwards;
    }

    @keyframes progress {
        0% {
            stroke-dasharray: 0 100;
        }
    }

    .checklist-item {
        background: rgba(255, 255, 255, 0.02);
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .checklist-item.pass {
        border-left: 4px solid #25d366;
    }

    .checklist-item.fail {
        border-left: 4px solid #ff4757;
    }
</style>

<div id="audit-loader">
    <div style="position:relative;">
        <div class="spinner-ring"></div>
        <i class="fas fa-microscope loader-icon"></i>
    </div>
    <div class="loader-content">
        <h2 style="margin-top:30px;">Initiating Deep Scan...</h2>
        <p>Analyzing precision trust signals and technical health.</p>
    </div>
</div>

<main>
    <section class="hero container" style="min-height:70vh; align-content:center; text-align:center;">
        <div class="hero-eyebrow">Advanced Audit Tool</div>
        <h1 class="hero-title">One-Stop SEO Success Scanner</h1>
        <p class="hero-sub" style="margin: 0 auto 30px auto;">Analyze Trust, Content, and Tech Health in seconds.
            (Precise Backup Version Restore)</p>
        <form action="" method="GET" onsubmit="document.getElementById('audit-loader').style.display='flex';"
            style="margin-top:40px; max-width:700px; margin:0 auto; display:flex; flex-direction:column; gap:15px;">
            <input type="text" name="url" placeholder="example.com" required
                value="<?php echo htmlspecialchars($url); ?>"
                style="width:100%; padding:18px; border-radius:15px; background:rgba(255,255,255,0.05); color:white; border:1px solid #444;">
            <div style="display:flex; gap:10px;">
                <input type="text" name="keyword" placeholder="Target Keyword (Optional)"
                    value="<?php echo htmlspecialchars($keyword); ?>"
                    style="flex-grow:1; padding:15px; border-radius:15px; background:rgba(255,255,255,0.05); color:white; border:1px solid #444;">
                <button type="submit" class="cta-btn">Analyze <i class="fas fa-bolt"></i></button>
            </div>
        </form>
    </section>

    <?php if ($url && !$error): ?>
        <section class="container panel" style="max-width:1100px; margin:0 auto 100px;">
            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:40px; margin-bottom:50px; align-items:center;">
                <div
                    style="text-align:center; background:rgba(255,255,255,0.02); padding:30px; border-radius:20px; border:1px solid #333;">
                    <h3 style="margin-bottom:15px;">Audit Score</h3>
                    <div style="position:relative; width:180px; height:180px; margin:0 auto;">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                            <path class="circle-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path class="circle" stroke-dasharray="<?php echo $globalScore; ?>, 100"
                                stroke="<?php echo $globalScore > 70 ? '#25d366' : '#ff4757'; ?>"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div
                            style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:2.5rem; font-weight:800;">
                            <?php echo $globalScore; ?>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Audit Report for: <?php echo htmlspecialchars($url); ?></h2>
                    <p>Page Type: <strong><?php echo $pageTypeLabel; ?></strong></p>

                    <!-- Inline Lead Form -->
                    <div id="leadCaptureZone"
                        style="margin-top:20px; padding:20px; background:rgba(124,92,255,0.1); border-radius:15px; border:1px solid rgba(124,92,255,0.2);">
                        <?php if (!isset($_COOKIE['fu_lead_captured'])): ?>
                            <form id="inlineLeadForm" onsubmit="handleLeadSubmit(event)"
                                style="display:flex; gap:10px; flex-wrap:wrap;">
                                <input type="email" id="leadEmail" placeholder="Business email to unlock PDF" required
                                    style="flex-grow:1; padding:12px; border-radius:10px; background:rgba(0,0,0,0.2); color:white; border:1px solid #444;">
                                <button type="submit" id="submitBtn" class="cta-btn secondary">Save PDF Report</button>
                            </form>
                            <p style="font-size:0.75rem; color:rgba(255,255,255,0.5); margin-top:8px;">
                                <i class="fas fa-lock"></i> Report is gated. Enter email to generate your PDF roadmap.
                            </p>
                        <?php else: ?>
                            <button onclick="window.print()" class="cta-btn secondary"><i class="fas fa-print"></i> Generate PDF
                                Report</button>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- Priority Fixes Dashboard -->
            <div
                style="margin-bottom:40px; padding:25px; background:rgba(255, 71, 87, 0.05); border:1px solid rgba(255, 71, 87, 0.2); border-radius:16px;">
                <h3 style="margin:0 0 15px 0; font-size:1.2rem; color:#ff4757; display:flex; align-items:center; gap:10px;">
                    <i class="fas fa-exclamation-triangle"></i> Major Issues Found
                </h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:15px;">
                    <?php
                    $majorCount = 0;
                    $criticalKeys = ['ssl', 'robots_txt', 'title', 'meta_desc', 'h1', 'broken_links', 'viewport', 'image_alt'];
                    foreach ($criticalKeys as $ck) {
                        if (isset($auditResults[$ck]) && !$auditResults[$ck]['pass']) {
                            $majorCount++;
                            echo '<div style="background:rgba(0,0,0,0.2); padding:12px 15px; border-radius:10px; border-left:3px solid #ff4757; font-size:0.85rem;"><strong>' . $auditResults[$ck]['label'] . '</strong>: ' . $auditResults[$ck]['desc'] . '</div>';
                        }
                    }
                    if ($majorCount === 0)
                        echo '<div style="color:#25d366;">No critical technical errors!</div>';
                    ?>
                </div>
            </div>

            <!-- Detailed Check Sections -->
            <?php foreach ($categories as $catKey => $cat): ?>
                <div style="margin-top:40px;">
                    <h3 style="margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
                        <i class="fas <?php echo $cat['icon']; ?>" style="color:var(--accent); margin-right:10px;"></i>
                        <?php echo $cat['title']; ?>
                    </h3>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
                        <?php foreach ($auditResults as $key => $res):
                            if ($res['category'] !== $catKey)
                                continue; ?>
                            <div class="checklist-item <?php echo $res['pass'] ? 'pass' : 'fail'; ?>"
                                style="display:flex; flex-direction:column; gap:10px;">
                                <div style="display:flex; justify-content:space-between; align-items:start;">
                                    <strong><?php echo $res['label']; ?></strong>
                                    <i class="fas <?php echo $res['pass'] ? 'fa-check-circle' : 'fa-times-circle'; ?>"
                                        style="color:<?php echo $res['pass'] ? '#25d366' : '#ff4757'; ?>;"></i>
                                </div>
                                <p class="small muted" style="margin:0;"><?php echo $res['desc']; ?></p>
                                <?php if (isset($detailedFindings[$key])): ?>
                                    <button
                                        onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'"
                                        style="background:none; border:none; color:var(--accent); font-size:0.75rem; text-align:left; cursor:pointer; padding:0;">
                                        Show More <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div
                                        style="display:none; font-size:0.75rem; color:rgba(255,255,255,0.6); margin-top:5px; border-top:1px solid rgba(255,255,255,0.05); padding-top:5px;">
                                        <?php echo implode('<br>', array_map('htmlspecialchars', $detailedFindings[$key])); ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>

            <div class="print-footer"
                style="display:none; margin-top:50px; text-align:center; border-top:1px solid #444; padding-top:20px;">
                <p>Generated by Rahul Agarwal - Fundaking Media | fundaking.com</p>
                <p>Audit performed on: <?php echo date('F j, Y, g:i a'); ?></p>
            </div>
        </section>
    <?php elseif ($error): ?>
        <p style="text-align:center; color:#ff4757; padding:50px;"><?php echo $error; ?></p>
    <?php endif; ?>
</main>

<script>
    function handleLeadSubmit(e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const email = document.getElementById('leadEmail').value;
        btn.disabled = true; btn.innerHTML = 'Saving...';

        const fd = new FormData();
        fd.append('action', 'save_lead');
        fd.append('email', email);
        fd.append('audited_url', '<?php echo $url; ?>');
        fd.append('score', '<?php echo $globalScore; ?>');
        fd.append('issues', '<?php echo count(array_filter($auditResults, function ($r) {
            return !$r["pass"];
        })); ?>');

        fetch('/eeat-grader', { method: 'POST', body: fd })
            .then(() => {
                window.print();
                document.getElementById('leadCaptureZone').innerHTML = `
                <button onclick="window.print()" class="cta-btn secondary"><i class="fas fa-print"></i> Generate PDF Report</button>
                <p style="color:#25d366; font-size:0.8rem; margin-top:5px;"><i class="fas fa-check"></i> Email saved. You can now download the PDF manually if needed.</p>
            `;
            })
            .catch(() => { window.print(); });
    }
</script>

<?php include 'includes/footer.php'; ?>