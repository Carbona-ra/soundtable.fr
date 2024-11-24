var boutons = document.getElementsByClassName('buttoncontainer');

  for (var i = 0; i < boutons.length; i++) {
      boutons[i].addEventListener('mousedown', function() {
          this.classList.add('clicked');
  
          var divInsideButtonContainer = this.querySelector('.animbutton');
  
          if (divInsideButtonContainer) {
              divInsideButtonContainer.classList.add('clicked');
          }
  
          var boutonActuel = this;
  
          setTimeout(function() {
              boutonActuel.classList.remove('clicked');
  
              if (divInsideButtonContainer) {
                  divInsideButtonContainer.classList.remove('clicked');
              }
          }, 500);
      });
  }
