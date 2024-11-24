<?php

// Create connection
try {
    $conn = new PDO('mysql:host=soundti348.mysql.db;dbname=soundti348;charset=utf8', 'soundti348', 'Juhuhujuh1');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<script>console.log('Connection to the database was successful.');</script>";
} catch (PDOException $e) {
    echo "<script>console.log('Connection to the database failed.');</script>";
    die("Erreur : " . $e->getMessage());
}

// Function to get discussions
function getDiscussions($conn) {
    $sql = "SELECT * FROM Discussions ORDER BY date DESC";
    $stmt = $conn->query($sql);

    if ($stmt->rowCount() > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo '<div class="message-sender">';
            echo "<strong>User:</strong> " . htmlspecialchars($row["username"]) . "<br>";
            echo "<strong>Message:</strong> " . htmlspecialchars($row["message"]) . "<br>";
            echo htmlspecialchars($row["date"]);
            echo '</div>';
        }
    } else {
        echo "0 results";
    }
}

// Function to insert a new discussion
function insertDiscussion($conn, $username, $message) {
    $sql = "INSERT INTO Discussions (username, message) VALUES (:username, :message)";
    $stmt = $conn->prepare($sql);
    
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':message', $message);

    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->errorInfo()[2];
    }
}

?>
