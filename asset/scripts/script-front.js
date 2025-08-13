$(document).ready(function () {


    // Agrandir / Réduire les vidéos au survol
    $(".bardroite .lecteurvideo").hover(
        function () {
            $(this).addClass("agrandi").css({ width: "275px", height: "175px" });
        },
        function () {
            $(this).removeClass("agrandi").css({ width: "", height: "" });
        }
    );


     // Cacher / afficher la barre des ambiance
    let isOpen = true;
    $('#btn-ambiance').click(function() {
        if (isOpen) {
            // Fermer la barre droite
            $('.bardroite').animate({ right: '-360px' }, 300, function() {
                $('#btn-ambiance').text('< Ouvrir menu');
            });

            // Ajouter la classe qui change la largeur en CSS
            $('.bloc-central').addClass('expanded');

            isOpen = false;
        } else {
            // Ouvrir la barre droite
            $('.bardroite').animate({ right: '0px' }, 300, function() {
                $('#btn-ambiance').text('> Fermer menu');
            });

            // Retirer la classe pour revenir à la largeur normale
            $('.bloc-central').removeClass('expanded');

            isOpen = true;
        }
    });


    // cacher / montrer le bloc note
    $(document).ready(function() {
        $('#bloc-note-btn').click(function() {
            if ($('#blocnote').css('display') === 'none') {
                $('#blocnote').css('display', 'block');
                if (!$('#overlay').length) {
                    $('body').append('<div id="overlay"></div>');
                }
            } else {
                $('#blocnote').css('display', 'none');
                $('#overlay').remove();
            }
        });

        $(document).on('click', '#overlay', function() {
            $('#blocnote').css('display', 'none');
            $(this).remove();
        });
    });



    // Disparition d'un élément avec un effet de fondu
    $(".monBouton").click(function () {
        $(this).fadeOut(500, function () {
            $(this).addClass("disparut");
        });
    });


    // Gestion du menu de dés
    $("#openmenuD").click(function () {
        $("#LancerDeDée").toggle();
    });


    // Gestion de l'incrémentation / décrémentation des dés
    let nbActuel = 0;
    $("#MoinsDeDée").click(function () {
        nbActuel = Math.max(0, nbActuel - 1);
        $("#Nbchoisis").text(nbActuel);
    });

    $("#PlusDeDée").click(function () {
        nbActuel++;
        $("#Nbchoisis").text(nbActuel);
    });


    // Lancer de dés
    $("#LancerDéeBoutton").click(function () {
        let nombreDes = parseInt($("#Nbchoisis").text(), 10);
        let typeDee = parseInt($("#Typechoisie").val(), 10);
        let resultats = Array.from({ length: nombreDes }, () => Math.floor(Math.random() * typeDee) + 1);

        alert("Résultats des lancers de dé : " + resultats.join(", "));
    });


    // Lecture d'un son
    $(".play-sound").click(function () {
        let audio = new Audio("/page/chronique/Audio_avec_leur_image/" + $(this).attr("id") + ".mp3");
        audio.play();
    });


    // Gestion des boutons et textarea
    $("#listdebloc .butbloc:first").addClass("choisi");
    $("#blocafficher .textarea:first").addClass("choisie");

    $(".butbloc").click(function () {
        let index = $(this).index();
        $(".butbloc").removeClass("choisi");
        $(".textarea").removeClass("choisie");

        $(this).addClass("choisi");
        $(".textarea").eq(index).addClass("choisie");
    });


    


    // Fonction pour définir un cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
    }

    // Gestion de la sauvegarde automatique des textareas
    $('.textarea').on('input', function() {
        const index = $(this).index(); // Index du textarea (0 à 4)
        const noteValue = $(this).val(); // Contenu du textarea
        setCookie(`blocknote${index + 1}`, noteValue, 30); // Sauvegarde dans un cookie pendant 30 jours
    });


    //Module de popup
    function createPopUp(message) {
        const face = [
            'https://lh6.googleusercontent.com/proxy/q8RK4L_o_R67FKsmvDH6CTbEg_8UqH8cph4AksgPhr6-FYjmE9XPHUKjx8E6-zpaLiANrSVSh2oML4EIQ5Y1v5b2bcyfkVwNVNAKsDIE7-o34o8waLitUx-Z_6ib0G6xk9dNRJXG7PmzPSU',
            'https://lh6.googleusercontent.com/proxy/4ry8H0Jl3vVCpwSGrL32YwOO2gRG0XAj84-vLq3TFq95vi0hptipZQ5CMQdki5gkOKGEBwEWqba1j3XuEhAC8-6l97TV4x_oC4PZVbdxuobCXLymiB-ieuyAVi5LfPEvVFyZGcVtNQNI',
            'https://lh3.googleusercontent.com/proxy/hoDZw18QhkJsqKyVWEzP_tR8D1n9JpF0A8oJVn20xEwWiKvKmdwFoyqIEMiONn2G1fEnuPgrcmmBIpB4oQC_CkfNGWLCy7XiTPYp3_E8sEn8pb47uz9mWKGBvT7Nmn6MskIhBR0BVSX6XcWrKAgvWET1Vg',
            'https://lh6.googleusercontent.com/proxy/gsCtkhCGlliI0CeADqBfqBsxG4IiFYrcCwBcNaqDZkB668qN_jPQDQMYqNELInJonjMQnNcdQbIkdnrSQabsqQ-At-j-oT6lin7wEafp9F9Fazl7L90_d53lsi2_bPET74W4a3EXSafS7yTV',
            'https://cdn.mobygames.com/promos/1584758-starcraft-ii-wings-of-liberty-avatar-adjutant.jpg',
            'https://lh3.googleusercontent.com/proxy/xx9Ar4Q8aFGgSytadfehUJ0sLt20o4owFOjEzSXlJEL9uVG16TPU6L8v9PtZItJXWWOhrMYKASR-FlHZnmNdgaUz4lgjEaKyWPSxgoJrxa-aa0_ug-SNzMiOActQid2lzHAJd2G52iDw6dYLQ-ZHm8ZdXkKHVHcQvQ'
        ];
    
        // Sélection aléatoire d'une image
        const randomFace = face[Math.floor(Math.random() * face.length)];
    
        // Création du HTML de la popup
        const popup = `
            <div style="display: flex; position: absolute; top: 10px; right: 10px; width: 250px; padding: 15px; background-color: #000000; color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.3);">
                <div style="cursor: pointer; margin-right: 10px;" onclick="this.parentElement.remove();" aria-label="Bouton pour fermer la popup">x</div>
                <div style="flex: 1;">
                    <div style="height: 100px; overflow-y: scroll; margin: 0 0 10px 0; direction: rtl;">
                        <p style="margin: 0; word-wrap: break-word; width: 100%; direction: ltr;">
                            ${message}
                        </p>
                    </div>
                    <img src="${randomFace}" alt="Image illustration" style="width: 80px; float: right;">
                </div>
            </div>
        `;
    
        // Ajout des styles pour la scrollbar
        const style = document.createElement('style');
        style.textContent = `
            div::-webkit-scrollbar {
                width: 6px;
            }
            div::-webkit-scrollbar-track {
                background: #333333;
                border-radius: 5px;
            }
            div::-webkit-scrollbar-thumb {
                background: #666666;
                border-radius: 5px;
            }
            div::-webkit-scrollbar-thumb:hover {
                background: #888888;
            }
        `;
        document.head.appendChild(style);
    
        // Retourne le HTML pour injection
        return popup;
    }


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

    //partie recherche
    const $bookmarkBtn = $('#bookmark-btn');
    const $glossaryBook = $('#glossary-book');
    const $closeBtn = $('.close-btn');
    const $searchInput = $('#search-term');
    const $categoryFilter = $('#category-filter');
    const $favoritesFilter = $('#favorites-filter'); // Nouvelle constante pour la case à cocher
    const $soundButtons = $('.sound-button');
    const $resetBtn = $('#reset-search');
    const $blocsound = $('#blocsound');
    // Fonction pour obtenir les favoris depuis le cookie
    function getFavorites() {
        const favorites = $.cookie('favorites');
        return favorites ? JSON.parse(favorites) : [];
    }
    // Fonction pour sauvegarder les favoris dans le cookie
    function setFavorites(favorites) {
        $.cookie('favorites', JSON.stringify(favorites), { expires: 30, path: '/' });
    }
    // Charger les favoris au démarrage
    let favorites = getFavorites();
    $soundButtons.each(function() {
        const $button = $(this);
        const id = $button.data('id');
        if (favorites.includes(id)) {
            $button.find('.fav-marker').addClass('active');
            $button.siblings('.fav-btn').addClass('favorited').text('Retirer des favoris').attr('title', 'Retirer des favoris');
        }
    });
    // Réorganiser les sons pour afficher les favoris en haut
    function reorderSounds() {
        const $allContainers = $soundButtons.parent('.buttoncontainer').detach();
        const $favContainers = $allContainers.filter(function() {
            return favorites.includes($(this).find('.sound-button').data('id'));
        });
        const $nonFavContainers = $allContainers.filter(function() {
            return !favorites.includes($(this).find('.sound-button').data('id'));
        });
        $blocsound.append($favContainers).append($nonFavContainers);
    }
    // Réorganiser les sons au démarrage
    reorderSounds();
    // Gestion des favoris
    $('.fav-btn').on('click', function(event) {
        event.stopPropagation();
        const $btn = $(this);
        const id = $btn.data('id');
        const isFavorited = favorites.includes(id);
        if (isFavorited) {
            favorites = favorites.filter(favId => favId !== id);
            $btn.removeClass('favorited').text('Ajouter aux favoris').attr('title', 'Ajouter aux favoris');
            $btn.siblings('.sound-button').find('.fav-marker').removeClass('active');
        } else {
            favorites.push(id);
            $btn.addClass('favorited').text('Retirer des favoris').attr('title', 'Retirer des favoris');
            $btn.siblings('.sound-button').find('.fav-marker').addClass('active');
        }
        setFavorites(favorites);
        reorderSounds();
        filterSounds();
    });
    // Gestion de l'ouverture/fermeture du livre
    $bookmarkBtn.on('click', function() {
        if ($glossaryBook.is(':visible')) {
            $glossaryBook.animate({ left: '-100%' }, 500, function() {
                $glossaryBook.hide();
            });
            $bookmarkBtn.removeClass('pulled');
        } else {
            $glossaryBook.show().css({ left: '-100%' }).animate({ left: '0' }, 500);
            $bookmarkBtn.addClass('pulled');
        }
    });
    $closeBtn.on('click', function() {
        $glossaryBook.animate({ left: '-100%' }, 500, function() {
            $glossaryBook.hide();
        });
        $bookmarkBtn.removeClass('pulled');
    });
    // Gestion de la recherche et du filtrage
    function filterSounds() {
        const searchText = $searchInput.val().toLowerCase().trim();
        const selectedCategory = $categoryFilter.val().toLowerCase().trim();
        const showOnlyFavorites = $favoritesFilter.is(':checked'); // Vérifie si la case est cochée
        $soundButtons.each(function() {
            const $button = $(this);
            const buttonName = $button.data('name');
            const buttonCategories = $button.data('categories').toLowerCase().split(',');
            const isFavorited = favorites.includes($button.data('id')); // Vérifie si le son est un favori
            // Vérifier si le nom correspond à la recherche textuelle
            const matchesName = buttonName.includes(searchText);
            // Vérifier si une catégorie est sélectionnée et si le bouton appartient à cette catégorie
            const matchesCategory = selectedCategory === '' || buttonCategories.includes(selectedCategory);
            // Vérifier si on doit afficher uniquement les favoris
            const matchesFavorites = !showOnlyFavorites || isFavorited;
            // Afficher ou masquer le bouton en fonction des critères
            if (matchesName && matchesCategory && matchesFavorites) {
                $button.parent().show();
            } else {
                $button.parent().hide();
            }
        });
        // Réorganiser les sons après le filtrage pour garder les favoris en haut
        reorderSounds();
    }
    // Écouter les changements dans la barre de recherche
    $searchInput.on('input', filterSounds);
    // Écouter les changements dans le menu déroulant des catégories
    $categoryFilter.on('change', filterSounds);
    // Écouter les changements sur la case à cocher des favoris
    $favoritesFilter.on('change', filterSounds);
    // Gestion de la réinitialisation de la recherche
    $resetBtn.on('click', function() {
        $searchInput.val('');
        $categoryFilter.val('');
        $favoritesFilter.prop('checked', false); // Réinitialiser la case à cocher
        $soundButtons.parent().show();
        reorderSounds();
    });

    // Effet de clic sur les boutons (modifié pour ignorer les clics sur .fav-btn)
    $(".buttoncontainer").mousedown(function(event) {
       // Ignorer si l'élément cliqué est un .fav-btn ou un de ses descendants
       if ($(event.target).closest('.fav-btn').length) {
           return; // Ne rien faire si le clic provient de .fav-btn
       }

       let $this = $(this);
       $this.addClass("clicked");
       $this.find(".animbutton").addClass("clicked");

       setTimeout(function() {
           $this.removeClass("clicked");
           $this.find(".animbutton").removeClass("clicked");
       }, 500);
    });

    

    // Récupérer le chemin de l'URL actuelle
    var currentPage = window.location.pathname || 'unknown';
    // Nettoyer le chemin (supprimer le "/" initial et l'extension .html ou .php si présente)
    currentPage = currentPage.replace(/^\/|(\.html|\.php)$/g, '') || 'index'; // Si vide, utiliser "index"
    
    // Suivre la page actuelle au chargement
    trackPageView(currentPage);

    let playingAudios = [];

    $(".sound-button, .play-sound").click(function () {
        let soundUrl = $(this).hasClass("sound-button")
            ? $(this).data("sound")
            : "/page/chronique/Audio_avec_leur_image/" + $(this).attr("id") + ".mp3";

        let audio = new Audio(soundUrl);
        audio.play();

        // Ajouter à la liste des sons en cours
        playingAudios.push(audio);

        // Nettoyage automatique quand le son se termine
        audio.addEventListener('ended', function () {
            playingAudios = playingAudios.filter(a => a !== audio);
        });
    });


    // Fonction pour tout arrêter
    $("#stop-sounds-btn").click(function () {
        playingAudios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        playingAudios = [];
    });


});
