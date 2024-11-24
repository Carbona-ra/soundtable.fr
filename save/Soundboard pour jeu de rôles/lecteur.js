function showElement(container) {
  var autreElements = container.querySelectorAll('.lecteurvideo');

  autreElements.forEach(function(autreElement) {
    autreElement.addEventListener('mouseover', function() {
      autreElement.style.width = '250px';
      autreElement.style.height = '150px';
      autreElement.classList.add('agrandi');
    });

    autreElement.addEventListener('mouseout', function() {
      autreElement.style.width = ''; 
      autreElement.style.height = ''; 
      autreElement.classList.remove('agrandi');
    });
  });
}

var container = document.querySelector('.bargauche');
showElement(container);

var mp3Files = [
  'annonceHRP.mp3',
  'Auramagic.mp3',
  'bouledefeu.mp3',
  'Bruitdevent.mp3',
  'Chauvesouris.mp3',
  'Corne.mp3',
  'Coupdefeu.mp3',
  'coupdépée.mp3',
  'coupdépéesanglant.mp3',
  'Crachadeflamme.mp3',
  'criedhomme.mp3',
  'criefemme.mp3',
  'Eboulement.mp3',
  'Electriciter.mp3',
  'hurlemementderage.mp3',
  'levelUp.mp3',
  'Passagesecret.mp3',
  'Portailmagic.mp3',
  'Portemétalique.mp3',
  'Reniflement.mp3',
  'Rugissement.mp3',
  'Siflotement.mp3',
  'Tonner.mp3',
  'Verrecasser.mp3',
  'Bruitdenuit.mp3',
  'hurlemenentderage.mp3',
  'hurlementdeloups.mp3',
  'invisible.mp3',
  'explotion.mp3',
];

function preloadMP3(fileName) {
  var audio = new Audio();
  var basePath = 'Audio_avec_leur_image/';
  audio.src = basePath + fileName;
  audio.preload = 'auto';


  audio.addEventListener('loadeddata', function() {
    console.log('Audio loaded:', file);
  });

  audio.addEventListener('error', function(error) {
    console.error('Error loading audio:', file, error);
  });
}

function preloadAllMP3() {
  for (let i = 0; i < mp3Files.length; i++) {
    preloadMP3(mp3Files[i]);
  }
}

function disparition() {
  const monBouton = document.querySelector('.monBouton');
  monBouton.style.opacity = '0';
  setTimeout(function() {
    monBouton.classList.add('disparut');
  }, 500); 
}


