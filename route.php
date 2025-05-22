<?php

function route($uri) {

    $routes = [
        '/' => 'page/acceuil/acceuil.php',
        '/en' => 'page/acceuil/en/acceuilEn.php',
        '/chroniques-oubliees' => 'page/chronique/chroniques-oubliees.php',
        '/starwars' => 'page/starwars/front-page.php',
        '/warhammeurArmise' => 'page/warhammeur/warhammeur.php',
        '/en/warhammeurArmise' => 'page/warhammeur/en/warhammeurEn.php',
        '/en/MTG-life-counter' => 'page/mtg-life-counter/lifeCounter.php',
        '/MTG-compteur-de-point-de-vie' => 'page/mtg-life-counter/lifeCounter.php',
        '/api/armies',
        '/api/ideabox',
    ];

    if (array_key_exists($uri, $routes)) {
        include $routes[$uri];
    } else {
        include 'page/404.php';
    }
}
?>
