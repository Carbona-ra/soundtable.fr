// /asset/scripts/glossary.js

// Glossary data
const glossaryData = [
    {
        term: "Advance",
        description: "During the Movement phase, a unit can advance after its normal move by rolling a D6. Add the result in inches to its movement, but the unit cannot charge this turn."
    },
    {
        term: "Anti-X Y+",
        description: "Attacks with this rule automatically wound targets with the X keyword (e.g., Anti-Infantry) on a roll of Y+ or better, without rolling to wound."
    },
    {
        term: "Assault",
        description: "Weapons with this keyword allow the unit to shoot even after advancing, but only if the target is within range."
    },
    {
        term: "Blast",
        description: "Against a unit of 6 or more models, add +1 hit per 5 models in the target (rounded up). Does not work against Characters or attached units."
    },
    {
        term: "Deep Strike",
        description: "The unit can be deployed in Reserve and arrive on the battlefield from the end of the second round, more than 9\" from enemies."
    },
    {
        term: "Devastating Wounds",
        description: "A critical hit (usually a 6) inflicts mortal wounds, ignoring armor and invulnerable saves."
    },
    {
        term: "Fall Back",
        description: "A unit can withdraw from melee combat during the Movement phase, but it cannot shoot or charge this turn unless it has a special rule."
    },
    {
        term: "Feel No Pain X+",
        description: "Allows ignoring a wound or mortal wound on a roll of X or higher (e.g., 5+ to ignore on a 5 or 6)."
    },
    {
        term: "Fight First",
        description: "The unit can fight first in the Fight phase, even if it didn’t charge, unless another unit with Fight First is present."
    },
    {
        term: "Heavy",
        description: "A Heavy weapon gains +1 to hit if the unit carrying it remained stationary this turn."
    },
    {
        term: "Ignores Cover",
        description: "Attacks from this weapon ignore save bonuses granted by light or dense terrain."
    },
    {
        term: "Indirect Fire",
        description: "Allows shooting at targets out of line of sight, but they gain a cover bonus (+1 to save) and the attacker takes -1 to hit."
    },
    {
        term: "Infiltrators",
        description: "The unit can be deployed anywhere on the battlefield, more than 9\" from enemy deployment zones and units."
    },
    {
        term: "Lethal Hits",
        description: "A critical hit (usually a 6) automatically becomes a wound, without needing to roll to wound."
    },
    {
        term: "Melta",
        description: "At half the weapon’s range or less, add +2 to the damage roll for each successful wound."
    },
    {
        term: "Objective Secured",
        description: "Some units (like Troops) control objectives even if outnumbered by non-Objective Secured enemy units."
    },
    {
        term: "Overwatch",
        description: "Allows a unit to shoot outside its turn at an enemy unit that moves, charges, or performs an action, hitting on a 6 (modified by some rules)."
    },
    {
        term: "Pistol",
        description: "A Pistol weapon can be used to shoot in melee or after advancing, but only at a target within range."
    },
    {
        term: "Precision",
        description: "Attacks from this weapon can target a Character attached to a unit, even if the unit is the primary target."
    },
    {
        term: "Rapid Fire X",
        description: "At half the weapon’s maximum range, add X extra shots per weapon (e.g., Rapid Fire 1 on a Bolter gives 2 shots at 12\" or less)."
    },
    {
        term: "Scouts X\"",
        description: "Before the first turn, the unit can make a normal move up to X inches, respecting deployment restrictions."
    },
    {
        term: "Stealth",
        description: "The unit gains a cover bonus (+1 to save) against shooting attacks from more than 12\" away."
    },
    {
        term: "Sustained Hits X",
        description: "A critical hit (usually a 6) generates X additional hits."
    },
    {
        term: "Torrent",
        description: "Attacks from this weapon automatically hit, without needing to roll to hit."
    },
    {
        term: "Twin-Linked",
        description: "Allows rerolling failed wound rolls."
    },
    {
        term: "Command Re-roll",
        description: "A core Stratagem allowing rerolling a dice roll (hit, wound, save, etc.) for 1 Command Point."
    },
    {
        term: "Insane Bravery",
        description: "A Stratagem preventing a unit from failing a Morale test for 1 Command Point, but it suffers automatic losses if it fails afterward."
    },
    {
        term: "Wound Roll",
        description: "After a successful hit, a wound roll compares the weapon’s Strength to the target’s Toughness. For example, Strength 4 vs. Toughness 4 wounds on 4+."
    },
    {
        term: "Invulnerable Save",
        description: "A special save that cannot be modified by Armor Penetration. For example, a 4+ invulnerable save always succeeds on 4 or higher."
    },
    {
        term: "Moral Test",
        description: "At the end of the Morale phase, a unit that suffered losses tests its Leadership. Failure results in additional losses via Combat Attrition."
    },
    {
        term: "Aura",
        description: "An ability that affects friendly units within a certain range (e.g., 6\"), such as a Leadership bonus or dice roll rerolls."
    }
];

// Main function to initialize the glossary
(function ($) {
    // Inject CSS with adjustments
    const glossaryStyles = `
        .bookmark {
            position: fixed;
            bottom: 20px;
            left: 0;
            width: 146px;
            height: 81px;
            margin-left: -40px;
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
            text-shadow: 1px 1px 2px #000;
            font-family: 'MedievalSharp', cursive;
            position: absolute;
            width: 100px;
            right: 20px;
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
            color: transparent; /* Hides the "X" text */
        }

        .bookmark.pulled {
            width: 135px;
            height: 74.89px;
            margin-left: -20px;
            animation: none;
        }
            
        .bookmark.pulled span {
            font-size: 15px;
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
            display: none; /* Ensures the book is hidden initially */
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

    // Inject CSS into the <head>
    $('<style>').text(glossaryStyles).appendTo('head');

    // Inject HTML with "Glossary" text in the bookmark
    const glossaryHTML = `
        <div id="bookmark-btn" class="bookmark">
            <span>Glossary</span>
        </div>
        <div id="glossary-book" class="book">
            <div class="book-content">
                <h2>Imperium Glossary</h2>
                <button class="close-btn" aria-label="Close the Imperium Glossary">X</button>
                <input type="text" id="search-term" placeholder="Search for a keyword...">
                <div id="glossary-entries"></div>
            </div>
        </div>
    `;
    $('body').append(glossaryHTML);

    // Load the MedievalSharp font if not already loaded
    if (!$('link[href*="MedievalSharp"]').length) {
        $('<link>')
            .attr({
                href: 'https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap',
                rel: 'stylesheet'
            })
            .appendTo('head');
    }

    // Function to load glossary entries
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
            $entries.append('<p>No results found.</p>');
        }
    }

    // Initialize the glossary
    loadGlossary();

    // Dynamic search
    $('#search-term').on('input', function () {
        loadGlossary($(this).val());
    });

    // Bookmark animation and book open/close
    $('#bookmark-btn').on('click', function () {
        const $book = $('#glossary-book');
        const $bookmark = $(this);
        if ($book.is(':visible')) {
            // Close the book
            $book.animate({ left: '-100%' }, 500, function () {
                $book.hide();
            });
            $bookmark.removeClass('pulled');
        } else {
            // Open the book
            $book.show().css({ left: '-100%' }).animate({ left: '0' }, 500);
            $bookmark.addClass('pulled');
            loadGlossary();
        }
    });

    // Close button
    $('.close-btn').on('click', function () {
        $('#glossary-book').animate({ left: '-100%' }, 500, function () {
            $(this).hide();
        });
        $('#bookmark-btn').removeClass('pulled');
    });
})(jQuery);