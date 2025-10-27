<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Replace with your real email
    $to = "your_email@example.com";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong> $message</p>
    ";

    // Optional: disable mail() during local testing
    // $mail_sent = mail($to, "Portfolio Contact: $subject", $body, $headers);
    $mail_sent = true;

    // ✅ Database connection
    $conn = new mysqli("localhost", "root", "", "portfolio_db");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // ✅ Safe database insert
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    if ($stmt->execute()) {
        echo "✅ Message sent and saved successfully!";
    } else {
        echo "⚠️ Database error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
