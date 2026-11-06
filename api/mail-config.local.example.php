<?php
/**
 * Copy to mail-config.local.php on Hostinger (File Manager → api/) and set values.
 * Never commit this file — it is gitignored.
 * Hostinger → Emails → rahul@fundaking.com → Manage → password.
 */
return [
    'to' => 'rahul@fundaking.com',
    'from_email' => 'rahul@fundaking.com',
    'from_name' => 'Fundaking Media',
    'smtp' => [
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl',
        'username' => 'rahul@fundaking.com',
        'password' => 'YOUR_HOSTINGER_MAILBOX_PASSWORD',
    ],
];
