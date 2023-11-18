<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $fname = $_POST['firstname'];
    $lname = $_POST['lastname'];
    $subject = $_POST['subject'];

    // Create email message
    $message = "First Name: $fname\n";
    $message .= "Last Name: $lname\n";
    $message .= "Subject: $subject\n";

    // Set recipient email address
    $to = "contact@lorenzodortiz.com";

    // Set email subject
    $subject = "New Contact Form Submission";

    // Set additional headers
    $headers = "From: $fname $lname <$to>";

    // Attempt to send the email
    if (mail($to, $subject, $message, $headers)) {
        // Email sent successfully
        $response = array('status' => 'success', 'message' => 'Message sent successfully!');
    } else {
        // Email sending failed
        $response = array('status' => 'error', 'message' => 'Failed to send message. Please try again.');
    }

    // Convert the response array to JSON
    echo json_encode($response);
} else {
    // Redirect to the homepage if accessed directly
    header("Location: /");
    exit();
}
?>
