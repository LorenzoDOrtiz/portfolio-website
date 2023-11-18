<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$confirmation_message = ""; // Initialize the confirmation message variable

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $fname = $_POST["firstname"];
    $lname = $_POST["lastname"];
    $subject = $_POST["subject"];

    // You can add additional processing or validation here

    // Send an email (you may need to configure your server for this)
    $to = "contact@lorenzodortiz.com"; // Replace with your email address
    $email_subject = "New Contact Form Submission";
    $message = "First Name: $fname\nLast Name: $lname\nSubject: $subject";
    $headers = "From: $fname $lname <$to>";

    // Send email and check for success
    $success = mail($to, $email_subject, $message, $headers);

    // Check if email was sent successfully
    if ($success) {
        $confirmation_message = "Thank you! Your message has been sent successfully.";
    } else {
        $confirmation_message = "Error sending email. Please try again.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <!-- Add your CSS styles or link to an external stylesheet here -->
</head>
<body>

<?php echo $confirmation_message; ?>

<!-- Your HTML form goes here -->
<form method="post" action="your_php_script.php">
    <!-- form fields go here -->
    <label for="firstname">First Name:</label>
    <input type="text" id="firstname" name="firstname" required>

    <label for="lastname">Last Name:</label>
    <input type="text" id="lastname" name="lastname" required>

    <label for="subject">Subject:</label>
    <textarea id="subject" name="subject" required></textarea>

    <input type="submit" value="Submit">
</form>

<!-- Add any additional HTML content or scripts as needed -->

</body>
</html>
