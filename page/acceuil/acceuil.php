<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/webp" href="/asset/favicon.webp">
    <title>Soundtable - Soundboard JDR et Outils de Jeux de Société</title>
    <meta name="description" content="Soundtable propose des soundboards gratuits pour vos jeux de rôle (JDR) et des outils pour améliorer vos parties de jeux de société. Plongez dans des ambiances immersives avec nos bruitages et effets sonores adaptés à chaque univers !">
    <meta name="keywords" content="JDR, soundboard gratuit, ambiance jeux de rôle, outils jeux de société, bruitage, RPG, sons immersifs, effets sonores, Chroniques Oubliées, Star Wars, Warhammer">
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: url('https://www.transparenttextures.com/patterns/old-wall.png');
            font-family: 'MedievalSharp', cursive;
            color: #f5f5dc;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h1 {
            font-size: 3em;
            margin-top: 20px;
            color: #b08968;
            text-shadow: 1px 1px 5px #000;
            text-align: center;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 90%;
            max-width: 1200px;
        }

        .cards-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            width: 100%;
            margin-bottom: 40px;
        }

        .card {
            width: 280px;
            height: 400px;
            background-color: rgba(0, 0, 0, 0.7);
            border: 2px solid #755139;
            border-radius: 15px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }

        .card-title {
            font-size: 1.5em;
            color: #f5e0b7;
            margin-top: 15px;
            text-shadow: 1px 1px 3px #000;
        }

        .card-description {
            font-size: 1em;
            color: #d4c7b4;
            padding: 10px;
        }

        .card a {
            display: block;
            padding: 10px;
            background-color: #755139;
            color: #f5f5dc;
            font-weight: bold;
            text-decoration: none;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }

        .card a:hover {
            background-color: #a0724e;
        }

        @media (max-width: 900px) {
            .cards-row {
                flex-direction: column;
                align-items: center;
            }
        }

        .langBtn {
            position: absolute;
            top : 10px;
            right: 10px;
        }

        .langBtn a, .langBtn span{
            color: black;
            font-size: 20px;
        }

        .blackP{
            color: black !important;
            font-size: 20px;
            text-align: center;
            padding: 0 70px;
        }
    </style>
</head>
<body>
    <h1>Soundtable - Soundboard et Outils pour Jeux de Rôle</h1>
    <p class="blackP">Découvrez nos soundboards gratuits pour vos parties de JDR et jeux de société. Plongez dans des ambiances sonores immersives et améliorez vos expériences de jeu avec nos outils spécialisés.</p>

    <div class="langBtn">
        <a aria-label="aller à la version" href="https://soundtable.fr"><bold>FR</bold></a>
        <span>/</span>
        <a aria-label="aller à la version anglaise" href="https://soundtable.fr/en"><bold>EN</bold></a>
    </div>

    <div class="container">
        <div class="cards-row">
            <div class="card">
                <img src="/asset/soundtable.png" alt="Soundboard Chroniques Oubliées">
                <h2 class="card-title">Chroniques Oubliées</h2>
                <p class="card-description">Plongez dans l’univers des Chroniques Oubliées avec notre soundboard JDR et ambiance immersive.</p>
                <a href="/chroniques-oubliees">Explorer</a>
            </div>

            <div class="card">
                <img src="/asset/starwars-preview.png" alt="Soundboard Star Wars">
                <h2 class="card-title">Star Wars</h2>
                <p class="card-description">Vivez des aventures galactiques avec des effets sonores immersifs pour l’univers Star Wars.</p>
                <a href="/starwars">Explorer</a>
            </div>
        </div>

        <div class="cards-row">
            <div class="card">
                <img src="/asset/image-warhammer.png" alt="Outils Warhammer">
                <h2 class="card-title">Outils Warhammer</h2>
                <p class="card-description">Préparez vos batailles avec nos outils pour Warhammer et jeux de figurines.</p>
                <a href="/warhammeurArmise">Explorer</a>
            </div>
        </div>
    </div>
</body>
</html>
