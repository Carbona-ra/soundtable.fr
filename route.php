<?php

function route($uri) {

    $routes = [
        '/' => 'page/acceuil/acceuil.php',
        '/chroniques-oubliees' => 'page/chronique/chroniques-oubliees.php',
        '/starwars' => 'page/starwars/starwars.php'
    ];

    if (array_key_exists($uri, $routes)) {
        include $routes[$uri];
    } else {
        include 'page/404.php';
    }
}
?>
