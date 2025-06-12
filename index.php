<?php
require_once 'route.php';

// Nettoyer et récupérer l’URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

route($uri);
?>