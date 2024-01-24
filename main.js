function initializeApp() {
  // Käynnistä äänestysten näyttö käyttäjälle ja ylläpitäjälle
  updateAll();
  // Kutsu updatePollList
  updatePollList();
  // Kutsu updatePollsForAdmin
  updatePollsForAdmin();
}

// Kutsu initializeApp, kun koko sivu on ladattu
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});
