// /asset/scripts/glossary.js

// Données du glossaire
const glossaryData = [
    {
        term: "Advance",
        description: "Lors de la phase de mouvement, une unité peut avancer après son mouvement normal en lançant un D6. Ajoutez le résultat en pouces à son mouvement, mais l'unité ne peut pas charger ce tour."
    },
    {
        term: "Anti-X Y+",
        description: "Les attaques avec cette règle blessent automatiquement les cibles avec le mot-clé X (par exemple, Anti-Infantry) sur un jet de Y+ ou mieux, sans lancer pour blesser."
    },
    {
        term: "Assault",
        description: "Les armes avec ce mot-clé permettent à l'unité de tirer même après avoir avancé, mais uniquement si la cible est à portée."
    },
    {
        term: "Blast",
        description: "Contre une unité de 6 modèles ou plus, ajoutez +1 touche par tranche de 5 modèles dans la cible (arrondi au supérieur). Ne fonctionne pas contre les Personnages ou unités attachées."
    },
    {
        term: "Deep Strike",
        description: "L'unité peut être déployée en Réserve et arriver sur le champ de bataille à partir de la fin du deuxième round, à plus de 9\" des ennemis."
    },
    {
        term: "Devastating Wounds",
        description: "Une touche critique (généralement un 6) inflige des blessures mortelles, ignorant les sauvegardes d'armure et invulnérables."
    },
    {
        term: "Fall Back",
        description: "Une unité peut se retirer d’un combat au corps-à-corps lors de la phase de mouvement, mais elle ne peut pas tirer ni charger ce tour, sauf si elle a une règle spéciale."
    },
    {
        term: "Feel No Pain X+",
        description: "Permet d’ignorer une blessure ou une blessure mortelle sur un jet de X ou plus (par exemple, 5+ pour ignorer sur un 5 ou 6)."
    },
    {
        term: "Fight First",
        description: "L'unité peut combattre en premier dans la phase de combat, même si elle n’a pas chargé, à moins qu’une autre unité avec Fight First ne soit présente."
    },
    {
        term: "Heavy",
        description: "Une arme Heavy gagne +1 pour toucher si l’unité portant l’arme est restée stationnaire ce tour."
    },
    {
        term: "Ignores Cover",
        description: "Les attaques de cette arme ignorent les bonus de sauvegarde conférés par le terrain léger ou dense."
    },
    {
        term: "Indirect Fire",
        description: "Permet de tirer sur des cibles hors ligne de vue, mais elles gagnent un bonus de couverture (+1 à la sauvegarde) et l’attaquant subit -1 pour toucher."
    },
    {
        term: "Infiltrators",
        description: "L’unité peut être déployée n’importe où sur le champ de bataille, à plus de 9\" des zones de déploiement ennemies et des unités ennemies."
    },
    {
        term: "Lethal Hits",
        description: "Une touche critique (généralement un 6) devient automatiquement une blessure, sans besoin de lancer pour blesser."
    },
    {
        term: "Melta",
        description: "À la moitié de la portée de l’arme ou moins, ajoutez +2 au jet de dégâts pour chaque blessure réussie."
    },
    {
        term: "Objective Secured",
        description: "Certaines unités (comme les Troupes) contrôlent les objectifs même si elles sont moins nombreuses que les unités ennemies non-Objective Secured."
    },
    {
        term: "Overwatch",
        description: "Permet à une unité de tirer en dehors de son tour sur une unité ennemie qui bouge, charge ou effectue une action, sur un jet de 6 pour toucher (modifié par certaines règles)."
    },
    {
        term: "Pistol",
        description: "Une arme Pistol peut être utilisée pour tirer au corps-à-corps ou après avoir avancé, mais uniquement sur une cible à portée."
    },
    {
        term: "Precision",
        description: "Les attaques de cette arme peuvent cibler un Personnage attaché à une unité, même si l’unité est la cible principale."
    },
    {
        term: "Rapid Fire X",
        description: "À la moitié de la portée maximale de l’arme, ajoutez X tirs supplémentaires par arme (par exemple, Rapid Fire 1 sur un Bolter donne 2 tirs à 12\" ou moins)."
    },
    {
        term: "Scouts X\"",
        description: "Avant le premier tour, l’unité peut effectuer un mouvement normal jusqu’à X pouces, respectant les restrictions de déploiement."
    },
    {
        term: "Stealth",
        description: "L’unité gagne un bonus de couverture (+1 à la sauvegarde) contre les tirs à plus de 12\"."
    },
    {
        term: "Sustained Hits X",
        description: "Une touche critique (généralement un 6) génère X touches supplémentaires."
    },
    {
        term: "Torrent",
        description: "Les attaques de cette arme touchent automatiquement, sans besoin de lancer pour toucher."
    },
    {
        term: "Twin-Linked",
        description: "Permet de relancer les jets pour blesser ratés."
    },
    {
        term: "Command Re-roll",
        description: "Un Stratagème de base permettant de relancer un jet de dés (touche, blessure, sauvegarde, etc.) pour 1 Point de Commandement."
    },
    {
        term: "Insane Bravery",
        description: "Un Stratagème empêchant une unité de rater un test de Moral pour 1 Point de Commandement, mais elle subit des pertes automatiques si elle échoue ensuite."
    },
    {
        term: "Wound Roll",
        description: "Après une touche réussie, un jet pour blesser compare la Force de l’arme à la Résistance de la cible. Par exemple, Force 4 contre Résistance 4 blesse sur 4+."
    },
    {
        term: "Invulnerable Save",
        description: "Une sauvegarde spéciale qui ne peut être modifiée par la Pénétration d’Armure. Par exemple, une sauvegarde invulnérable de 4+ réussit toujours sur 4 ou plus."
    },
    {
        term: "Moral Test",
        description: "À la fin de la phase de Moral, une unité ayant subi des pertes teste son Commandement. Un échec entraîne des pertes supplémentaires via Combat Attrition."
    },
    {
        term: "Aura",
        description: "Une capacité qui affecte les unités amies à une certaine distance (par exemple, 6\"), comme un bonus de Commandement ou une relance des jets."
    }
];

// Fonction principale pour initialiser le glossaire
(function ($) {
    // Injecter le CSS avec les ajustements
    const glossaryStyles = `
        .bookmark {
            position: fixed;
            bottom: 20px;
            left: 0;
            width: 146px;
            height: 81px;
            margin-left: -80px;
            background: url('../../asset/bookmark.webp') no-repeat center;
            background-size: cover;
            border: none;
            cursor: pointer;
            z-index: 1000;
            animation: slideBookmark 3s infinite ease-in-out;
            transition: width 0.3s, margin-left 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .bookmark span {
            color: #f5f5dc;
            font-size: 18px;
            text-align: center;
            transform: rotate(-90deg);
            text-shadow: 1px 1px 2px #000;
            font-family: 'MedievalSharp', cursive;
            position: absolute;
            width: 100px;
            right: 0px;
            bottom: 38px;
        }

        .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: url('../../asset/seal.webp') no-repeat center;
            background-size: cover;
            border: none;
            cursor: pointer;
            color: transparent; /* Cache le texte "X" */
        }

        .bookmark.pulled {
            width: 135px;
            height: 74.89px;
            margin-left: -20px;
            animation: none;
        }
            
        .bookmark.pulled span {
            font-size: 17px;
            bottom: 36px;
        }

        @keyframes slideBookmark {
            0% { transform: translateX(0); }
            50% { transform: translateX(20px); }
            100% { transform: translateX(0); }
        }

        .book {
            position: fixed;
            top: 10%;
            left: -100%;
            width: 468px;
            max-width: 600px;
            height: 600px;
            background: url('../../asset/book.webp') no-repeat center;
            background-size: cover;
            border: none;
            z-index: 999;
            overflow: hidden;
            display: none; /* Ajouté pour s'assurer que le livre est caché au départ */
        }

        .book-content {
            padding: 40px 60px;
            height: 459px;
            margin-top: 29px;
            overflow-y: auto;
            background: transparent;
            color: #2c1e1e;
            font-family: 'MedievalSharp', cursive;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .book-content::-webkit-scrollbar {
            display: none;
        }

        .book-content h2 {
            text-align: center;
            font-size: 2em;
            color: #3c2f2f;
            text-shadow: 1px 1px 2px #d4a017;
            margin-bottom: 20px;
        }

        #search-term {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 2px solid #3c2f2f;
            border-radius: 5px;
            background: rgba(245, 245, 220, 0.8);
            font-family: 'MedievalSharp', cursive;
            font-size: 1em;
        }

        .entry {
            margin-bottom: 20px;
            padding: 10px;
            border-bottom: 1px solid #d4a017;
        }

        .entry h3 {
            margin: 0;
            font-size: 1.4em;
            color: #3c2f2f;
        }

        .entry p {
            margin: 5px 0 0;
            font-size: 1em;
            line-height: 1.4;
        }

        @media (max-width: 600px) {
            .book {
                top: 40%;
                height: 383px;
                width: 300px;
            }
            .book-content {
                padding: 20px 30px;
                height: 307px;
                margin-top: 14px;
            }
            #search-term {
                width: 215px;
            }

            .close-btn {
                width: 30px;
                height: 30px;
                top: 15px;
                right: 15px;
            }
        }
    `;

    // Injecter le CSS dans le <head>
    $('<style>').text(glossaryStyles).appendTo('head');

    // Injecter le HTML avec le texte "Index" dans le marque-page
    const glossaryHTML = `
        <div id="bookmark-btn" class="bookmark">
            <span>Index</span>
        </div>
        <div id="glossary-book" class="book">
            <div class="book-content">
                <h2>Index de l'Imperium</h2>
                <button class="close-btn" aria-label="fermez le l'index de l'impérieum">X</button>
                <input type="text" id="search-term" placeholder="Rechercher un mot-clé...">
                <div id="glossary-entries"></div>
            </div>
        </div>
    `;
    $('body').append(glossaryHTML);

    // Charger la police MedievalSharp si elle n'est pas déjà chargée
    if (!$('link[href*="MedievalSharp"]').length) {
        $('<link>')
            .attr({
                href: 'https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap',
                rel: 'stylesheet'
            })
            .appendTo('head');
    }

    // Fonction pour charger les entrées du glossaire
    function loadGlossary(searchTerm = '') {
        const $entries = $('#glossary-entries');
        $entries.empty();
        glossaryData
            .filter(entry => entry.term.toLowerCase().includes(searchTerm.toLowerCase()))
            .forEach(entry => {
                $entries.append(`
                    <div class="entry">
                        <h3>${entry.term}</h3>
                        <p>${entry.description}</p>
                    </div>
                `);
            });
        if ($entries.children().length === 0) {
            $entries.append('<p>Aucun résultat trouvé.</p>');
        }
    }

    // Initialiser le glossaire
    loadGlossary();

    // Recherche dynamique
    $('#search-term').on('input', function () {
        loadGlossary($(this).val());
    });

    // Animation du marque-page et ouverture/fermeture du livre
    $('#bookmark-btn').on('click', function () {
        const $book = $('#glossary-book');
        const $bookmark = $(this);
        if ($book.is(':visible')) {
            // Fermer le livre
            $book.animate({ left: '-100%' }, 500, function () {
                $book.hide();
            });
            $bookmark.removeClass('pulled');
        } else {
            // Ouvrir le livre
            $book.show().css({ left: '-100%' }).animate({ left: '0' }, 500);
            $bookmark.addClass('pulled');
            loadGlossary();
        }
    });

    // Bouton de fermeture
    $('.close-btn').on('click', function () {
        $('#glossary-book').animate({ left: '-100%' }, 500, function () {
            $(this).hide();
        });
        $('#bookmark-btn').removeClass('pulled');
    });
})(jQuery);