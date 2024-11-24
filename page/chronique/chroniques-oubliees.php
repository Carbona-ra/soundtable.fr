<?php
     if ($_SERVER["REQUEST_METHOD"] && isset($_POST["coocky"])) {
        setcookie('blocknote1', $_POST['Bnote1']);
        setcookie('blocknote2', $_POST['Bnote2']);
        setcookie('blocknote3', $_POST['Bnote3']);
        setcookie('blocknote4', $_POST['Bnote4']);
        setcookie('blocknote5', $_POST['Bnote5']);

        header("Location: " . $_SERVER['PHP_SELF']);
        exit;
    }
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Boîte à son pour JDR</title>
    <meta name="Soudboard et ambiance pour jeu de rôle" content="Soudboard et ambiance">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/page/chronique/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/page/chronique/lancerDee.css">
    <script src="https://www.youtube.com/iframe_api"></script>
    <link rel="stylesheet" href="/page/chronique/bloc.css">
</head>
<body>
    <h1>Soundboard</h1> 
    <div class="arrière">
        <img src="/page/chronique/titre.png" class="titre">
        <img src="/page/chronique/blason.png" class="blason">
        <img src="/page/chronique/fonddécran.jpg" class="rempli">  
    </div>
    <div class="boutonnave">        
        <a href="/page/chronique/Page_forum/SoundtableForum.php">
        <button class="align-top blink">Forum</button> 
        </a> 
        <a href="/">
        <button class="align-top blink">Acceuil</button> 
        </a> 
    </div>

    <button class="monBouton align-top" onclick="preloadAllMP3(); disparition();">Clique pour charger tous les sons</button>
    
    <div id="blocsound">
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="invisible" alt="invisible" onclick="play_sound('invisible')">Invisible</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/invisible.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="bouledefeu" alt="boule de feu" onclick="play_sound('bouledefeu')">Boule de feu</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/bouldefeu.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="LevelUP" alt="Level UP" onclick="play_sound('LevelUP')">Sainte lumière</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/LevelUP.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="hurlemenentderage" alt="hurlemenent de rage" onclick="play_sound('hurlemenentderage')">Hurlemenent de rage</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/hurlemenentderage.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="coupdépée" alt="coup d'épée" onclick="play_sound('coupdépée')">Coup d'épée métalique</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/coupdépée.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="coupdépéesanglant" alt="coup d'épée sanglant" onclick="play_sound('coupdépéesanglant')">Coup d'épée sanglant</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/coupdépéesanglant.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="criefemme" alt="crie femme" onclick="play_sound('criefemme')">Crie de femme</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/criefemme.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="criedhomme" alt="crie d'homme" onclick="play_sound('criedhomme')">Crie d'homme</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/criedhomme.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Tonner" alt="Tonner" onclick="play_sound('Tonner')">Tonner</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Tonner.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Eboulement" alt="Eboulement" onclick="play_sound('Eboulement')">Eboulement</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Eboulement.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Reniflement" alt="Reniflement" onclick="play_sound('Reniflement')">Reniflement</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Reniflement.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Portailmagic" alt="Portail magic" onclick="play_sound('Portailmagic')">Portailmagic</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Portailmagic.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Auramagic" alt="Auramagic" onclick="play_sound('Auramagic')">Auramagic</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Auramagic.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Electriciter" alt="Electriciter" onclick="play_sound('Electriciter')">Electriciter</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Electriciter.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Portemétalique" alt="Portemétalique" onclick="play_sound('Portemétalique')">Porte métalique</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Portemétalique.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Passagesecret" alt="Passagesecret" onclick="play_sound('Passagesecret')">Passage secret</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Passagesecret.webp">
        </div> 
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Rugissement" alt="Rugissement" onclick="play_sound('Rugissement')">Rugissement</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Rugissementannimal.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Explotion" alt="Explotion" onclick="play_sound('Explotion')">Explotion</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Explotion.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Verrecasser" alt="Verrecasser" onclick="play_sound('Verrecasser')">Verre casser</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Verrecasser.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Passagesecret" alt="Coup de feu" onclick="play_sound('Coupdefeu')">Coup de feu</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/coupdefeu.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Corne" alt="Corne" onclick="play_sound('Corne')">Corne</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Corne.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Bruitdevent" alt="Bruit de vent" onclick="play_sound('Bruitdevent')">Bruit de vent</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Bruitdevent.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Crachadeflamme" alt="Cracha de flamme" onclick="play_sound('Crachadeflamme')">Cracha de flamme</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Crachadeflamme.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Siflotement" alt="Siflotement" onclick="play_sound('Siflotement')">Siflotement</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Siflotement.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="arbrequitombe" alt="arbre qui tombe" onclick="play_sound('arbrequitombe')">Arbre qui tombe</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Chute.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Bruitdenuit" alt="Bruit de nuit" onclick="play_sound('Bruitdenuit')">Bruit de nuit</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Bruitdenuit.webp">
        </div>   
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Hurlementdeloups" alt="Hurlement de loups" onclick="play_sound('hurlementdeloups')">Hurlement de loups</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Hurlementdeloups.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Chauvesouris" alt="Chauve souris" onclick="play_sound('Chauvesouris')">Chauve souris</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Chauvesouris.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Attackmental" alt="Attack mental" onclick="play_sound('Attackmental')">Attack mental</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/attackmentale.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Criedegroupe" alt="Cri de groupe" onclick="play_sound('Criedegroupe')">Cri de groupe</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Criedegroupe.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Artafect" alt="Artefact" onclick="play_sound('Artefact')">Artefact</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/artefact.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Grincementbois" alt="Bois qui grince" onclick="play_sound('Grincementbois')">Bois qui grince</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Boisquigrince.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="portequigrince" alt="porte qui grince" onclick="play_sound('portequigrince')">Porte qui grince</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Portequigrince.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="aplaudissement" alt="aplaudissement" onclick="play_sound('aplaudissement')">Aplaudissement</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/aplaudissement.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="MachineMecanique" alt="Machine Mecanique" onclick="play_sound('MachineMecanique')">Machine mécanique</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/MachineMecanique.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Flèche" alt="Flèche" onclick="play_sound('Flèche')">Flèche</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/flèche.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="VoléeFlèche" alt="Volée de Flèche" onclick="play_sound('VoléeFlèche')">Volée de Flèche</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Volléedefleche.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="Tirearcanic" alt="Tire arcanic" onclick="play_sound('Missilarcanique')">Tire arcanique</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/Missilarcanique.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="OndeDeChoc" alt="Onde De Choc" onclick="play_sound('OndeDeChoc')">Onde De Choc</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/OndeDeChoc.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="soupirmortelle" alt="soupir mortelle" onclick="play_sound('soupirmortelle')">Soupir mortelle</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/soupirmortelle.webp">
        </div>
        <div class="buttoncontainer">
            <button class="animbutton typo20px" id="coueurbattant" alt="coeur battant" onclick="play_sound('coeurbattant')">Coeur battant</button>
            <img class="imagebutton" src="/page/chronique/Audio_avec_leur_image/coeurbattant.webp">
        </div>
    </div>
    
    <div class="bargauche">        
        <h2 class="titre2">Ambiance</h2>  
         <div class="scrollable-section"> 
            <iframe class="lecteurvideo" id="firstvod" src="https://www.youtube.com/embed/kmCAm4_hlyQ?si=EOpU7D3ToojPa3O3" title="YouTube video player" alt="Pluie tranquille"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/pGw2ztHACxA?si=NW7znEi7gqkNIsmG" title="YouTube video player" alt="Musique de combat"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/vyg5jJrZ42s?si=FJn-m0n9B7Pbdu8F" title="YouTube video player" alt="Ambiance de taverne"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/aQqRSBMzDrU?si=kGM9uk6nCySWCG5E" title="YouTube video player" alt="Bruit de forêt vivante"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/bxoRRobHtGM?si=rJIdGYMJDH__guPg" title="YouTube video player" alt="Ambiance exploration de dongon"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/017yCQMfbzE?si=lNjMIU21rr020aVT" title="YouTube video player" alt="Ambiance inquitante"></iframe>
            <iframe class="lecteurvideo" src="https://www.youtube.com/embed/sHA_4wfQhE8" title="YouTube video player" alt="Debut de jdr"></iframe>
        </div> 
    </div>

    <div id="blocnote" class="z-10000">
        <p>azeazezaeza</p>
        <div id="listdebloc">
            <button class="butbloc" onclick="afficherTextarea(0)">1</button>
            <button class="butbloc" onclick="afficherTextarea(1)">2</button>
            <button class="butbloc" onclick="afficherTextarea(2)">3</button>
            <button class="butbloc" onclick="afficherTextarea(3)">4</button>
            <button class="butbloc" onclick="afficherTextarea(4)">5</button>
        </div>
        <div id="blocafficher">
            <form method="post" action="">
                <textarea class="textarea" name="Bnote1" placeholder="votre bloc note 1..."><?php echo isset($_COOKIE['blocknote1']) ? htmlentities($_COOKIE['blocknote1']) : ''; ?></textarea>
                <textarea class="textarea" name="Bnote2" placeholder="votre bloc note 2..."><?php echo isset($_COOKIE['blocknote2']) ? htmlentities($_COOKIE['blocknote2']) : ''; ?></textarea>
                <textarea class="textarea" name="Bnote3" placeholder="votre bloc note 3..."><?php echo isset($_COOKIE['blocknote3']) ? htmlentities($_COOKIE['blocknote3']) : ''; ?></textarea>
                <textarea class="textarea" name="Bnote4" placeholder="votre bloc note 4..."><?php echo isset($_COOKIE['blocknote4']) ? htmlentities($_COOKIE['blocknote4']) : ''; ?></textarea>
                <textarea class="textarea" name="Bnote5" placeholder="votre bloc note 5..."><?php echo isset($_COOKIE['blocknote5']) ? htmlentities($_COOKIE['blocknote5']) : ''; ?></textarea>
                <input type="submit" class="audessumonpote" name='coocky' value="Sauvegarder" Alt="(Dans les coocki)">
            </form>
        </div>
    </div>

    <div id="MenuDée">
    
    <button  id="openmenuD" class="align-top">Générateur de dée</button>
    
    <div id="LancerDeDée">
        <div id="Nbdée">
            <div>Combient de dée ?</div>
            <button id="MoinsDeDée">-</button>
            <p id="Nbchoisis">0</p>
            <button id="PlusDeDée">+</button>
        </div>    
        <div id="TypeDeDée">
            <div>Quel type de dées ?</div>
            <select id="Typechoisie">
                <option>4</option>
                <option>6</option>
                <option>8</option>
                <option>10</option>
                <option>12</option>
                <option>20</option>
            </select>
        </div>
        <button id="LancerDéeBoutton" class="align-top">Lancer !</button>
    </div>

</div>

    <script src="/page/chronique/blocknote.js"></script>
    <script src="/page/chronique/lecteur.js"></script>
    <script src="/page/chronique/anim.js"></script>
    <script src="/page/chronique/java.js"></script>
    <script src="/page/chronique/LancerDee.js"></script>

</body>
</html>



