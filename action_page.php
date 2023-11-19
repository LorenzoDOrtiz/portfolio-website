<?php
// Load environment variables from config.bash
$configFile = __DIR__ . '/config.bash'; // corrected path
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
    $mail->isSMTP(); // Send using SMTP
    $mail->Host       = getenv('SMTP_HOST'); // Set the SMTP server to send through
    $mail->SMTPAuth   = true; // Enable SMTP authentication
    $mail->Username   = getenv('SMTP_USERNAME'); // SMTP username
    $mail->Password   = getenv('SMTP_PASSWORD'); // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use STARTTLS encryption
    $mail->Port       = 587; // Use port 587 for STARTTLS

    // Recipients
    $mail->setFrom('contact@lorenzodortiz.com', 'Portfolio');
    $mail->addAddress('contact@lorenzodortiz.com', 'Portfolio'); // Add a recipient
    $mail->addReplyTo('contact@lorenzodortiz.com', 'Portfolio');

    // Attachments

    // Content
    $mail->isHTML(true); // Set email format to HTML

    // Retrieve the form fields using $_POST
    $firstname = isset($_POST['firstname']) ? $_POST['firstname'] : '';
    $lastname  = isset($_POST['lastname']) ? $_POST['lastname'] : '';
    $subject   = isset($_POST['subject']) ? $_POST['subject'] : '';
    $message   = isset($_POST['message']) ? $_POST['message'] : '';

    // Add input validation if needed

    // Set the email subject and body
    $mail->Subject = $subject;
    $mail->Body    = "First Name: $firstname<br>Last Name: $lastname<br>Subject: $subject<br>Message: $message";
    $mail->AltBody = "First Name: $firstname\nLast Name: $lastname\nSubject: $subject\nMessage: $message";

    // Enable SMTP debugging (comment out in production)
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;

    $mail->send();

    // Log success to a file
    $logMessage = "Message sent successfully. Subject: $subject, Recipient: contact@lorenzodortiz.com";
    error_log($logMessage, 3, 'log/logfile.txt');

    echo 'Message has been sent';
} catch (Exception $e) {
    // Log error to a file
    $errorMessage = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    error_log($errorMessage, 3, 'log/logfile.txt');

    echo $errorMessage;
}
?>
