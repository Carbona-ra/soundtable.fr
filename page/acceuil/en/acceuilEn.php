<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/webp" href="/asset/favicon.webp">
    <title>Soundtable - Soundboard RPG and Board Game Tools</title>
    <meta name="description" content="Soundtable offers free soundboards for your role-playing games (RPG) and tools to enhance your board game sessions. Dive into immersive atmospheres with sound effects tailored to each universe!">
    <meta name="keywords" content="RPG, free soundboard, role-playing game ambiance, board game tools, sound effects, immersive sounds, RPG tools, Chroniques Oubliées, Star Wars, Warhammer">
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
    <h1>Soundtable - Soundboards and Tools for Role-Playing Games</h1>
    <p class="blackP">Discover our free soundboards for your RPG and board game sessions. Immerse yourself in sound atmospheres and enhance your gaming experience with our specialized tools.</p>

    <div class="langBtn">
        <a aria-label="Go to FR version" href="https://soundtable.fr">FR</a>
        <span>/</span>
        <a aria-label="Go to EN version" href="https://soundtable.fr/en"><bold>EN</bold></a>
    </div>

    <div class="container">
        <div class="cards-row">
            <div class="card">
                <img src="/asset/soundtable.png" alt="Chroniques Oubliées Soundboard">
                <h2 class="card-title">Chroniques Oubliées</h2>
                <p class="card-description">Immerse yourself in the world of Chroniques Oubliées with our RPG soundboard and immersive ambiance.</p>
                <a href="/chroniques-oubliees">Explore</a>
            </div>

            <div class="card">
                <img src="/asset/starwars-preview.png" alt="Star Wars Soundboard">
                <h2 class="card-title">Star Wars</h2>
                <p class="card-description">Embark on galactic adventures with immersive sound effects for the Star Wars universe.</p>
                <a href="/starwars">Explore</a>
            </div>
        </div>

        <div class="cards-row">
            <div class="card">
                <img src="/asset/image-warhammer.png" alt="Warhammer Tools">
                <h2 class="card-title">Warhammer Tools</h2>
                <p class="card-description">Prepare for your battles with our tools for Warhammer and tabletop games.</p>
                <a href="/warhammer">Explore</a>
            </div>
        </div>
    </div>
</body>
</html>
