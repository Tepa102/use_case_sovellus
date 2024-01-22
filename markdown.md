markdown
use case

# Äänestyssovellus Käyttötapaukset

## 1. Käyttäjä: Selailla Äänestyksiä

### Käyttötapaus: Selailla Äänestyksiä

- **Käyttäjät:** Tavallinen käyttäjä
- **Laukaisija:** Käyttäjä avaa sovelluksen etusivun.
- **Esiehto:** Käyttäjä on kirjautunut sisään.
- **Jälkiehto:** Käyttäjä näkee listan äänestyksistä.
- **Käyttötapauksen kulku:**
  1. Käyttäjä avaa sovelluksen etusivun.
  2. Sovellus näyttää listan ajankohtaisista äänestyksistä.

### Poikkeuksellinen Toiminta

- Jos käyttäjä ei ole kirjautunut sisään, ohjataan kirjautumissivulle.

## 2. Käyttäjä: Katsoa Äänestystilanne

### Käyttötapaus: Katsoa Äänestystilanne

- **Käyttäjät:** Tavallinen käyttäjä
- **Laukaisija:** Käyttäjä valitsee tietyn äänestyksen listalta.
- **Esiehto:** Käyttäjä on kirjautunut sisään ja äänestykset ovat saatavilla.
- **Jälkiehto:** Käyttäjä näkee äänestyksen nykyisen tilanteen.
- **Käyttötapauksen kulku:**
  1. Käyttäjä valitsee äänestyksen listalta.
  2. Sovellus näyttää äänestyksen tiedot ja nykyisen tilanteen.

### Poikkeuksellinen Toiminta

- Jos äänestystä ei ole saatavilla, ilmoitetaan käyttäjälle.

## 3. Käyttäjä: Äänestää Äänestystä

### Käyttötapaus: Äänestää Äänestystä

- **Käyttäjät:** Tavallinen käyttäjä
- **Laukaisija:** Käyttäjä valitsee äänestyksen ja äänestää.
- **Esiehto:** Käyttäjä on kirjautunut sisään ja äänestykset ovat saatavilla.
- **Jälkiehto:** Käyttäjä näkee äänestyksen päivittyneen tilanteen.
- **Käyttötapauksen kulku:**
  1. Käyttäjä valitsee äänestyksen listalta.
  2. Käyttäjä äänestää ehdokasta.
  3. Sovellus päivittää äänestyksen tilanteen.

### Poikkeuksellinen Toiminta

- Jos äänestystä ei ole saatavilla, ilmoitetaan käyttäjälle.
- Jos käyttäjä on jo äänestänyt samassa äänestyksessä, ilmoitetaan siitä.

## 4. Ylläpitäjä: Luoda Uusi Äänestys

### Käyttötapaus: Luoda Uusi Äänestys

- **Käyttäjät:** Ylläpitäjä
- **Laukaisija:** Ylläpitäjä haluaa luoda uuden äänestyksen.
- **Esiehto:** Ylläpitäjä on kirjautunut sisään.
- **Jälkiehto:** Uusi äänestys näkyy käyttäjille.
- **Käyttötapauksen kulku:**
  1. Ylläpitäjä valitsee vaihtoehdon luoda uusi äänestys.
  2. Ylläpitäjä määrittelee äänestyksen tiedot (otsikko, ehdokkaat jne.).
  3. Sovellus tallentaa uuden äänestyksen.

### Poikkeuksellinen Toiminta

- Jos ylläpitäjä ei ole kirjautunut sisään, ohjataan kirjautumissivulle.

## 5. Ylläpitäjä: Poistaa Äänestys

### Käyttötapaus: Poistaa Äänestys

- **Käyttäjät:** Ylläpitäjä
- **Laukaisija:** Ylläpitäjä haluaa poistaa vanhentuneen äänestyksen.
- **Esiehto:** Ylläpitäjä on kirjautunut sisään.
- **Jälkiehto:** Poistettu äänestys ei näy enää käyttäjille.
- **Käyttötapauksen kulku:**
  1. Ylläpitäjä valitsee äänestyksen poistamisvaihtoehdon.
  2. Sovellus vahvistaa poiston.
  3. Sovellus poistaa valitun äänestyksen.

### Poikkeuksellinen Toiminta

- Jos ylläpitäjä ei ole kirjautunut sisään, ohjataan kirjautumissivulle.






