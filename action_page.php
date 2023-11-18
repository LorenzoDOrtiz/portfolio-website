<?php
// Include the PHPMailer library
require 'vendor/autoload.php';

// Email configuration
$sender_email = 'contact@lorenzodortiz.com';
$sender_password = 'W2vZ0uiFUHPF&aa1';
$recipient_email = 'contact@lorenzodortiz.com';
$subject = 'Testing email script';
$body = 'This is a test email sent from a PHP script.';

// SMTP (sending) server details
$smtp_server = 'smtp.titan.email';
$smtp_port = 587;

// IMAP (receiving) server details
$imap_server = 'imap.titan.email';
$imap_port = 993;

function send_email() {
    global $sender_email, $sender_password, $recipient_email, $subject, $body, $smtp_server, $smtp_port, $imap_server, $imap_port;

    // Create a PHPMailer object
    $mail = new \PHPMailer\PHPMailer\PHPMailer();

    try {
        // Configure the SMTP settings
        $mail->isSMTP();
        $mail->Host = $smtp_server;
        $mail->Port = $smtp_port;
        $mail->SMTPAuth = true;
        $mail->Username = $sender_email;
        $mail->Password = $sender_password;
        $mail->SMTPSecure = 'tls';

        // Set the email content
        $mail->setFrom($sender_email);
        $mail->addAddress($recipient_email);
        $mail->Subject = $subject;
        $mail->Body = $body;

        // Debugging information
        $mail->SMTPDebug = 2;

        // Send the email
        if ($mail->send()) {
            echo 'Email sent successfully.';
        } else {
            echo 'Error sending email: ' . $mail->ErrorInfo;
            return;
        }

        // Append the sent email to the IMAP server's "Sent" folder
        $imap_stream = imap_open("{" . $imap_server . ":" . $imap_port . "/ssl/novalidate-cert}", $sender_email, $sender_password);
        if ($imap_stream) {
            imap_append($imap_stream, "{" . $imap_server . ":" . $imap_port . "/ssl/novalidate-cert}Sent", $mail->getSentMIMEMessage());
            echo 'Email appended to "Sent" folder.';
            imap_close($imap_stream);
        } else {
            echo 'Error appending email to "Sent" folder.';
        }
    } catch (Exception $e) {
        echo 'Error sending email: ' . $e->getMessage();
    }
}

// Call the function to send the email and append it to the "Sent" folder
send_email();
?>
