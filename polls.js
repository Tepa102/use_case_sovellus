//polls.js

const pollListContainer = document.getElementById('pollList');
const polls = JSON.parse(localStorage.getItem('polls')) || [];

// Funktio äänestyksen luomiseen
function createPoll(event) {
    // Tarkista, onko käyttäjä kirjautunut sisään
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      alert('Kirjaudu sisään ensin.');
      return;
    }
  
    // Tarkista, onko käyttäjä ylläpitäjä
    if (currentUser.role !== 'admin') {
      alert('Sinulla ei ole oikeuksia luoda äänestyksiä.');
      return;
    }
  
    // Estä lomakkeen oletustoiminto (sivun päivittäminen)
    event.preventDefault();
  
    const title = document.getElementById('pollTitle').value;
    const description = document.getElementById('pollDescription').value;
    const options = document.getElementById('pollOptions').value.split(',');
  
    // Lisää uusi äänestys
    polls.push({ title, description, options, votes: Array(options.length).fill(0) });
  
    // Tallenna äänestykset paikalliseen tallennustilaan
    localStorage.setItem('polls', JSON.stringify(polls));
  
    // Päivitä äänestykset ylläpitäjälle
    updatePollsForAdmin();
  
    // Päivitä äänestykset listalle
    updatePollList();
  
    // Päivitä äänestykset käyttäjälle
    updatePollsForUsers();
  
    // Kutsu äänestyksen tilanteen päivittämistä
    updatePollResults();
  }
  
function updatePollsForUsers() {
  const userPollsContainer = document.getElementById('userPolls');

  // Tarkista, että elementti on olemassa ennen päivitystä
  if (!userPollsContainer) {
    console.error('Error: userPollsContainer not found.');
    return;
  }

  userPollsContainer.innerHTML = '';
  pollListContainer.innerHTML = '';

  polls.forEach((poll, pollIndex) => {
    const pollDiv = document.createElement('div');
    pollDiv.className = 'mb-4';

    pollDiv.innerHTML = `<h3>${poll.title}</h3>`;

    poll.options.forEach((option, optionIndex) => {
      pollDiv.innerHTML += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="poll${pollIndex}" id="pollOption${pollIndex}_${optionIndex}" value="${optionIndex}" ${isDisabled()}>
          <label class="form-check-label" for="pollOption${pollIndex}_${optionIndex}">
            ${option}
          </label>
        </div>`;
    });

    pollDiv.innerHTML += `<button class="btn btn-primary mt-2" onclick="submitVote(${pollIndex})" ${isDisabled()}>Äänestä</button>`;

    userPollsContainer.appendChild(pollDiv);
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Näytä "Luo äänestys" -osa vain ylläpitäjälle
  if (currentUser && currentUser.role === 'admin') {
    const createPollDiv = document.createElement('div');
    createPollDiv.innerHTML = `
      <h3>Luo äänestys</h3>
      <form onsubmit="createPoll()">
        <div class="mb-3">
          <label for="pollTitle" class="form-label">Äänestyksen nimi</label>
          <input type="text" class="form-control" id="pollTitle" required>
        </div>
        <div class="mb-3">
        <label for="pollDescription" class="form-label">Kuvaus</label>
        <input type="text" class="form-control" id="pollDescription" required>
      </div>
        <div class="mb-3">
          <label for="pollOptions" class="form-label">Vaihtoehdot (erottele pilkulla)</label>
          <input type="text" class="form-control" id="pollOptions" required>
        </div>
        <button type="submit" class="btn btn-primary">Luo äänestys</button>
      </form>`;

    userPollsContainer.appendChild(createPollDiv);
  }
}

// Äänestyksen päivitys ylläpitäjälle
function updatePollsForAdmin() {
  console.log('Updating admin polls...');

  const adminPollsContainer = document.getElementById('adminPolls');
  if (!adminPollsContainer) {
    console.error('Error: adminPollsContainer not found.');
    return;
  }

  // Tyhjennä kontaineri ennen päivitystä
  adminPollsContainer.innerHTML = '';

  polls.forEach((poll, pollIndex) => {
    const pollDiv = document.createElement('div');
    pollDiv.className = 'mb-4';

    pollDiv.innerHTML = `<h3>${poll.title}</h3>`;

    // Lisää äänestyksen kuvaus
    pollDiv.innerHTML += `<p>${poll.description}</p>`;

    poll.options.forEach((option, optionIndex) => {
      pollDiv.innerHTML += `<p>${option}</p>`;
    });

    // Lisää äänestyksen poistonappi
    pollDiv.innerHTML += `<button class="btn btn-danger mt-2" onclick="deletePoll(${pollIndex})">Poista äänestys</button>`;

    adminPollsContainer.appendChild(pollDiv);
  });
}
  
// Äänestyksen poisto
function deletePoll(pollIndex) {
  const confirmation = confirm('Haluatko varmasti poistaa tämän äänestyksen?');
  if (confirmation) {
    // Poista äänestys taulukosta
    polls.splice(pollIndex, 1);

    // Tallenna päivitetty äänestystiedot paikalliseen tallennustilaan
    localStorage.setItem('polls', JSON.stringify(polls));

    // Päivitä äänestykset ylläpitäjälle
    updatePollsForAdmin();
  }
}

function submitVote(pollIndex) {
  // Tarkista, onko käyttäjä kirjautunut sisään
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Kirjaudu sisään ensin.');
    return;
  }

  // Lataa äänestykset paikalliseen tallennustilaan
  //const polls = JSON.parse(localStorage.getItem('polls')) || [];
  console.log('Ennen äänestämistä:', polls); // Lisätty debug-tuloste
  const selectedOption = document.querySelector(`input[name="poll${pollIndex}"]:checked`);

  if (selectedOption) {
    const optionIndex = parseInt(selectedOption.value, 10);
    vote(pollIndex, optionIndex);
    alert('Äänesi on tallennettu!');

    // Tallenna käyttäjän äänestystila tähän äänestykseen
    const hasVotedKey = `hasVoted${currentUser.username}_poll${pollIndex}`;
    localStorage.setItem(hasVotedKey, 'true');

    // Päivitä äänestyksen tilanne äänestämisen jälkeen
    updatePollResults();

    console.log('Päivitetty äänestystilanne:', polls);
  } else {
    alert('Valitse vaihtoehto ennen äänestämistä.');
  }
}

// Ääniä äänestyksille
function vote(pollIndex, optionIndex) {
  polls[pollIndex].votes[optionIndex]++;
    // Päivitä äänestykset paikalliseen tallennustilaan
    localStorage.setItem('polls', JSON.stringify(polls));
    // Päivitä äänestykset käyttäjälle
    updatePollsForUsers();
  }

function isDisabled(pollIndex) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedOption = document.querySelector(`input[name="poll${pollIndex}"]:checked`);

  // Piilota äänestyksen tilanne, jos käyttäjä ei ole kirjautunut sisään, jos ääni on jo annettu,
  // tai jos käyttäjä ei ole äänestänyt
  if (!currentUser || selectedOption) {
    return 'disabled';
  }

  // Tarkista, onko käyttäjä äänestänyt kyseisessä äänestyksessä
  const hasVotedKey = `hasVoted${currentUser.username}_poll${pollIndex}`;
  if (localStorage.getItem(hasVotedKey)) {
    return 'disabled';
  }

  return '';
}

function deleteSelectedPolls() {
  const selectedPolls = document.querySelectorAll('input:checked');
  selectedPolls.forEach(poll => {
    const pollIndex = poll.value;
    polls.splice(pollIndex, 1);
  });

  localStorage.setItem('polls', JSON.stringify(polls));
  updatePollList();
  updatePollsForAdmin();
}

// Kutsu updatePollResults sivun latautuessa
updatePollResults();

// Funktio äänestyksen tilanteen päivittämiseen
function updatePollResults() {
  const pollResultsContainer = document.getElementById('pollResults');

  // Tarkista, että elementti on olemassa ennen päivitystä
  if (!pollResultsContainer) {
    console.error('Error: pollResultsContainer not found.');
    return;
  }

  pollResultsContainer.innerHTML = '';

  polls.forEach((poll, pollIndex) => {
    const pollResultDiv = document.createElement('div');
    pollResultDiv.className = 'mb-4';

    pollResultDiv.innerHTML = `<h3>${poll.title}</h3>`;

    poll.options.forEach((option, optionIndex) => {
      const totalVotes = poll.votes.reduce((acc, vote) => acc + vote, 0);
      if (isNaN(totalVotes)) {
        console.error('Error: totalVotes is NaN.');
        return;
      }

      const percentage = totalVotes !== 0 ? calculatePercentage(poll.votes[optionIndex], totalVotes) : 0;

      pollResultDiv.innerHTML += `<p>${option}: ${poll.votes[optionIndex]} ääntä (${percentage}%)</p>`;
    });

    pollResultsContainer.appendChild(pollResultDiv);
  });
}

// Apufunktio äänimäärän prosenttiosuuden laskemiseen
function calculatePercentage(votes, totalVotes) {
  if (totalVotes === 0) {
    return 0;
  }
  return ((votes / totalVotes) * 100).toFixed(2);
}

//polls[2].description = 'Mistä vuodenajasta pidät?';
//localStorage.setItem('polls', JSON.stringify(polls));