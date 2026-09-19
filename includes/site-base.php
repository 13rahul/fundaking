<?php
/**
 * Prefix root-absolute URLs when the site is served from /fundaking on local XAMPP.
 * Production (fundaking.com) keeps $siteBase empty.
 */
$siteBase = '';
$host = $_SERVER['HTTP_HOST'] ?? '';
$uri = $_SERVER['REQUEST_URI'] ?? '';
$script = $_SERVER['SCRIPT_NAME'] ?? '';
if (
    preg_match('/^(localhost|127\.0\.0\.1)(:\d+)?$/i', $host)
    && (preg_match('#^/fundaking(?:/|\?|$)#', $uri) || strpos(str_replace('\\', '/', $script), '/fundaking/') !== false)
) {
    $siteBase = '/fundaking';
}

if (!function_exists('fk_url')) {
    function fk_url($path)
    {
        global $siteBase;
        if ($path === null || $path === '') {
            return $siteBase !== '' ? $siteBase . '/' : '/';
        }
        if (
            strpos($path, 'http://') === 0
            || strpos($path, 'https://') === 0
            || strpos($path, 'mailto:') === 0
            || strpos($path, 'tel:') === 0
        ) {
            return $path;
        }
        if (isset($path[0]) && $path[0] === '#') {
            return $path;
        }
        if ($path[0] !== '/') {
            $path = '/' . $path;
        }
        return $siteBase . $path;
    }
}
