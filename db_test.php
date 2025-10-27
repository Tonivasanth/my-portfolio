<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "portfolio_db");

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES ('Test User', 'test@example.com', 'DB Test', 'Testing insert')";
if ($conn->query($sql) === TRUE) {
    echo "✅ Database insert successful!";
} else {
    echo "⚠️ Error: " . $conn->error;
}

$conn->close();
?>
