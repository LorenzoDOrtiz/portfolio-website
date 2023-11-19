<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

require "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);

$mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "smtp.titan.email";
$mail->SMTPSecure = PHPMailer::SSL;
$mail->Port = 465;

$mail->Username = "contact@lorenzodortiz.com";
$mail->Password = "69Zhe!as*sDrAilA";

$mail->setFrom($email, $name);
$mail->addAddress("contact@lorenzodortiz.comm", "Portfolio");

$mail->Subject = $subject;
$mail->Body = $message;

$mail->send();

header("Location: sent.html");