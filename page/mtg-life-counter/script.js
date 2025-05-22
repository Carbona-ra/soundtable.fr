// Vérification que jQuery est chargé
if (typeof jQuery === 'undefined') {
    console.error('jQuery n\'est pas chargé. Vérifiez le CDN ou incluez jQuery localement.');
    document.body.innerHTML = '<h1>Erreur : jQuery n\'est pas chargé. Veuillez vérifier votre connexion ou contacter l\'administrateur.</h1>';
} else {
    $(document).ready(function() {
        console.log('jQuery chargé, document prêt.');

        // Sélection de l'élément principal
        const $app = $('#app');
        if ($app.length === 0) {
            console.error('L\'élément #app n\'existe pas dans le DOM.');
            return;
        }

        // Récupération des données
        const lang = $app.data('lang') || 'fr';
        const assets = $app.data('assets') || [
            ['Blanc.webp'], ['Noir.webp'], ['Rouge.webp'], ['Vert.webp'], ['Bleu.webp'], ['C.svg']
        ];
        let t = $app.data('translations');
        let initialPlayers = $app.data('initial-players');

        // Validation des données initiales
        if (!t || !initialPlayers) {
            console.warn('Données initiales manquantes, utilisation des valeurs par défaut.');
            t = t || {
                player: 'Joueur',
                life: 'Vie',
                no_history: 'Aucune action dans l’historique'
            };
            initialPlayers = [
                { name: 'Joueur 1', life: 40, color: 0 },
                { name: 'Joueur 2', life: 40, color: 1 },
                { name: 'Joueur 3', life: 40, color: 2 },
                { name: 'Joueur 4', life: 40, color: 3 },
                { name: 'Joueur 5', life: 40, color: 4 },
                { name: 'Joueur 6', life: 40, color: 5 }
            ];
        }
        if (window.matchMedia("(max-width: 600px)").matches && screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(err => {
                console.warn('Impossible de verrouiller l\'orientation :', err);
            });
        }
        assets.forEach(asset => {
            const img = new Image();
            img.src = `/page/mtg-life-counter/assets/${asset[0]}`;
        });

        console.log('Données initiales :', { lang, translations: t, initialPlayers });

        // Sélection des éléments DOM
        const $playersContainer = $('#players');
        const $historyList = $('#history-list');
        const $noHistory = $('#no-history');
        const $undoButton = $('#undo');
        const $numPlayersSelect = $('#num-players');
        const $menu = $('#menu');
        const $menuToggle = $('#menu-toggle');

        if ($playersContainer.length === 0) {
            console.error('L\'élément #players n\'existe pas dans le DOM.');
            return;
        }

        // Initialisation des données
        let players = getCookie('mtg_players');
        let history = getCookie('mtg_history') || [];
        let numPlayers = getCookie('mtg_num_players') || 4;
        let historyTimeout = null;

        // Validation des cookies
        if (!Array.isArray(players) || players.length < 2 || !players.every(p => p && typeof p.name === 'string' && typeof p.life === 'number' && typeof p.color === 'number')) {
            console.warn('Cookies mtg_players invalides, utilisation des données initiales.');
            players = initialPlayers.slice(0, numPlayers).map((player, index) => ({
                name: player.name || `${t.player} ${index + 1}`,
                life: player.life || 40,
                color: player.color !== undefined ? player.color : index % assets.length
            }));
        }

        console.log('État initial :', { players, history, numPlayers });

        // Mise à jour du sélecteur de joueurs
        $numPlayersSelect.val(numPlayers);

        // Fonctions pour gérer les cookies
        function setCookie(name, value, days = 7) {
            try {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`;
                console.log(`Cookie ${name} défini.`);
            } catch (e) {
                console.error(`Erreur lors de l'écriture du cookie ${name} :`, e);
            }
        }

        function getCookie(name) {
            try {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) {
                    const parsed = JSON.parse(parts.pop().split(';').shift());
                    console.log(`Cookie ${name} lu :`, parsed);
                    return parsed;
                }
                return null;
            } catch (e) {
                console.error(`Erreur lors de la lecture du cookie ${name} :`, e);
                return null;
            }
        }

        // Gestion de la pression prolongée pour les boutons +/-
        let intervalId = null;
        function startLifeChange(playerIndex, delta) {
            updateLife(playerIndex, delta);
            intervalId = setInterval(() => updateLife(playerIndex, delta), 200); // Réduit à 200ms
        }

        function stopLifeChange() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        // Mise à jour des points de vie
        function updateLife(playerIndex, delta) {
            if (!players[playerIndex]) {
                console.error(`Joueur ${playerIndex} non défini`);
                return;
            }
            // Appliquer le changement
            if (delta < 0) {
                players[playerIndex].life = Math.max(0, players[playerIndex].life + delta);
            } else {
                players[playerIndex].life += delta;
            }

            // Mettre à jour uniquement le texte du joueur concerné
            const $playerDiv = $playersContainer.find(`.player[data-player="${playerIndex}"]`);
            if ($playerDiv.length) {
                $playerDiv.find('h2').text(players[playerIndex].life);
                console.log('Mise à jour ciblée pour joueur', playerIndex);
            } else {
                console.log('Fallback : rendu complet');
                renderPlayers();
            }

            // Annuler le précédent timer
            if (historyTimeout) {
                clearTimeout(historyTimeout);
            }

            // Programmer l'historique
            historyTimeout = setTimeout(() => {
                history.push(JSON.parse(JSON.stringify(players)));
                saveState();
                renderHistory();
                updateUndoButton();
                console.log('Historique mis à jour après délai.');
            }, 500);
        }



        // Fonction pour sauvegarder l'état dans les cookies
        function saveState() {
            if (!players || !Array.isArray(players)) {
                console.error('Erreur : players non défini ou invalide lors de saveState');
                return;
            }
            setCookie('mtg_players', players);
            setCookie('mtg_history', history);
            setCookie('mtg_num_players', numPlayers);
            console.log('État sauvegardé.');
        }

        // Fonction pour rendre les joueurs
        function renderPlayers() {
            console.log('Début du rendu des joueurs pour', numPlayers, 'joueurs.', new Date().toISOString());

            const playersPerRow = Math.ceil(numPlayers / 2);
            const playersContainer = document.getElementById('players');

            // Configure la grille uniquement pour desktop
            if (!window.matchMedia("(max-width: 600px)").matches) {
                playersContainer.style.display = 'grid';
                playersContainer.style.gridTemplateColumns = `repeat(${playersPerRow}, 1fr)`;
                playersContainer.style.gridTemplateRows = `repeat(2, 1fr)`;
            } else {
                playersContainer.style.display = 'flex';
                playersContainer.style.flexDirection = 'column';
            }

            $playersContainer.empty()
                .attr('data-count', numPlayers)
                .removeClass()
                .addClass('players')
                .css('--num-players', numPlayers);

            if (!Array.isArray(players) || players.length === 0) {
                console.error('Tableau players invalide :', players);
                players = initialPlayers.slice(0, numPlayers);
            }

            const topCount = Math.ceil(numPlayers / 2);
            const bottomCount = numPlayers - topCount;

            players.slice(0, numPlayers).forEach((player, index) => {
                if (!player || typeof player.name === 'undefined' || typeof player.life === 'undefined' || typeof player.color === 'undefined') {
                    console.warn(`Joueur ${index} invalide, valeurs par défaut utilisées.`);
                    player = {
                        name: `${t.player} ${index + 1}`,
                        life: 40,
                        color: index % assets.length
                    };
                    players[index] = player;
                }

                const isTop = index < topCount;
                const positionClass = isTop ? 'top' : 'bottom';
                const colorIndex = player.color % assets.length;
                const iconSrc = `/page/mtg-life-counter/assets/${assets[colorIndex][0]}`;

                const $playerDiv = $(`
                    <div class="player ${positionClass} color-${colorIndex}" data-player="${index}">
                        <h2>${player.life}</h2>
                        <img src="${iconSrc}" alt="Icon ${assets[colorIndex][0]}" class="player-icon">
                        <div class="life-controls">
                            <button class="minus" data-player="${index}" data-delta="-1">-</button>
                            <button class="plus" data-player="${index}" data-delta="1">+</button>
                        </div>
                    </div>
                `);

                // Ajuster la largeur pour les joueurs du bas (desktop uniquement)
                if (!window.matchMedia("(max-width: 600px)").matches && !isTop && bottomCount < topCount) {
                    const bottomIndex = index - topCount;
                    const span = Math.floor(playersPerRow / bottomCount);
                    $playerDiv.css('grid-column', `span ${span}`);
                }

                $playersContainer.append($playerDiv);
            });

            // Gestion des boutons
            $playersContainer.find('.life-controls button').off('mousedown mouseup mouseleave').on({
                mousedown: function () {
                    console.log('mousedown triggered for player', $(this).data('player'));
                    const playerIndex = parseInt($(this).data('player'));
                    const delta = parseInt($(this).data('delta'));
                    startLifeChange(playerIndex, delta);
                },
                mouseup: stopLifeChange,
                mouseleave: stopLifeChange
            });
        }

        // Fonction pour rendre l'historique
        function renderHistory() {
            console.log('Rendu de l\'historique :', history.length, 'entrées.');
            if (history.length === 0) {
                $noHistory.show();
                $historyList.empty();
            } else {
                $noHistory.hide();
                $historyList.empty();
                history.slice().reverse().forEach(state => {
                    const $li = $(`<li>${state.slice(0, numPlayers).map(p => `${p.name}: ${p.life}`).join(' ')}</li>`);
                    $historyList.append($li);
                });
            }
        }

        // Fonction pour mettre à jour le bouton Annuler
        function updateUndoButton() {
            $undoButton.prop('disabled', history.length === 0);
            console.log('Bouton Annuler mis à jour :', history.length === 0 ? 'désactivé' : 'activé');
        }

        // Gestion du bouton Réinitialiser
        $('#reset').on('click', function() {
            console.log('Réinitialisation demandée.');
            numPlayers = parseInt($numPlayersSelect.val());
            players = Array.from({ length: numPlayers }, (_, i) => ({
                name: `${t.player} ${i + 1}`,
                life: 40,
                color: i % assets.length
            }));
            history = [];
            saveState();
            renderPlayers();
            renderHistory();
            updateUndoButton();
        });

        // Gestion du bouton Annuler
        $('#undo').on('click', function() {
            console.log('Annulation demandée.');
            if (history.length > 0) {
                players = history.pop();
                saveState();
                renderPlayers();
                renderHistory();
                updateUndoButton();
            }
        });

        // Gestion du changement du nombre de joueurs
        $numPlayersSelect.on('change', function() {
            numPlayers = parseInt($(this).val());
            console.log('Nombre de joueurs changé :', numPlayers);
            while (players.length < numPlayers) {
                players.push({
                    name: `${t.player} ${players.length + 1}`,
                    life: 40,
                    color: players.length % assets.length
                });
            }
            if (players.length > numPlayers) {
                players = players.slice(0, numPlayers);
            }
            saveState();
            renderPlayers();
            renderHistory();
        });

        // Gestion du menu (ouvrir/fermer)
        $menuToggle.on('click', function() {
            $menu.toggleClass('open');
            console.log('Menu togglé :', $menu.hasClass('open') ? 'ouvert' : 'fermé');
        });

        // Rendu initial
        console.log('Lancement du rendu initial.');
        try {
            renderPlayers();
            renderHistory();
            updateUndoButton();
        } catch (e) {
            console.error('Erreur lors du rendu initial :', e);
        }
    });
}