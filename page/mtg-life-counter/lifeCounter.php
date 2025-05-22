<?php
// page/warhammeur/en/warhammeurEn.php

// Détection de la langue via l'URL
$uri = $_SERVER['REQUEST_URI'];
$lang = (strpos($uri, '/en/') !== false) ? 'en' : 'fr';

// Inclusion du fichier de traduction
include_once('page/mtg-life-counter/translate.php');

// Vérification que $translations existe
if (!isset($translations[$lang])) {
    die('Erreur : Langue non supportée ou fichier de traduction manquant.');
}

$t = $translations[$lang];


$initialPlayers = [
    ['name' => $t['player'] . ' 1', 'life' => 40, 'color' => 0], // Blanc
    ['name' => $t['player'] . ' 2', 'life' => 40, 'color' => 1], // Noir
    ['name' => $t['player'] . ' 3', 'life' => 40, 'color' => 2], // Rouge
    ['name' => $t['player'] . ' 4', 'life' => 40, 'color' => 3], // Vert
    ['name' => $t['player'] . ' 5', 'life' => 40, 'color' => 4], // Bleu
    ['name' => $t['player'] . ' 6', 'life' => 40, 'color' => 5], // Incolore
];
?>

<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $t['title']; ?></title>
    <link rel="stylesheet" href="/page/mtg-life-counter/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script defer src="/page/mtg-life-counter/script.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, orientation=landscape">
</head>
<body>
    <div id="app" 
         data-lang="<?php echo $lang; ?>" 
         data-translations='<?php echo json_encode($t); ?>' 
         data-assets='<?php echo json_encode($asset); ?>'
         data-initial-players='<?php echo json_encode($initialPlayers); ?>'>
        
        <div id="menu">
            <h1><?php echo $t['title']; ?></h1>
            <div class="menu-content">
                <div class="controls">
                    <div>
                        <a href="/en/MTG-life-counter">EN</a><span>/</span><a href="/MTG-compteur-de-point-de-vie">FR</a>
                    </div>
                    <button id="reset"><?php echo $t['reset']; ?></button>
                    <button id="undo" disabled><?php echo $t['undo']; ?></button>
                    <div>
                        <label for="num-players"><?php echo $t['players']; ?>:</label>
                        <select id="num-players">
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4" selected>4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                </div>
                <div class="history">
                    <h2><?php echo $t['history']; ?></h2>
                    <p id="no-history"><?php echo $t['no_history']; ?></p>
                    <ul id="history-list"></ul>
                </div>
            </div>
        </div>

        <div id="players"></div>
        <button id="menu-toggle"></button>
    </div>
</body>
</html>