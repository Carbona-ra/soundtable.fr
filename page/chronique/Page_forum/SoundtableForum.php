
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Salon de discussion</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/page/chronique/Page_forum/style2.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=UnifrakturCook&display=swap"> 
</head>
<body>
    <div class="arrière">
        <img src="/page/chronique/fonddécran.jpg" class="rempli">   
    </div>    
    <div class="container">
        <a href="/page/chronique/chroniques-oubliees.php">
            <button id="flop" class="align-top">Retourner sur la Soundboard</button> 
        </a>
    </div>

    <form id="messageForm" method="POST" action="">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" required>
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <input type="hidden" id="date" name="date" value="<?= date('Y-m-d H:i:s') ?>">
        <button type="submit">Envoyer</button>
    </form>

    <?php
    require 'forum.php'; 

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $message = $_POST['message'];
    
        insertDiscussion($conn, $username, $message);
    }
    ?>
    <div id="messages">
        <?php getDiscussions($conn); ?>
    </div>

    <audio id="notificationSound" preload="auto">
        <source src="/page/chronique/Audio_avec_leur_image/annonceHRP.mp3" type="audio/mp3">
    </audio>
</body>
</html>
