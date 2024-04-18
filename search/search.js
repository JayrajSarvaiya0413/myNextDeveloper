document.addEventListener("DOMContentLoaded", async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchTerm = searchParams.get("q");

  try {
    if (searchTerm) {
      const searchResults = await searchPokemon(searchTerm);
      displaySearchResults(searchResults);
    } else {
      console.error("No search term provided");
    }
  } catch (error) {
    console.error(error);
  }
});

// Function to fetch search results from the PokeAPI
async function searchPokemon(searchTerm) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20&${searchTerm}`
  );
  const data = await response.json();
  return data.results;
}

// Function to display search results on the page
function displaySearchResults(searchResults) {
  const searchResultsList = document.getElementById("search-results-list");

  if (searchResults.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No results found.";
    searchResultsList.appendChild(noResultsMessage);
  } else {
    searchResults.forEach((result) => {
      const listItem = document.createElement("li");
      listItem.textContent = result.name;
      listItem.classList.add("pokemon-item");
      listItem.style.cursor = "pointer"; // Add cursor pointer
      searchResultsList.appendChild(listItem);

      // Add click event listener to each list item
      listItem.addEventListener("click", () => {
        // Redirect to details page for the selected Pokemon
        window.location.href = `../details/details.html?id=${result.name}`;
      });
    });
  }
}
