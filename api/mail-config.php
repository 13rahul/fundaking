<?php
/**
 * Fundaking Media — outbound mail config (Hostinger).
 *
 * Lead notifications always go to $to.
 * Optional override: create api/mail-config.local.php that returns an array
 * (same keys) with smtp.password set — that file is gitignored.
 */
$cfg = [
    // Where form / lead emails are delivered
    'to' => 'rahul@fundaking.com',
    'from_email' => 'rahul@fundaking.com',
    'from_name' => 'Fundaking Media',
    // Reply-To on notifications uses the visitor's address when available
    // SMTP password lives only in mail-config.local.php on Hostinger (gitignored)
    'smtp' => [
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl', // ssl (465) or tls (587)
        'username' => 'rahul@fundaking.com',
        'password' => '',
    ],
];

$local = __DIR__ . '/mail-config.local.php';
if (is_file($local)) {
    $override = include $local;
    if (is_array($override)) {
        $cfg = array_replace_recursive($cfg, $override);
    }
}

return $cfg;
