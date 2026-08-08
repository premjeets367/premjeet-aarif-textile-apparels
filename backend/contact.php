<?php
/**
 * contact.php
 * Handles the contact form submission from contact.html (AJAX POST via fetch).
 * Validates input server-side, saves to the `contact` table, returns JSON.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

function respond(bool $success, string $message, int $code = 200): void
{
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.', 405);
}

// ---- Collect & sanitize input ----
$name    = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');
$email   = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '');
$phone   = trim(filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');
$subject = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');

// ---- Server-side validation (mirrors js/script.js client validation) ----
$errors = [];

if (mb_strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if (!preg_match('/^[0-9+\-\s]{7,15}$/', $phone)) {
    $errors[] = 'A valid phone number is required.';
}
if (mb_strlen($subject) < 3) {
    $errors[] = 'Subject must be at least 3 characters.';
}
if (mb_strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters.';
}

if (!empty($errors)) {
    respond(false, implode(' ', $errors), 422);
}

// ---- Save to database ----
try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare(
        'INSERT INTO contact (name, email, phone, subject, message, created_at)
         VALUES (:name, :email, :phone, :subject, :message, NOW())'
    );
    $stmt->execute([
        ':name'    => $name,
        ':email'   => $email,
        ':phone'   => $phone,
        ':subject' => $subject,
        ':message' => $message,
    ]);

    respond(true, 'Thank you! Your message has been sent successfully. We will get back to you soon.');
} catch (PDOException $e) {
    error_log('Contact insert failed: ' . $e->getMessage());
    respond(false, 'Something went wrong while saving your message. Please try again.', 500);
}
