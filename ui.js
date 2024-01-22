// ui.js
function updateAll() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    if (currentUser) {
      if (currentUser.role === 'admin') {
        updatePollsForAdmin();
      } else {
        updatePollsForUsers();
      }
    }
  }
  
  