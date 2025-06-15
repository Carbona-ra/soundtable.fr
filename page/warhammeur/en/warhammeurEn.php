<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Warharmies: Free Warhammer army management tool for Necrons. Create, save, and manage your Necron armies easily on mobile and desktop.">
    <meta name="keywords" content="Warhammer, army management tool, Necron, free, army creation, Warharmies">
    <meta name="author" content="Warharmies">
    <meta name="robots" content="index, follow">

    <!-- Open Graph for social media -->
    <meta property="og:title" content="Warharmies - Free Warhammer Necron Army Management Tool">
    <meta property="og:description" content="Create and manage your Necron armies with Warharmies, a free Warhammer tool. Compatible with mobile and desktop.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://soundtable.fr/en/warhammeurArmise"> <!-- Replace with actual URL -->
    <meta property="og:image" content="https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=670&h=691"> <!-- Replace with a representative image -->

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Warharmies - Free Warhammer Necron Army Management Tool">
    <meta name="twitter:description" content="Create and manage your Necron armies with Warharmies, a free Warhammer tool. Compatible with mobile and desktop.">
    <meta name="twitter:image" content="https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=670&h=691"> <!-- Replace with a representative image -->

    <title>Warharmies - Free Warhammer Necron Army Management Tool</title>
    <link rel="icon" type="image/webp" href="/asset/favicon2.webp">
    <link rel="stylesheet" href="/page/warhammeur/styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
</head>
<body>

<div class="langBtn">
    <a aria-label="Go to French version" href="https://soundtable.fr/warhammeurArmise">FR</a>
    <span>/</span>
    <a aria-label="Go to English version" href="https://soundtable.fr/en/warhammeurArmise"><b>EN</b></a>
</div>

<div class="container">
    <!-- Login section at the top -->
    <!-- <div id="loginSection" class="login-section">
        <div id="loginForm">
            <h2>Login</h2>
            <div id="connectiondiv">
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
            </div>
            <div>
                <button type="button" id="loginBtn">Log In</button>
                <button type="button" id="registerBtn">Register</button>
            </div>
        </div>
        <div id="userInfo" style="display: none;">
            <p id="currentUserDisplay"></p>
            <button type="button" id="logoutBtn">Log Out</button>
        </div>
        <p>Warharmies is a <strong>free Warhammer army management tool</strong> dedicated to <strong>Necrons</strong>. Easily create, customize, and save your Necron armies, whether on mobile or desktop.</p>
        <p>Log in to save your armies or search for armies created by other users (be sure to note your password if you register by filling in the fields and clicking Register).</p>
    </div> -->

    <!-- Army creation tool below -->
    <div id="mainInterface" class="main-interface">
        <!-- <div class="headerArmy" id="armyHeader" style="display: none;">
            <div class="army-controls">
                <input type="text" id="searchUsername" placeholder="Search for a user">
                <button type="button" id="searchArmiesBtn">Search</button>
            </div>
            <div class="army-controls">
                <input type="text" id="armyName" placeholder="Army name">
                <button type="button" id="saveArmyBtn">Save</button>
            </div>
            <button type="button" id="updateArmyBtn">Update Army</button>
            <select id="savedArmies">
                <option value="">Choose a saved army</option>
            </select>
        </div> -->

        <h1>Create a Necron Army with Warharmies - Free Warhammer Tool</h1>

        <!-- Bouton pour ouvrir la popup -->
        <button id="viewDetachmentsBtn">See the detachments</button>

        <!-- Popup des détachements -->
        <div id="detachmentInfoPopup" class="popup" style="display: none;">
            <div class="popup-content">
                <h2>Detachments</h2>
                <button id="closeDetachmentInfoPopupBtn" class="close-btn">×</button>
                <div id="detachmentAccordion" class="accordion"></div>
            </div>
        </div>

        <!-- Button to open the popup -->
        <button id="openUnitPopupBtn">Add a Unit</button>

        <!-- Popup structure -->
        <div id="unitPopup" class="popup" style="display: none;">
            <div class="popup-content">
                <button id="closeUnitPopupBtn" class="close-btn">×</button>
                <h2>Choose a Unit</h2>
                <div class="scroll-section">
                    <div id="unitList" class="unit-list"></div>
                </div>
            </div>
        </div>
        
        <!-- Selected army -->
        <h2>Your Necron Army - <span id="totalPoints">0</span> pts</h2>
        <div id="selectedUnitsList" style="display: flex; flex-wrap: wrap;"></div>
    </div>
</div>

<script src="/page/warhammeur/en/UniteEntityEn.js"></script>
<script src="../../asset/scripts/glossaire40k.js"></script>
</body>
</html>