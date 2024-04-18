document.addEventListener("DOMContentLoaded", async () => {
  // Check if a Pokemon is stored locally
  let storedPokemon = JSON.parse(localStorage.getItem("randomPokemon"));
  const today = new Date().toLocaleDateString();
  console.log(storedPokemon);
  // If no stored Pokemon or it's been more than a day, fetch a new random Pokemon
  if (!storedPokemon || storedPokemon.date !== today) {
    storedPokemon = await getRandomPokemon();
    storedPokemon.date = today;
    localStorage.setItem("randomPokemon", JSON.stringify(storedPokemon));
  }

  // Display the stored Pokemon on the homepage
  displayRandomPokemon(storedPokemon);
});

// Function to fetch a random Pokemon from the PokeAPI
async function getRandomPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  const randomPokemonUrl = data.results[randomIndex].url;
  const pokemonResponse = await fetch(randomPokemonUrl);
  const pokemonData = await pokemonResponse.json();
  return pokemonData;
}

// Function to display the random Pokemon on the homepage
function displayRandomPokemon(randomPokemon) {
  const randomPokemonContainer = document.getElementById("random-pokemon");

  const pokemonName = document.createElement("h3");
  pokemonName.textContent = randomPokemon.name;
  randomPokemonContainer.appendChild(pokemonName);

  const pokemonImage = document.createElement("img");
  pokemonImage.src = randomPokemon.sprites.front_default;
  randomPokemonContainer.appendChild(pokemonImage);

  // You can add more details as needed
}
