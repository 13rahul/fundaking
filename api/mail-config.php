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
    'to' => '13rahulagarwal@gmail.com',
    'from_email' => 'consult@fundaking.com',
    'from_name' => 'Fundaking Media',
    // Reply-To on notifications uses the visitor's address when available
    'smtp' => [
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl', // ssl (465) or tls (587)
        'username' => 'consult@fundaking.com',
        // Set password in mail-config.local.php on the server (never commit it)
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
