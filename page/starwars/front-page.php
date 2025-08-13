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
        "Piston mécanique" => [
            "file" => "piston-mécanique.mp3",
            "image" => "piston-mécanique.webp",
            "categories" => ["vaisseau", "transport", "droïde", "machine"]
        ],
        "Combat spatial" => [
            "file" => "Combat-spacial.mp3",
            "image" => "guerre-spatial.webp",
            "categories" => ["vaisseau", "combat", "ambiance"]
        ],
        "Silence spatiale" => [
            "file" => "Silence-spacial.mp3",
            "image" => "silence-spatiale.webp",
            "categories" => ["vaisseau", "ambiance"]
        ],
        "Mystère" => [
            "file" => "Mystère.mp3",
            "image" => "mystère.webp",
            "categories" => ["ambiance"]
        ],
        "Vole en apesanteur" => [
            "file" => "Vole-en-apesanteur.mp3",
            "image" => "vole-stationaire.webp",
            "categories" => ["vaisseau", "ambiance"]
        ],
        "Bruit mécanique" => [
            "file" => "Bruits-mécaniques-2.mp3",
            "image" => "usine.webp",
            "categories" => ["ambiance", "machine"]
        ],
        "Clavier" => [
            "file" => "Clavier.mp3",
            "image" => "clavier-mécanique.webp",
            "categories" => ["ambiance", "empire"]
        ],
        "Alerte dépressurisation" => [
            "file" => "Alerte-dépréssion.mp3",
            "image" => "alerte.webp",
            "categories" => ["vaisseau", "empire","ambiance" ]
        ],
        "Radar" => [
            "file" => "Radart.mp3",
            "image" => "radar.webp",
            "categories" => ["vaisseau"]
        ],
        "Démarrage moteur" => [
            "file" => "Démarage-moteur.mp3",
            "image" => "démarage-moteur.webp",
            "categories" => ["vaisseau"]
        ],
        "Bruits-mécaniques" => [
            "file" => "Bruits-mécaniques.mp3",
            "image" => "atelier.webp",
            "categories" => ["machine", "ambiance"]
        ],
        "Silence mécanique" => [
            "file" => "Silence-mécanisé.mp3",
            "image" => "salle-vide.webp",
            "categories" => ["ambiance", "machine"]
        ],

        "TIE" => [
            "file" => "TIE.mp3",
            "image" => "TIE.webp",
            "categories" => ["vaisseau", "empire"]
        ],
        "Tir TIE" => [
            "file" => "Tir-TIE.mp3",
            "image" => "Tir-TIE.webp",
            "categories" => ["arme", "vaisseau", "empire"]
        ],
        "Speeder" => [
            "file" => "Speeder.mp3",
            "image" => "Speeder.webp",
            "categories" => ["vaisseau", "transport"]
        ],
        "Speeders Survol" => [
            "file" => "Speeders-survol.mp3",
            "image" => "Speeders-survol.webp",
            "categories" => ["vaisseau", "transport"]
        ],
        "Vaisseaux Survol" => [
            "file" => "Vaisseaux-survol.mp3",
            "image" => "Vaisseaux-survol.webp",
            "categories" => ["vaisseau"]
        ],
        
        "Atterrissage" => [
            "file" => "Atterrissage.mp3",
            "image" => "Atterrissage.webp",
            "categories" => ["vaisseau"]
        ],
        "Rire Narquois" => [
            "file" => "Rire-narquois.mp3",
            "image" => "Rire-narquois.webp",
            "categories" => ["humain", "émotion"]
        ],
        "Impacte de Blaster" => [
            "file" => "Impacte-de-blaster.mp3",
            "image" => "Impacte-de-blaster.webp",
            "categories" => ["arme", "blaster", "combat"]
        ],
        
        "Blaster" => [
            "file" => "Blaster.mp3",
            "image" => "Blaster.webp",
            "categories" => ["arme", "blaster", "combat"]
        ],
        "Homme des Sables" => [
            "file" => "Homme-des-sables.mp3",
            "image" => "Homme-des-sables.webp",
            "categories" => ["creature", "tatooine"]
        ],
        
        "Explosion" => [
            "file" => "Explosion.mp3",
            "image" => "Explosion.webp",
            "categories" => ["explosion", "combat"]
        ],
        "Grosse Explosion" => [
            "file" => "Grosse-explosion.mp3",
            "image" => "Grosse-explosion.webp",
            "categories" => ["explosion", "combat"]
        ],
        
        "Bombe Vibrante" => [
            "file" => "Bombe-vibrante.mp3",
            "image" => "Bombe-vibrante.webp",
            "categories" => ["arme", "explosion"]
        ],

        "Whosh Sabre Laser" => [
            "file" => "Whosh-sabre-laser.mp3",
            "image" => "Whosh-sabre-laser.webp",
            "categories" => ["arme", "sabre-laser"]
        ],
        "Fermeture Sabre Laser" => [
            "file" => "Fermeture-sabre-laser.mp3",
            "image" => "Fermeture-sabre-laser.webp",
            "categories" => ["arme", "sabre-laser"]
        ],
        "Ouverture Sabre Laser" => [
            "file" => "Ouverture-sabre-laser.mp3",
            "image" => "Ouverture-sabre-laser.webp",
            "categories" => ["arme", "sabre-laser"]
        ],
        
        "Coup de Sabre Laser" => [
            "file" => "Coup-de-sabre-laser.mp3",
            "image" => "Coup-de-sabre-laser.webp",
            "categories" => ["arme", "sabre-laser", "combat"]
        ],
        "Electricité Static" => [
            "file" => "Electriciter-static.mp3",
            "image" => "Electriciter-static.webp",
            "categories" => ["effet", "électricité"]
        ],
    
        "Arc Électrique" => [
            "file" => "Arc-electrique.mp3",
            "image" => "Arc-electrique.webp",
            "categories" => ["effet", "électricité"]
        ],
        "Droïde qui Hurle" => [
            "file" => "Droide-qui-hurle.mp3",
            "image" => "Droide-qui-hurle.webp",
            "categories" => ["droïde", "émotion"]
        ],
        "Droïde Pas Content" => [
            "file" => "Droide-pas-content.mp3",
            "image" => "Droide-pas-content.webp",
            "categories" => ["droïde", "émotion"]
        ],
        "Droïde Intrigué" => [
            "file" => "Droide-intriger.mp3",
            "image" => "Droide-intriger.webp",
            "categories" => ["droïde", "émotion"]
        ],
        "Créature Mourante" => [
            "file" => "Creature-mourante.mp3",
            "image" => "Creature-mourante.webp",
            "categories" => ["creature", "combat"]
        ],
        "Wookie" => [
            "file" => "Wookie.mp3",
            "image" => "Wookie.webp",
            "categories" => ["creature", "wookie"]
        ],
        
        "Autruche Spacial" => [
            "file" => "Autruche-spacial.mp3",
            "image" => "Autruche-spacial.webp",
            "categories" => ["creature"]
        ],
        "Bip Boup Bip" => [
            "file" => "Bip-boup-bip.mp3",
            "image" => "Bip-boup-bip.webp",
            "categories" => ["droïde", "communication"]
        ],
        "Appel Radio" => [
            "file" => "Appel-radio.mp3",
            "image" => "Appel-radio.webp",
            "categories" => ["communication", "empire"]
        ],
        "Alerte Impériale" => [
            "file" => "Alerte-imperiale.mp3",
            "image" => "Alerte-imperiale.webp",
            "categories" => ["communication", "empire"]
        ]
    ];

     // Récupérer toutes les catégories uniques
     $allCategories = [];
     foreach ($mp3Files as $details) {
         if (isset($details['categories'])) {
             $allCategories = array_merge($allCategories, $details['categories']);
         }
     }
     $allCategories = array_unique($allCategories);
     sort($allCategories);
    
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
    <link rel="icon" type="image/webp" href="/asset/favicon2.webp">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/asset/style/style.css">
    <script src="https://www.youtube.com/iframe_api"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
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
                </form>
            </div>
        </div>
    </div>


    <div class="bloc-central">
        <div class="header-central-bloc">
            <h1>Soundboard</h1> 
            <button id="stop-sounds-btn" class="align-top">🔇 Couper les bruitages</button>
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
            foreach ($mp3Files as $displayName => $details) {
                $filePath = $basePath . $details['file'];
                $imagePath = $basePath . $details['image'];
                $categories = implode(',', $details['categories']);
                ?>
                <div class="buttoncontainer">
                    <button class="animbutton typo20px sound-button" 
                            data-sound="<?php echo htmlspecialchars($filePath); ?>" 
                            data-categories="<?php echo htmlspecialchars($categories); ?>" 
                            data-name="<?php echo htmlspecialchars(strtolower($displayName)); ?>"
                            data-id="<?php echo htmlspecialchars($displayName); ?>"
                            onclick="play_sound('<?php echo htmlspecialchars($filePath); ?>')">
                        <?php echo htmlspecialchars($displayName); ?>
                    </button>
                    <img class="imagebutton" src="<?php echo htmlspecialchars($imagePath); ?>" alt="<?php echo htmlspecialchars($displayName); ?>">
                    <button class="fav-btn" data-id="<?php echo htmlspecialchars($displayName); ?>" title="Ajouter aux favoris">Ajouter aux favoris</button>
                </div>
                <?php
            }
            ?>
        </div>
    </div>

    <!-- Ajout du marque-page et du livre de recherche -->
    <div id="bookmark-btn" class="bookmark">
        <span>Rechercher un son</span>
    </div>
    <div id="glossary-book" class="book">
        <div class="book-content">
            <h2>Rechercher un bruitage</h2>
            <button class="close-btn" aria-label="Fermez la recherche">X</button>
            <div class="search-container">
                <input type="text" id="search-term" placeholder="Rechercher un mot-clé...">
                <select id="category-filter">
                    <option value="">Toutes les catégories</option>
                    <?php foreach ($allCategories as $category): ?>
                        <option value="<?php echo htmlspecialchars($category); ?>"><?php echo htmlspecialchars($category); ?></option>
                    <?php endforeach; ?>
                </select>
                <label class="fav-filter-label">
                    <input type="checkbox" id="favorites-filter"> Afficher uniquement les favoris
                </label>
                <button id="reset-search" class="reset-btn">Réinitialiser</button>
            </div>
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
            <iframe id="player7" class="lecteurvideo" src="https://www.youtube.com/embed/RT-LLlJPg2M" title="YouTube video player" alt="Debut de jdr"></iframe>
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
    <script src="/asset/scripts/ideaBox.js"></script>
</body>
</html>



