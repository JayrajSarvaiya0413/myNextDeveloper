document.addEventListener("DOMContentLoaded", async () => {
  const pokemonId = getPokemonIdFromUrl();
  try {
    const pokemonDetails = await getPokemonDetails(pokemonId);
    displayPokemonDetails(pokemonDetails);
  } catch (error) {
    console.error(error);
  }
});

// Function to extract the Pokemon ID from the URL query parameter
function getPokemonIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Function to fetch Pokemon details from the PokeAPI
async function getPokemonDetails(pokemonId) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const data = await response.json();
  return data;
}

// Function to display Pokemon details on the page
function displayPokemonDetails(pokemonDetails) {
  const pokemonDetailsContainer = document.getElementById("pokemon-details");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemonDetails.name;
  pokemonDetailsContainer.appendChild(pokemonName);

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemonDetails.sprites.front_default;
  pokemonDetailsContainer.appendChild(pokemonImage);

  const types = document.createElement("p");
  types.textContent = `Types: ${pokemonDetails.types
    .map((type) => type.type.name)
    .join(", ")}`;
  pokemonDetailsContainer.appendChild(types);

  // Add more details as needed (e.g., abilities, stats, etc.)
}
