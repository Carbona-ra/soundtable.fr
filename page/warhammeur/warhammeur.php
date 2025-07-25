<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Warharmies : outil gratuit de gestion d'armée Warhammer pour Nécron. Créez, sauvegardez et gérez vos armées Nécron facilement sur mobile et desktop.">
    <meta name="keywords" content="Warhammer, outil gestion d'armée, Nécron, gratuit, création d'armée, Warharmies">
    <meta name="author" content="Warharmies">
    <meta name="robots" content="index, follow">

    <!-- Open Graph pour les réseaux sociaux -->
    <meta property="og:title" content="Warharmies - Outil Gratuit de Gestion d'Armée Warhammer Nécron">
    <meta property="og:description" content="Créez et gérez vos armées Nécron avec Warharmies, un outil gratuit pour Warhammer. Compatible mobile et desktop.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://soundtable.fr/warhammeurArmise"> <!-- Remplacez par l'URL réelle -->
    <meta property="og:image" content="https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=670&h=691"> <!-- Remplacez par une image représentative -->

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Warharmies - Outil Gratuit de Gestion d'Armée Warhammer Nécron">
    <meta name="twitter:description" content="Créez et gérez vos armées Nécron avec Warharmies, un outil gratuit pour Warhammer. Compatible mobile et desktop.">
    <meta name="twitter:image" content="https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=670&h=691"> <!-- Remplacez par une image représentative -->

    <title>Warharmies - Outil Gratuit de Gestion d'Armée Warhammer Nécron</title>
    <link rel="icon" type="image/webp" href="/asset/favicon2.webp">
    <link rel="stylesheet" href="/page/warhammeur/styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>

<div class="langBtn">
    <a aria-label="aller à la version" href="https://soundtable.fr/warhammeurArmise"><b>FR</b></a>
    <span>/</span>
    <a aria-label="aller à la version anglaise" href="https://soundtable.fr/en/warhammeurArmise">EN</a>
</div>

<div class="container">
        <!-- Encart de connexion en haut -->
        <!-- <div id="loginSection" class="login-section">
            <div id="loginForm">
                <h2>Connexion</h1>
                <div id="connectiondiv">
                    <input type="text" id="username" placeholder="Nom d'utilisateur" required>
                    <input type="password" id="password" placeholder="Mot de passe" required>
                </div>
                <div>
                    <button type="button" id="loginBtn">Se connecter</button>
                    <button type="button" id="registerBtn">S'inscrire</button>
                </div>
            </div>
            <div id="userInfo" style="display: none;">
                <p id="currentUserDisplay"></p>
                <button type="button" id="logoutBtn">Se déconnecter</button>
            </div>
            <p>Warharmies est un <strong>outil gratuit de gestion d'armée Warhammer</strong> dédié aux <strong>Nécrons</strong>. Créez, personnalisez et sauvegardez vos armées Nécron facilement, que vous soyez sur mobile ou desktop.</p>
            <p>Connectez-vous pour pouvoir sauvegarder vos armées ou rechercher des armées d'autres utilisateurs (pensez à bien noter votre mot de passe si vous vous inscrivez en remplissant les champs et cliquez sur s'inscrire)</p>
        </div> -->

        <!-- Outil de création d'armée en bas -->
        <div id="mainInterface" class="main-interface">
            <!-- <div class="headerArmy" id="armyHeader" style="display: none;">
                <div class="army-controls">
                    <input type="text" id="searchUsername" placeholder="Rechercher un utilisateur">
                    <button type="button" id="searchArmiesBtn">Rechercher</button>
                </div>
                <div class="army-controls">
                    <input type="text" id="armyName" placeholder="Nom de l'armée">
                    <button type="button" id="saveArmyBtn">Sauvegarder</button>
                </div>
                <button type="button" id="updateArmyBtn">Mettre à jour l'armée</button>
                <select id="savedArmies">
                    <option value="">Choisissez une armée sauvegardée</option>
                </select>
            </div> -->

            
            <h1>Création d'une Armée Nécron avec Warharmies - Outil Gratuit pour Warhammer</h1>

            <!-- Bouton pour ouvrir la popup -->
            <button id="viewDetachmentsBtn">Voir les détachements</button>

            <!-- Popup des détachements -->
            <div id="detachmentInfoPopup" class="popup" style="display: none;">
                <div class="popup-content">
                    <h2>Détachements</h2>
                    <button id="closeDetachmentInfoPopupBtn" class="close-btn">×</button>
                    <div id="detachmentAccordion" class="accordion"></div>
                </div>
            </div>

            <!-- Bouton pour ouvrir le popup -->
            <button id="openUnitPopupBtn">Ajouter une unité</button>

            <!-- Structure du popup -->
            <div id="unitPopup" class="popup" style="display: none;">
                <div class="popup-content">
                    <button id="closeUnitPopupBtn" class="close-btn">×</button>
                    <h2>Choisir une unité</h2>
                    <div class="scroll-section">
                        <div id="unitList" class="unit-list"></div>
                    </div>
                </div>
            </div>
            
            <!-- Armée sélectionnée -->
            <h2>Votre Armée Nécron - <span id="totalPoints">0</span> pts</h2>
            <div id="selectedUnitsList" style="display: flex; flex-wrap: wrap;"></div>
        </div>
    </div>

    <script src="/page/warhammeur/UniteEntity.js"></script>
    <script src="../../asset/scripts/glossaire40k.js"></script>
</body>
</html>