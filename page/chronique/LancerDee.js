var MenuD = document.getElementById('openmenuD');
var MenuDee = document.getElementById('LancerDeDée');
  
MenuD.addEventListener('click', function() {
    if (MenuDee.style.display == 'block') {
        MenuDee.style.display = 'none';
    } else if (MenuDee.style.display == 'none') {
        MenuDee.style.display = 'block'; 
    } else if (MenuDee.style.display == '') {
        MenuDee.style.display = 'block'; 
    }
});

var MoinsDeDée = document.getElementById('MoinsDeDée');
var PlusDeDée = document.getElementById('PlusDeDée');
let Nbactuel = 0
var NbchoisisElement = document.getElementById('Nbchoisis');

MoinsDeDée.addEventListener('click', function() {
    Nbactuel -= 1;
    if ( Nbactuel < 0 ){
        Nbactuel = 0
    }
    NbchoisisElement.textContent = Nbactuel;
});

PlusDeDée.addEventListener('click', function() {
    Nbactuel += 1;
    if ( Nbactuel < 0 ){
        Nbactuel = 0
    }
    NbchoisisElement.textContent = Nbactuel;
});


function lancerDee(max) {
    return Math.floor(Math.random() * max) + 1;
}

function lancerDesAction() {
    var nombreDes = document.getElementById('Nbchoisis').textContent; 
    var typeDee = document.getElementById('Typechoisie').value; 
    var resultat = []; 
 
    for (var i = 0; i < nombreDes; i++) {
        resultat.push(lancerDee(typeDee));
    }

    alert("Résultats des lancers de dé : " + resultat.join(', '));
}

document.getElementById('LancerDéeBoutton').addEventListener('click', lancerDesAction);

