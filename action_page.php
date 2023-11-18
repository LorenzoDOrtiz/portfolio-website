<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $fname = $_POST["firstname"];
    $lname = $_POST["lastname"];
    $subject = $_POST["subject"];

    // You can add additional processing or validation here

    // Send an email (you may need to configure your server for this)
    $to = "contact@lorenzodortiz.com"; // Replace with your email address
    $subject = "New Contact Form Submission";
    $message = "First Name: $fname\nLast Name: $lname\nSubject: $subject";
    $headers = "From: $fname $lname <$to>";

    mail($to, $subject, $message, $headers);

    // Redirect to a thank you page or display a thank you message
    header("Location: thank_you.html");
    exit();
}
?>
