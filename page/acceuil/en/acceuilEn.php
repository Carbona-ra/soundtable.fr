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
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
    <script>
        $(document).ready(function () {
            //Module de popup
            function createPopUp(message) {
                const face = [
                    'https://media.moddb.com/images/mods/1/28/27126/anigif.5.gif', // Zerg animation
                    'https://media.tenor.com/9l3uOtgRho8AAAAM/archon-starcraft2.gif', // Archon Protoss
                    'https://media.tenor.com/Xk4HKwVJhUwAAAAM/marine-starcraft.gif' // Marine Terran
                ];
            
                // Sélection aléatoire d'un GIF
                const randomFace = face[Math.floor(Math.random() * face.length)];
            
                // Création du HTML de la popup
                const popupHTML = `
                    <div style="z-index: 10000; height: 120px; display: flex; position: fixed; top: 10px; right: 10px; width: 340px; padding: 15px; background: linear-gradient(135deg,rgb(23, 160, 206), #5a6266); color: #66ccff; border: 3px solid #66ccff; border-radius: 0; box-shadow: 0 0 20px rgba(255, 204, 0, 0.4), inset 0 0 10px rgba(102, 204, 255, 0.2); font-family: 'Arial', sans-serif; overflow: hidden; clip-path: polygon(0 15%, 5% 0, 85% 0, 100% 20%, 95% 100%, 80% 95%, 15% 100%, 0 85%);">
                        <!-- Bouton de fermeture -->
                        <div style="z-index: 10000; cursor: pointer; margin-right: 10px; color: #ff3333; font-weight: bold; text-shadow: 0 0 5px #ff3333; font-size: 18px; line-height: 20px;" onclick="this.parentElement.remove();" aria-label="Bouton pour fermer la popup">X</div>
                        <div style="flex: 1; display: flex; gap: 15px; position: relative;">
                            <!-- Zone de texte -->
                            <div style="height: 100px; width: 180px; overflow-y: auto; margin: 0; direction: rtl; padding: 5px 5px 5px 10px; background: rgba(40, 50, 60, 0.8); border: 1px solid #66ccff; border-radius: 0; box-shadow: inset 0 0 8px rgba(102, 204, 255, 0.3); position: relative; clip-path: polygon(0 10%, 5% 0, 90% 0, 95% 15%, 100% 90%, 90% 100%, 10% 95%, 0 85%);">
                                <p style="margin: 0; word-wrap: break-word; width: 100%; direction: ltr; text-shadow: 0 0 3px #66ccff; font-size: 14px; line-height: 16px;">
                                    ${message}
                                </p>
                            </div>
                            <!-- GIF -->
                            <img src="${randomFace}" alt="GIF illustration" style="width: 110px; height: 110px; object-fit: cover; border: 2px solid rgb(248 156 255); border-radius: 0; box-shadow: 0 0 15px rgba(204, 51, 255, 0.5); background: rgba(40, 50, 60, 0.8); clip-path: polygon(0 5%, 10% 0, 90% 0, 100% 10%, 95% 100%, 85% 95%, 5% 100%, 0 90%);">
                        </div>
                        <!-- Éléments décoratifs externes -->
                        <div style="position: absolute; top: -3px; left: -3px; width: 30px; height: 30px; border-top: 3px solid #66ccff; border-left: 3px solid #66ccff;"></div>
                        <div style="position: absolute; bottom: -3px; right: -3px; width: 30px; height: 30px; border-bottom: 3px solidrgb(193, 251, 255); border-right: 3px solid #66ccff;"></div>
                        <div style="position: absolute; top: 10px; left: 10px; width: 50px; height: 2px; background: #66ccff; opacity: 0.7;"></div>
                        <div style="position: absolute; bottom: 10px; right: 10px; width: 50px; height: 2px; background:rgb(248 156 255); opacity: 0.7;"></div>
                        <!-- Motif biseauté -->
                        <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100px; height: 12px; background: #3a4042; clip-path: polygon(0 0, 15% 100%, 85% 100%, 100% 0);"></div>
                    </div>
                `;
            
                // Ajout des styles pour la scrollbar
                const style = document.createElement('style');
                style.textContent = `
                    div::-webkit-scrollbar {
                        width: 6px;
                    }
                    div::-webkit-scrollbar-track {
                        background: #3a4042;
                        border-radius: 0;
                        box-shadow: inset 0 0 5px rgba(102, 204, 255, 0.2);
                    }
                    div::-webkit-scrollbar-thumb {
                        background: #66ccff;
                        border-radius: 0;
                        box-shadow: 0 0 5px #66ccff;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                        background: #99ddff;
                    }
                `;
                document.head.appendChild(style);
            
                // Injection de la popup dans le DOM
                document.body.insertAdjacentHTML('beforeend', popupHTML);
            }

            // Fonction pour suivre une page
            function trackPageView(pageName) {
                $.ajax({
                    url: 'https://soundtable.fr/api/armies.php', // Remplacez par l'URL de votre API
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        action: 'track-page-view',
                        pageName: pageName
                    }),
                    success: function(response) {
                        console.log('Réponse du serveur :', response);
                    },
                    error: function(xhr, status, error) {
                        console.error('Erreur AJAX :', status, error);
                    }
                });
            }

            // Récupérer le chemin de l'URL actuelle
            var currentPage = window.location.pathname || 'unknown';
            // Nettoyer le chemin (supprimer le "/" initial et l'extension .html ou .php si présente)
            currentPage = currentPage.replace(/^\/|(\.html|\.php)$/g, '') || 'index'; // Si vide, utiliser "index"
            
            // Suivre la page actuelle au chargement
            trackPageView(currentPage);
        });
    </script>
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
                <a href="en/warhammeurArmise">Explore</a>
            </div>
        </div>
    </div>


    <script src="/asset/scripts/script-front.js"></script>

</body>
</html>
