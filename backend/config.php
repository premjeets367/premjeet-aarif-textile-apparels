<?php
/**
 * config.php
 * Central configuration for the Textile & Apparels backend.
 * Update these values to match your local XAMPP / MySQL setup.
 */

// ---- Database Credentials ----
define('DB_HOST', 'localhost');
define('DB_NAME', 'textile');
define('DB_USER', 'root');
define('DB_PASS', '');

// ---- Site Settings ----
define('SITE_NAME', 'Textile & Apparels');
define('ADMIN_SESSION_KEY', 'textile_admin_logged_in');

// ---- Error Reporting (disable in production) ----
error_reporting(E_ALL);
ini_set('display_errors', 0); // never leak errors to the browser; log instead
ini_set('log_errors', 1);

// ---- Session ----
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ---- Timezone ----
date_default_timezone_set('Asia/Kolkata');
