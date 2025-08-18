let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";
let pokemonsArray = [];
let detailedPokemons = [];
let speciesData = [];
let evoChain = [];
let displayedCount = 20;
let currentPokemonIndex = 0;
window.currentStatisticsTab = 'about';

//1. Rendering functions
//1.1 Render the first 20 pokemons
function displayPokemons() {
  let container = document.getElementById("pokemons_container");
  let endIndex = Math.min(currentPokemonIndex + displayedCount, detailedPokemons.length);
  let batch = detailedPokemons.slice(currentPokemonIndex, endIndex);
  batch.forEach((pokemonDetails, index) => {
    container.innerHTML += allPokemonsTemplate(pokemonDetails, currentPokemonIndex + index);
    setPokemonImgColor(pokemonDetails);
  });
  currentPokemonIndex = endIndex;
}

//1.2 render more pokemons
function displayMorePokemons() {
  const button = document.getElementById("show_more_btn");
  if(currentPokemonIndex >= detailedPokemons.length){
    button.disabled = true;
  } else {
    button.disabled = true;
    showLoadingSpinner();
    setTimeout(() => {
      hideLoadingSpinner();
      displayPokemons();
      if(currentPokemonIndex < detailedPokemons.length){
        button.disabled = false;
      }
    }, 2000);
  }  
}

//1.3. Render & hide loading screen
function showLoadingSpinner() {
  let spinnerOverlay = document.getElementById("loading_spinner");
  spinnerOverlay.classList.remove("d-none");
}

function hideLoadingSpinner() {
  let spinnerOverlay = document.getElementById("loading_spinner");
  spinnerOverlay.classList.add("d-none");
}

//1.4.Render single pokemon overlay

function openOverlay(pokemonDetails) {
  let singlePokemonContainer = document.getElementById("single_pokemon_container");
  window.currentPokemon = pokemonDetails;
  singlePokemonContainer.innerHTML = singlePokemonTemplate(pokemonDetails);
  renderPokemonsStatistics(window.currentStatisticsTab, pokemonDetails);
  setActiveTabColor(window.currentStatisticsTab);
  setSinglePokemonImgColor(pokemonDetails);
  handleOverlayChanges();
}

function openOverlayByIndex(index) {
  currentOverlayIndex = index;
  let pokemonDetails = detailedPokemons[index];
  openOverlay(pokemonDetails);
}

async function renderPokemonsStatistics(tab, pokemonDetails) {
  window.currentStatisticsTab = tab;
  let container = document.getElementById("pokemon_statistics");
  switch (tab) {
    case "about":
      container.innerHTML = aboutTemplate(pokemonDetails);
      break;
    case "stats":
      container.innerHTML = statsTemplate(pokemonDetails);
      break;
    case "ability":
      container.innerHTML = abilityTemplate(pokemonDetails);
      break;
    case "evolution":
      container.innerHTML = await renderAllEvolutionChain(pokemonDetails.evoChain, pokemonDetails.name, pokemonDetails);
      break;
  }
}

//2.Search functions

function searchPokemon(searchQuery) {
  let trimmedQuery = searchQuery.trim().toLowerCase();
  if (trimmedQuery === "") {
    return showAllPokemons();
  } else if (trimmedQuery.length < 3) {
    return showErrorMessage();
  } else {
    return showSearchResults(trimmedQuery);
  }
}

function renderFilteredPokemons(filteredResults) {
  let container = document.getElementById("pokemons_container");
  container.innerHTML = "";
  filteredResults.forEach((pokemon) => {
    let pokemonIndex = detailedPokemons.findIndex((p) => p.name === pokemon.name);
    if (pokemonIndex !== -1) {
      container.innerHTML += allPokemonsTemplate(pokemon, pokemonIndex);
      setPokemonImgColor(pokemon);
    }
  });
}

let searchBar = document.getElementById("search_bar");
searchBar.addEventListener("input", function () {
  let searchQuery = searchBar.value.toLowerCase();
  let filteredResults = searchPokemon(searchQuery);
  renderFilteredPokemons(filteredResults);
});
