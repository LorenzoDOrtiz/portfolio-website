<?php
// Load environment variables from config.bash
$configFile = __DIR__ . './config.bash';
$configLines = explode("\n", file_get_contents($configFile));

foreach ($configLines as $line) {
    if (preg_match('/^\s*export\s+([^=]+)=(.*)$/', $line, $matches)) {
        putenv($matches[1] . '=' . $matches[2]);
    }
}

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
 
try {
    // Server settings
    $mail->isSMTP();                // Send using SMTP
    $mail->Host       = getenv('SMTP_HOST');  // Set the SMTP server to send through
    $mail->SMTPAuth   = true;        // Enable SMTP authentication
    $mail->Username   = getenv('SMTP_USERNAME');  // SMTP username
    $mail->Password   = getenv('SMTP_PASSWORD');  // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
    $mail->Port       = 465;         // ENCRYPTION_SMTPS 465 - TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // Recipients
    $mail->setFrom('contact@lorenzodortiz.com', 'Portfolio');
    $mail->addAddress('contact@lorenzodortiz.com', 'Portfolio');  // Add a recipient
    $mail->addReplyTo('contact@lorenzodortiz.com', 'Portfolio');

    // Attachments

    // Content
    $mail->isHTML(true);  // Set email format to HTML

    // Retrieve the form fields
    $firstname = $_POST['firstname'];
    $lastname  = $_POST['lastname'];
    $subject   = $_POST['subject'];
    $message   = $_POST['message'];

    // Set the email subject and body
    $mail->Subject = $subject;
    $mail->Body    = "First Name: $firstname<br>Last Name: $lastname<br>Subject: $subject<br>Message: $message";
    $mail->AltBody = "First Name: $firstname\nLast Name: $lastname\nSubject: $subject\nMessage: $message";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
