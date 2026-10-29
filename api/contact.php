<?php
/**
 * Contact / enquiry form endpoint.
 * POST JSON or form-urlencoded → email to configured recipient (Gmail).
 */
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/fk-mail.php';

// GET = status check (no secrets)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['ok' => true, 'mail' => fk_mail_status()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$json = json_decode($raw ?: '', true);
$input = is_array($json) ? $json : $_POST;

// Honeypot
if (!empty($input['website']) || !empty($input['company_url_hp'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$phone = trim((string) ($input['phone'] ?? $input['tel'] ?? ''));
$website = trim((string) ($input['site'] ?? $input['website_url'] ?? $input['url'] ?? ''));
$message = trim((string) ($input['message'] ?? $input['why_applying'] ?? ''));
$source = trim((string) ($input['source'] ?? 'contact'));

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Valid name and email are required']);
    exit;
}

// Basic rate file (per IP, 1 / 60s)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = dirname(__DIR__) . '/data';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0755, true);
}
$rateFile = $rateDir . '/contact-rate.json';
$rates = [];
if (is_file($rateFile)) {
    $rates = json_decode((string) file_get_contents($rateFile), true) ?: [];
}
$now = time();
$rates = array_filter($rates, fn($t) => ($now - (int) $t) < 3600);
if (isset($rates[$ip]) && ($now - (int) $rates[$ip]) < 60) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Please wait a minute before sending again']);
    exit;
}
$rates[$ip] = $now;
@file_put_contents($rateFile, json_encode($rates));

$cfg = fk_mail_config();
$subject = 'New enquiry [' . $source . ']: ' . $name;
$lines = [
    'New Fundaking form submission',
    '-----------------------------',
    'Source: ' . $source,
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : '—'),
    'Website: ' . ($website !== '' ? $website : '—'),
    'Message:',
    $message !== '' ? $message : '—',
    '',
    'IP: ' . $ip,
    'Time: ' . date('c'),
];

$result = fk_send_mail([
    'to' => $cfg['to'],
    'subject' => $subject,
    'body' => implode("\n", $lines),
    'reply_to' => $email,
]);

// Also append CSV backup
$csv = $rateDir . '/contact-leads.csv';
$isNew = !is_file($csv);
$fp = @fopen($csv, 'a');
if ($fp) {
    if ($isNew) {
        fputcsv($fp, ['Timestamp', 'Source', 'Name', 'Email', 'Phone', 'Website', 'Message', 'MailOk', 'Via']);
    }
    fputcsv($fp, [
        date('Y-m-d H:i:s'),
        $source,
        $name,
        $email,
        $phone,
        $website,
        $message,
        $result['ok'] ? '1' : '0',
        $result['via'] ?? '',
    ]);
    fclose($fp);
}

if (!$result['ok']) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send email. Please WhatsApp +91 84210 53710.']);
    exit;
}

echo json_encode(['ok' => true, 'via' => $result['via']]);
