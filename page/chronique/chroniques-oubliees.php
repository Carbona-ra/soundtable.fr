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
        "Annonce HRP" => [
            "file" => "annonce-HRP.mp3",
            "image" => "annonce-HRP.webp",
            "categories" => ["annonce"]
        ],
        "Aura magique" => [
            "file" => "Aura-magic.mp3",
            "image" => "Aura-magic.webp",
            "categories" => ["magie", "ambiance"]
        ],
        "Boule de feu" => [
            "file" => "boule-de-feu.mp3",
            "image" => "boule-de-feu.webp",
            "categories" => ["magie", "combat"]
        ],
        "Bruit de vent" => [
            "file" => "Bruit-de-vent.mp3",
            "image" => "Bruit-de-vent.webp",
            "categories" => ["nature", "ambiance"]
        ],
        "Chauve-souris" => [
            "file" => "Chauvesouris.mp3",
            "image" => "Chauvesouris.webp",
            "categories" => ["nature", "inquiétant", "animal"]
        ],
        "Corne" => [
            "file" => "Corne.mp3",
            "image" => "Corne.webp",
            "categories" => ["annonce", "combat"]
        ],
        "Coup de feu" => [
            "file" => "coup-de-feu.mp3",
            "image" => "coup-de-feu.webp",
            "categories" => ["combat", "arme"]
        ],
        "Coup d'épée" => [
            "file" => "coup-dépée.mp3",
            "image" => "coup-dépée.webp",
            "categories" => ["combat", "arme"]
        ],
        "Coup d'épée sanglant" => [
            "file" => "coup-dépée-sanglant.mp3",
            "image" => "coup-dépée-sanglant.webp",
            "categories" => ["combat", "arme"]
        ],
        "Crachat de flamme" => [
            "file" => "Cracha-de-flamme.mp3",
            "image" => "Cracha-de-flamme.webp",
            "categories" => ["magie", "combat"]
        ],
        "Cri d'homme" => [
            "file" => "crie-dhomme.mp3",
            "image" => "crie-dhomme.webp",
            "categories" => ["humain", "inquiétant"]
        ],
        "Cri de femme" => [
            "file" => "crie-femme.mp3",
            "image" => "crie-femme.webp",
            "categories" => ["humain", "inquiétant"]
        ],
        "Éboulement" => [
            "file" => "Eboulement.mp3",
            "image" => "Eboulement.webp",
            "categories" => ["nature", "danger", "ambiance"]
        ],
        "Électricité" => [
            "file" => "Electriciter.mp3",
            "image" => "Electriciter.webp",
            "categories" => ["magie", "combat", "ambiance"]
        ],
        "Level up" => [
            "file" => "levelUP.mp3",
            "image" => "levelUP.webp",
            "categories" => ["jeu", "progression", "magie"]
        ],
        "Passage secret" => [
            "file" => "Passage-secret.mp3",
            "image" => "Passage-secret.webp",
            "categories" => ["exploration", "mystère", "ambiance"]
        ],
        "Portail magique" => [
            "file" => "Portail-magic.mp3",
            "image" => "Portail-magic.webp",
            "categories" => ["magie", "mystère", "ambiance"]
        ],
        "Porte métallique" => [
            "file" => "Porte-métalique.mp3",
            "image" => "Porte-métalique.webp",
            "categories" => ["exploration", "ambiance"]
        ],
        "Reniflement" => [
            "file" => "Reniflement.mp3",
            "image" => "Reniflement.webp",
            "categories" => ["humain", "inquiétant", "animal"]
        ],
        "Rugissement" => [
            "file" => "Rugissement.mp3",
            "image" => "Rugissement.webp",
            "categories" => ["combat", "animal"]
        ],
        "Sifflement" => [
            "file" => "Siflotement.mp3",
            "image" => "Siflotement.webp",
            "categories" => ["humain", "ambiance"]
        ],
        "Tonnerre" => [
            "file" => "Tonner.mp3",
            "image" => "Tonner.webp",
            "categories" => ["nature", "inquiétant", "ambiance"]
        ],
        "Verre cassé" => [
            "file" => "Verre-casser.mp3",
            "image" => "Verre-casser.webp",
            "categories" => ["destruction", "ambiance", "mystère"]
        ],
        "Bruit de nuit" => [
            "file" => "Bruit-de-nuit.mp3",
            "image" => "Bruit-de-nuit.webp",
            "categories" => ["nature", "inquiétant", "ambiance"]
        ],
        "Hurlement de rage" => [
            "file" => "hurlemenent-de-rage.mp3",
            "image" => "hurlemenent-de-rage.webp",
            "categories" => ["humain", "combat"]
        ],
        "Hurlement de loups" => [
            "file" => "hurlement-de-loups.mp3",
            "image" => "hurlement-de-loups.webp",
            "categories" => ["nature", "inquiétant", "animal"]
        ],
        "Invisibilité" => [
            "file" => "invisible.mp3",
            "image" => "invisible.webp",
            "categories" => ["magie", "mystère", "exploration"]
        ],
        "Machine mécanique" => [
            "file" => "Machine-Mecanique.mp3",
            "image" => "Machine-Mecanique.webp",
            "categories" => ["technologie", "ambiance","mystère", "destruction"]
        ],
        "Applaudissements" => [
            "file" => "aplaudissement.mp3",
            "image" => "aplaudissement.webp",
            "categories" => ["humain", "ambiance", "annonce"]
        ],
        "Porte qui grince" => [
            "file" => "Porte-qui-grince.mp3",
            "image" => "Porte-qui-grince.webp",
            "categories" => ["exploration", "inquiétant", "ambiance"]
        ],
        "Grincement de bois" => [
            "file" => "Grincement-bois.mp3",
            "image" => "Grincement-bois.webp",
            "categories" => ["ambiance", "inquiétant", "exploration"]
        ],
        "Artefact" => [
            "file" => "artefact.mp3",
            "image" => "artefact.webp",
            "categories" => ["magie", "mystère", "exploration"]
        ],
        "Cri de groupe" => [
            "file" => "Crie-de-groupe.mp3",
            "image" => "Crie-de-groupe.webp",
            "categories" => ["humain", "combat"]
        ],
        "Flèche" => [
            "file" => "flèche.mp3",
            "image" => "flèche.webp",
            "categories" => ["combat", "arme"]
        ],
        "Volée de flèches" => [
            "file" => "Volée-de-flèche.mp3",
            "image" => "Volée-de-flèche.webp",
            "categories" => ["combat", "arme", "ambiance"]
        ],
        "Onde de choc" => [
            "file" => "Onde-De-Choc.mp3",
            "image" => "Onde-De-Choc.webp",
            "categories" => ["magie", "combat", "destruction",  "danger"]
        ],
        "Soupir mortel" => [
            "file" => "soupir-mortelle.mp3",
            "image" => "soupir-mortelle.webp",
            "categories" => ["inquiétant", "mystère",  "danger",  "ambiance"]
        ],
        "Cœur battant" => [
            "file" => "coeur-battant.mp3",
            "image" => "coeur-battant.webp",
            "categories" => ["humain", "inquiétant", "danger", "ambiance"]
        ],
        "Attaque mentale" => [
            "file" => "attack-mental.mp3",
            "image" => "attack-mental.webp",
            "categories" => ["magie", "combat"]
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
    <script src="/asset/scripts/ideaBox.js"></script>
</body>
</html>



