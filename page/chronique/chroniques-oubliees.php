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
        "annonce-HRP.mp3", "Aura-magic.mp3", "boule-de-feu.mp3", "Bruit-de-vent.mp3",
        "Chauvesouris.mp3", "Corne.mp3", "coup-de-feu.mp3", "coup-dépée.mp3",
        "coup-dépée-sanglant.mp3", "Cracha-de-flamme.mp3", "crie-dhomme.mp3",
        "crie-femme.mp3", "Eboulement.mp3", "Electriciter.mp3",
        "levelUP.mp3", "Passage-secret.mp3", "Portail-magic.mp3", "Porte-métalique.mp3",
        "Reniflement.mp3", "Rugissement.mp3", "Siflotement.mp3", "Tonner.mp3",
        "Verre-casser.mp3", "Bruit-de-nuit.mp3", "hurlemenent-de-rage.mp3",
        "hurlement-de-loups.mp3", "invisible.mp3",
        "Machine-Mecanique.mp3", "aplaudissement.mp3", "Porte-qui-grince.mp3",
        "Grincement-bois.mp3", "artefact.mp3", "Crie-de-groupe.mp3", "flèche.mp3",
        "Volée-de-flèche.mp3", "Onde-De-Choc.mp3", "soupir-mortelle.mp3", "coeur-battant.mp3",
        "attack-mental.mp3"
    ];
    
    $basePath = "/page/chronique/sound-and-picture/";
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Soundboard pour JDR fantasy</title>
    <meta name="Soundboard pour JDR fantasy avec ambiance pour jeux de rôle" content="Soudboard et ambiance">
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
        <img src="/page/chronique/fonddécran.jpg" class="rempli"> 
    </div>

    <div class="bargauche">             
        <div class="logo">
            <img src="/page/chronique/titre.png" class="titre">
            <img src="/page/chronique/blason.png" class="blason">
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
                    $imagePath = "/page/chronique/sound-and-picture/" . $fileName . ".webp"; 
                    $displayName = str_replace("-", " ", $fileName);
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
            <iframe class="lecteurvideo" id="firstvod" src="https://www.youtube.com/embed/kmCAm4_hlyQ?si=EOpU7D3ToojPa3O3" title="YouTube video player" alt="Pluie tranquille"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/pGw2ztHACxA?si=NW7znEi7gqkNIsmG" title="YouTube video player" alt="Musique de combat"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/vyg5jJrZ42s?si=FJn-m0n9B7Pbdu8F" title="YouTube video player" alt="Ambiance de taverne"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/aQqRSBMzDrU?si=kGM9uk6nCySWCG5E" title="YouTube video player" alt="Bruit de forêt vivante"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/bxoRRobHtGM?si=rJIdGYMJDH__guPg" title="YouTube video player" alt="Ambiance exploration de dongon"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/017yCQMfbzE?si=lNjMIU21rr020aVT" title="YouTube video player" alt="Ambiance inquitante"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/sHA_4wfQhE8" title="YouTube video player" alt="Debut de jdr"></iframe>
        </div> 
    </div>
    
    <script src="/asset/scripts/script-front.js"></script>

</body>
</html>



