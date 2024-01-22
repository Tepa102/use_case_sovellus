//main.js


function initializeApp() {
    // Käynnistä äänestysten näyttö käyttäjälle ja ylläpitäjälle
    updateAll();
    // Kutsu updatePollList
    updatePollList();
  
    // Kutsu updatePollsForAdmin
    updatePollsForAdmin();
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Käynnistä kaikki tarvittavat toiminnot
    initializeApp();
  });
  
  