<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["coocky"])) {
        setcookie('blocknote1', $_POST['Bnote1'], time() + (86400 * 30), "/"); 
        setcookie('blocknote2', $_POST['Bnote2'], time() + (86400 * 30), "/");
        setcookie('blocknote3', $_POST['Bnote3'], time() + (86400 * 30), "/");
        setcookie('blocknote4', $_POST['Bnote4'], time() + (86400 * 30), "/");
        setcookie('blocknote5', $_POST['Bnote5'], time() + (86400 * 30), "/");
    
        header("Location: " . $_SERVER['PHP_SELF']);
        exit;
    }

    $mp3Files = [
        "Wookie.mp3",
        "Whosh-sabre-laser.mp3",
        "TIE.mp3",
        "Tir-TIE.mp3",
        "Speeder.mp3",
        "Speeders-survol.mp3",
        "Vaisseaux-survol.mp3",
        "Rire-narquois.mp3",
        "Ouverture-sabre-laser.mp3",
        "Impacte-de-blaster.mp3",
        "Homme-des-sables.mp3",
        "Grosse-explosion.mp3",
        "Fermeture-sabre-laser.mp3",
        "Explosion.mp3",
        "Electriciter-static.mp3",
        "Droide-qui-hurle.mp3",
        "Droide-pas-content.mp3",
        "Droide-intriger.mp3",
        "Creature-mourante.mp3",
        "Coup-de-sabre-laser.mp3",
        "Bombe-vibrante.mp3",
        "Blaster.mp3",
        "Bip-boup-bip.mp3",
        "Autruche-spacial.mp3",
        "Atterrissage.mp3",
        "Arc-electrique.mp3",
        "Appel-radio.mp3",
        "Alerte-imperiale.mp3"
    ];
    
    $basePath = "/page/starwars/sound-and-picture/";
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Soundboard pour JDR futuriste</title>
    <meta name="Soundboard pour JDR futuriste avec ambiance pour jeux de rôle" content="Soudboard et ambiance">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="icon" type="image/webp" href="/asset/favicon.webp">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/asset/style/style.css">
    <script src="https://www.youtube.com/iframe_api"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>

    <div class="arrière">
        <img src="/asset/bgstarwars.jpg" class="remplistarwars"> 
    </div>

    <div class="bargauche">             
        <div class="logo">
            <img src="/asset/textstarwars.webp" class="titrest">
            <img src="/asset/blasonStarwars.png" class="blasonst">
            <div class="boutonnave">        
                <!-- <a href="/page/chronique/Page_forum/SoundtableForum.php" aria-label="Aller au forum">
                <button class="align-top blink">Forum</button> 
                </a>  -->
                <a href="/" aria-label="Aller à la page d'acceuil">
                    <button class="nav-btn">Acceuil</button> 
                </a> 
                <button class="nav-btn" id="bloc-note-btn">Bloc note</button> 
            </div>
        </div>

        <div id="blocnote" class="z-10000">
            <div id="listdebloc">
                <button class="butbloc" onclick="afficherTextarea(0)">1</button>
                <button class="butbloc" onclick="afficherTextarea(1)">2</button>
                <button class="butbloc" onclick="afficherTextarea(2)">3</button>
                <button class="butbloc" onclick="afficherTextarea(3)">4</button>
                <button class="butbloc" onclick="afficherTextarea(4)">5</button>
            </div>
            <div id="blocafficher">
                <form method="post" id="noteForm">
                    <textarea class="textarea" name="Bnote1" placeholder="votre bloc note 1..."><?php echo isset($_COOKIE['blocknote1']) ? htmlentities($_COOKIE['blocknote1']) : ''; ?></textarea>
                    <textarea class="textarea" name="Bnote2" placeholder="votre bloc note 2..."><?php echo isset($_COOKIE['blocknote2']) ? htmlentities($_COOKIE['blocknote2']) : ''; ?></textarea>
                    <textarea class="textarea" name="Bnote3" placeholder="votre bloc note 3..."><?php echo isset($_COOKIE['blocknote3']) ? htmlentities($_COOKIE['blocknote3']) : ''; ?></textarea>
                    <textarea class="textarea" name="Bnote4" placeholder="votre bloc note 4..."><?php echo isset($_COOKIE['blocknote4']) ? htmlentities($_COOKIE['blocknote4']) : ''; ?></textarea>
                    <textarea class="textarea" name="Bnote5" placeholder="votre bloc note 5..."><?php echo isset($_COOKIE['blocknote5']) ? htmlentities($_COOKIE['blocknote5']) : ''; ?></textarea>
                    <input type="submit" class="audessumonpote" name='coocky' value="Sauvegarder" Alt="(Dans les coocki)">
                </form>
            </div>
            <script>
            document.getElementById("noteForm").addEventListener("submit", function(event) {
                event.preventDefault();
            });
            </script>
        </div>
    </div>


    <div class="bloc-central">
        <div class="header-central-bloc">
            <h1>Soundboard</h1> 
            <button  id="openmenuD" class="align-top">Générateur de dée</button>
            <div id="MenuDée">
                    <div id="LancerDeDée">
                        <div id="Nbdée">
                            <div>Combient de dée ?</div>
                            <button id="MoinsDeDée">-</button>
                            <p id="Nbchoisis">0</p>
                            <button id="PlusDeDée">+</button>
                        </div>    
                        <div id="TypeDeDée">
                            <div>Quel type de dées ?</div>
                            <select id="Typechoisie">
                                <option>4</option>
                                <option>6</option>
                                <option>8</option>
                                <option>10</option>
                                <option>12</option>
                                <option>20</option>
                            </select>
                        </div>
                    <button id="LancerDéeBoutton" class="align-top">Lancer !</button>
                </div>
            </div>
        </div>
        <div id="blocsound">

            <?php 
                foreach ($mp3Files as $file) {
                    $fileName = pathinfo($file, PATHINFO_FILENAME);
                    $filePath = $basePath . $file; 
                    $imagePath = "/page/starwars/sound-and-picture/" . $fileName . ".webp"; 
                    $displayName = str_replace("-", " ", $fileName); // Remplace les "-" par des espaces
                    ?>
                    <div class="buttoncontainer">
                        <button class="animbutton typo20px sound-button" data-sound="<?php echo htmlspecialchars($filePath); ?>" onclick="play_sound('<?php echo htmlspecialchars($filePath); ?>')">
                            <?php echo htmlspecialchars($displayName); ?>
                        </button>
                        <img class="imagebutton" src="<?php echo htmlspecialchars($imagePath); ?>" alt="<?php echo htmlspecialchars($fileName); ?>">
                    </div>
                    <?php
                }
            ?>
        </div>
    </div>
    
    <button id="btn-ambiance">> fermer menu</button> 
    <div class="bardroite">
        <h2 class="titre2">Ambiance</h2>  
         <div class="scrollable-section"> 
            <iframe class="lecteurvideo firstvod" id="player1" src="https://www.youtube.com/embed/7H8kDHEiuKU" title="YouTube video player" alt="Pluie tranquille"></iframe>
            <iframe  id="player2" class="lecteurvideo" src="https://www.youtube.com/embed/Ye1doOBI5KU" title="YouTube video player" alt="Musique de combat"></iframe>
            <iframe id="player3" class="lecteurvideo" src="https://www.youtube.com/embed/M9awpsfvDxY" title="YouTube video player" alt="Ambiance de taverne"></iframe>
            <iframe id="player4" class="lecteurvideo" src="https://www.youtube.com/embed/7IrLnBh2p4o" title="YouTube video player" alt="Bruit de forêt vivante"></iframe>
            <iframe id="player5" class="lecteurvideo" src="https://www.youtube.com/embed/_X1IsGW9ApU" title="YouTube video player" alt="Ambiance exploration de dongon"></iframe>
            <iframe id="player6" class="lecteurvideo" src="https://www.youtube.com/embed/Y069SX7CdiI" title="YouTube video player" alt="Ambiance inquitante"></iframe>
            <iframe id="player7" class="lecteurvideo" src="https://www.youtube.com/embed/41ak2jr55fE" title="YouTube video player" alt="Debut de jdr"></iframe>
        </div> 
    </div>
    <!-- <script>
        const videos = [
            { id: "7H8kDHEiuKU", title: "Pluie tranquille" },
            { id: "Ye1doOBI5KU", title: "Musique de combat" },
            { id: "M9awpsfvDxY", title: "Ambiance de taverne" },
            { id: "7IrLnBh2p4o", title: "Bruit de forêt vivante" },
            { id: "_X1IsGW9ApU", title: "Ambiance exploration de donjon" },
            { id: "Y069SX7CdiI", title: "Ambiance inquiétante" },
            { id: "41ak2jr55fE", title: "Début de JDR" }
        ];

        let players = [];

        function onYouTubeIframeAPIReady() {
            videos.forEach((video, index) => {
                players[index] = new YT.Player(`player${index + 1}`, {
                    height: '0', 
                    width: '100%',
                    videoId: video.id,
                    playerVars: {
                        'controls': 0,
                        'rel': 0,
                        'showinfo': 0
                    },
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            });
        }

        function onPlayerReady(event) {
            event.target.setVolume(20); // Volume à 20%
            event.target.playVideo();   // Lance la lecture automatiquement (optionnel)
        }
    </script> -->
    <script src="/asset/scripts/script-front.js"></script>

</body>
</html>



