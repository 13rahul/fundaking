<?php
/**
 * Lightweight mail sender for Hostinger.
 * Prefers authenticated SMTP when password is set; falls back to PHP mail().
 */

function fk_mail_config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $cfg = require __DIR__ . '/mail-config.php';
    }
    return $cfg;
}

/**
 * @param array{to?:string,subject:string,body:string,reply_to?:string,html?:bool} $msg
 * @return array{ok:bool,via:string,error?:string}
 */
function fk_send_mail(array $msg): array
{
    $cfg = fk_mail_config();
    $to = $msg['to'] ?? $cfg['to'];
    $subject = $msg['subject'] ?? 'Fundaking enquiry';
    $body = $msg['body'] ?? '';
    $replyTo = $msg['reply_to'] ?? '';
    $isHtml = !empty($msg['html']);
    $fromEmail = $cfg['from_email'];
    $fromName = $cfg['from_name'];

    $smtp = $cfg['smtp'] ?? [];
    $password = trim((string) ($smtp['password'] ?? ''));

    if ($password !== '') {
        $result = fk_smtp_send([
            'host' => $smtp['host'] ?? 'smtp.hostinger.com',
            'port' => (int) ($smtp['port'] ?? 465),
            'encryption' => $smtp['encryption'] ?? 'ssl',
            'username' => $smtp['username'] ?? $fromEmail,
            'password' => $password,
            'from_email' => $fromEmail,
            'from_name' => $fromName,
            'to' => $to,
            'reply_to' => $replyTo,
            'subject' => $subject,
            'body' => $body,
            'html' => $isHtml,
        ]);
        if ($result['ok']) {
            return $result;
        }
        // Fall through to mail() if SMTP fails
        $smtpError = $result['error'] ?? 'smtp failed';
    }

    $headers = [];
    $headers[] = 'From: ' . fk_mail_encode_address($fromName, $fromEmail);
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: ' . ($isHtml ? 'text/html' : 'text/plain') . '; charset=UTF-8';
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    $headers[] = 'X-Mailer: Fundaking-Mail/1.0';

    $ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
    if ($ok) {
        return ['ok' => true, 'via' => 'mail'];
    }
    return [
        'ok' => false,
        'via' => 'none',
        'error' => isset($smtpError) ? "smtp: {$smtpError}; mail() failed" : 'mail() failed',
    ];
}

function fk_mail_encode_address(string $name, string $email): string
{
    $safe = trim(preg_replace('/[\r\n]+/', '', $name));
    if ($safe === '') {
        return $email;
    }
    return '=?UTF-8?B?' . base64_encode($safe) . '?= <' . $email . '>';
}

/**
 * Minimal SMTP client (AUTH LOGIN) — no Composer dependency.
 */
function fk_smtp_send(array $o): array
{
    $host = $o['host'];
    $port = $o['port'];
    $enc = strtolower((string) $o['encryption']);
    $remote = ($enc === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;

    $errno = 0;
    $errstr = '';
    $fp = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$fp) {
        return ['ok' => false, 'via' => 'smtp', 'error' => "connect: {$errstr} ({$errno})"];
    }
    stream_set_timeout($fp, 20);

    $read = function () use ($fp) {
        $data = '';
        while ($line = fgets($fp, 515)) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $cmd = function (string $line, string $expect) use ($fp, $read) {
        fwrite($fp, $line . "\r\n");
        $resp = $read();
        if (strpos($resp, $expect) !== 0) {
            return $resp;
        }
        return true;
    };

    $banner = $read();
    if (strpos($banner, '220') !== 0) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'bad banner: ' . trim($banner)];
    }

    $ehloHost = 'fundaking.com';
    $r = $cmd('EHLO ' . $ehloHost, '250');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'EHLO: ' . trim((string) $r)];
    }

    if ($enc === 'tls') {
        $r = $cmd('STARTTLS', '220');
        if ($r !== true) {
            fclose($fp);
            return ['ok' => false, 'via' => 'smtp', 'error' => 'STARTTLS: ' . trim((string) $r)];
        }
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($fp);
            return ['ok' => false, 'via' => 'smtp', 'error' => 'TLS handshake failed'];
        }
        $r = $cmd('EHLO ' . $ehloHost, '250');
        if ($r !== true) {
            fclose($fp);
            return ['ok' => false, 'via' => 'smtp', 'error' => 'EHLO2: ' . trim((string) $r)];
        }
    }

    $r = $cmd('AUTH LOGIN', '334');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'AUTH: ' . trim((string) $r)];
    }
    $r = $cmd(base64_encode($o['username']), '334');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'USER: ' . trim((string) $r)];
    }
    $r = $cmd(base64_encode($o['password']), '235');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'PASS: auth failed'];
    }

    $r = $cmd('MAIL FROM:<' . $o['from_email'] . '>', '250');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'MAIL FROM: ' . trim((string) $r)];
    }
    $r = $cmd('RCPT TO:<' . $o['to'] . '>', '250');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'RCPT TO: ' . trim((string) $r)];
    }
    $r = $cmd('DATA', '354');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'DATA: ' . trim((string) $r)];
    }

    $ctype = !empty($o['html']) ? 'text/html' : 'text/plain';
    $headers = [
        'Date: ' . date('r'),
        'From: ' . fk_mail_encode_address($o['from_name'], $o['from_email']),
        'To: <' . $o['to'] . '>',
        'Subject: =?UTF-8?B?' . base64_encode($o['subject']) . '?=',
        'MIME-Version: 1.0',
        'Content-Type: ' . $ctype . '; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    if (!empty($o['reply_to']) && filter_var($o['reply_to'], FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $o['reply_to'];
    }

    $data = implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n.", "\n..", $o['body']) . "\r\n.";
    $r = $cmd($data, '250');
    if ($r !== true) {
        fclose($fp);
        return ['ok' => false, 'via' => 'smtp', 'error' => 'body: ' . trim((string) $r)];
    }
    $cmd('QUIT', '221');
    fclose($fp);
    return ['ok' => true, 'via' => 'smtp'];
}

/**
 * SMTP readiness (does not send mail; does not expose password).
 */
function fk_mail_status(): array
{
    $cfg = fk_mail_config();
    $smtp = $cfg['smtp'] ?? [];
    $hasPass = trim((string) ($smtp['password'] ?? '')) !== '';
    return [
        'to' => $cfg['to'],
        'from' => $cfg['from_email'],
        'smtp_host' => $smtp['host'] ?? '',
        'smtp_port' => (int) ($smtp['port'] ?? 0),
        'smtp_auth_configured' => $hasPass,
        'transport' => $hasPass ? 'smtp' : 'mail_fallback',
    ];
}
