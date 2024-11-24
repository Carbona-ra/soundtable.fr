<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soundtable</title>
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
    <style>
        /* Style de base */
        body {
            margin: 0;
            padding: 0;
            background: url('https://www.transparenttextures.com/patterns/old-wall.png'); /* Texture de fond */
            font-family: 'MedievalSharp', cursive;
            color: #f5f5dc;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* En-tête */
        h1 {
            font-size: 3em;
            margin-top: 20px;
            color: #b08968;
            text-shadow: 1px 1px 5px #000;
        }

        /* Style des cartes */
        .cards-container {
            display: flex;
            gap: 20px;
            margin-top: 40px;
        }

        .card {
            width: 300px;
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

        p {
            color: black;
            font-size: 20px;
        }

        .card a:hover {
            background-color: #a0724e;
        }
    </style>
</head>
<body>

    <h1>Bienvenue sur SoundTable</h1>
    <p>Explorez des mondes oubliés, rejoignez des galaxies lointaines, et préparez vos outils de guerre !</p>

    <div class="cards-container">
        <!-- Carte Chroniques Oubliées -->
        <div class="card">
            <img src="/asset/soundtable.png" alt="Chroniques Oubliées">
            <h2 class="card-title">Chroniques Oubliées</h2>
            <p class="card-description">Découvrez des aventures légendaires et plongez dans l’univers des Chroniques Oubliées.</p>
            <a href="/chroniques-oubliees">Explorer</a>
        </div>

        <!-- Carte Star Wars -->
        <div class="card">
            <img src="https://www.example.com/image-starwars.jpg" alt="Star Wars">
            <h2 class="card-title">Star Wars</h2>
            <p class="card-description">Rejoignez l’Alliance ou l’Empire et vivez des aventures galactiques dans l’univers Star Wars.</p>
            <a href="/starwars">Explorer</a>
        </div>

        <!-- Carte Outils Warhammer -->
        <div class="card">
            <img src="https://www.example.com/image-warhammer.jpg" alt="Outils Warhammer">
            <h2 class="card-title">Outils Warhammer</h2>
            <p class="card-description">Préparez vos batailles, vos cartes et vos armées pour l’univers de Warhammer.</p>
            <a href="/outils-warhammer">Explorer</a>
        </div>
    </div>
    <br><br><br><br><br><br><br><br><br>

</body>
</html>
