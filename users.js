const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'kayttaja', password: 'salasana123', role: 'user' },
  ];


function createAccount(role) {
  const username = document.getElementById(`${role}Username`).value;
  const password = document.getElementById(`${role}Password`).value;

  // Tarkista, onko käyttäjätunnus jo olemassa
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    alert('Käyttäjätunnus on jo olemassa. Valitse toinen.');
    return;
  }

  // Lisää uusi käyttäjä
  users.push({ username, password, role });
  alert('Käyttäjätunnus luotu onnistuneesti!');
}
  
function login(role) {
  const usernameInput = document.getElementById('adminLoginUsername');
  const passwordInput = document.getElementById('adminLoginPassword');

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Etsi käyttäjä tietorakenteesta
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      // Tallenna kirjautunut käyttäjä paikalliseen tallennustilaan
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Tervetuloa, ${user.username}! Olet kirjautunut roolilla: ${user.role}`);

      if (user.role === 'admin') {
      // Ohjaa ylläpitäjä sivulle
      window.location.href = 'yllapitaja.html';
      } else {
      // Ohjaa tavallinen käyttäjä äänestys-sivulle
      window.location.href = 'aanestykset.html';
  }
  } else {
      alert('Virheellinen käyttäjätunnus tai salasana. Yritä uudelleen.');
  }
}

