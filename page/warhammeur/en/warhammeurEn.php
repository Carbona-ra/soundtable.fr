<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Warharmies: Free Warhammer Necron army management tool. Create, save, and manage your Necron armies easily on mobile and desktop.">
    <meta name="keywords" content="Warhammer, army management tool, Necron, free, army creation, Warharmies">
    <meta name="author" content="Warharmies">
    <meta name="robots" content="index, follow">

    <!-- Open Graph for social media -->
    <meta property="og:title" content="Warharmies - Free Warhammer Necron Army Management Tool">
    <meta property="og:description" content="Create and manage your Necron armies with Warharmies, a free tool for Warhammer. Compatible with mobile and desktop.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://soundtable.fr/en/warhammeurArmise"> <!-- Replace with the actual URL -->
    <meta property="og:image" content="https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=670&h=691"> <!-- Replace with a representative image -->

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Warharmies - Free Warhammer Necron Army Management Tool">
    <meta name="twitter:description" content="Create and manage your Necron armies with Warharmies, a free tool for Warhammer. Compatible with mobile and desktop.">
    <meta name="twitter:image" content="https://www.warhammer.com/app/resources/catalog/product/920x950/99120110044_LokhustHeavyDestroyerLead.jpg?fm=webp&w=670&h=691"> <!-- Replace with a representative image -->

    <title>Warharmies - Free Warhammer Necron Army Management Tool</title>
    <link rel="icon" type="image/webp" href="/asset/favicon.webp">
    <link rel="stylesheet" href="/page/warhammeur/styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
</head>
<body>

<div class="langBtn">
    <a aria-label="go to the French version" href="https://soundtable.fr/warhammeurArmise">FR</a>
    <span>/</span>
    <a aria-label="go to the English version" href="https://soundtable.fr/en/warhammeurArmise"><bold>EN</bold></a>
</div>

<div class="container">
        <!-- Login section at the top -->
        <div id="loginSection" class="login-section">
            <div id="loginForm">
                <h2>Login</h2>
                <div>
                    <input type="text" id="username" placeholder="Username" required>
                    <input type="password" id="password" placeholder="Password" required>
                </div>
                <div>
                    <button type="button" id="loginBtn">Log In</button>
                    <button type="button" id="registerBtn">Sign Up</button>
                </div>
            </div>
            <div id="userInfo" style="display: none;">
                <p id="currentUserDisplay"></p>
                <button type="button" id="logoutBtn">Log Out</button>
            </div>
            <p>Warharmies is a <strong>free Warhammer army management tool</strong> dedicated to <strong>Necrons</strong>. Create, customize, and save your Necron armies easily, whether on mobile or desktop.</p>
            <p>Log in to save your armies or search for armies from other users. (Make sure to note your password if you sign up by filling in the fields and clicking sign up.)</p>
        </div>

        <!-- Army creation tool below -->
        <div id="mainInterface" class="main-interface">
            <div class="headerArmy" id="armyHeader" style="display: none;">
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
            </div>

            <h1>Create a Necron Army with Warharmies - Free Warhammer Tool</h1>

            <div id="selectorUnit">
                <label for="unitSelector">Select a unit:</label>
                <select id="unitSelector">
                    <option value="">Choose a unit</option>
                </select>
            </div>

            <!-- Selected unit details -->
            <div id="unitDetails" class="unit-details"></div>
            
            <!-- Selected army -->
            <h2>Your Necron Army - <span id="totalPoints">0</span> points</h2>
            <div id="selectedUnitsList" style="display: flex; flex-wrap: wrap;"></div>
        </div>
    </div>

    <script src="/page/warhammeur/en/UniteEntityEn.js"></script>
</body>
</html>
