const firstButton = document.querySelector('#listdebloc .butbloc:first-child');
firstButton.classList.add('choisi');

const firstTextarea = document.querySelector('#blocafficher .textarea:first-child');
firstTextarea.classList.add('choisie');

function afficherTextarea(index) {
    var textareas = document.querySelectorAll('.textarea');
    var buttons = document.querySelectorAll('.butbloc');

    textareas.forEach((textarea) => {
        textarea.classList.remove('choisie');
    });

    buttons.forEach((button) => {
        button.classList.remove('choisi');
    });

    textareas[index].classList.add('choisie');
    buttons[index].classList.add('choisi');
}


