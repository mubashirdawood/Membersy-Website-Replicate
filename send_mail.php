<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer files
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // --- SERVER SETTINGS ---
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mubashirdawood05@gmail.com'; // Your email
        $mail->Password   = 'ccsmsmqfyrlxftfu';           // Your App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // --- RECIPIENTS ---
        $mail->setFrom('mubashirdawood05@gmail.com', 'Website Contact');
        $mail->addAddress('mubashirdawood05@gmail.com'); // Where you receive the mail

        // --- EMAIL CONTENT ---
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Message';

        // Capture data from your HTML fields
        $name    = htmlspecialchars($_POST['user_name']);
        $email   = htmlspecialchars($_POST['user_email']);
        $message = nl2br(htmlspecialchars($_POST['user_message']));

        $mail->Body = "
            <h2>New Message Received</h2>
            <p><b>Name:</b> $name</p>
            <p><b>Email:</b> $email</p>
            <p><b>Message:</b><br>$message</p>
        ";

        $mail->send();
        
        // Success Message
        echo "
        <div style='font-family: Arial; text-align: center; margin-top: 50px;'>
            <h1 style='color: #28a745;'>Success!</h1>
            <p>Thank you, $name. Your message has been sent to Mubashir.</p>
            <a href='index.html' style='color: #007bff;'>Go back to form</a>
        </div>";

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    header("Location: index.html");
    exit();
}
?>