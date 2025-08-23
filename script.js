let BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let pokemonsArray = [];
let detailedPokemons = [];
let speciesData = [];
let evoChain = [];
let displayedCount = 20;
let currentPokemonIndex = 0;
let totalAvailablePokemons = 0;
window.currentStatisticsTab = 'about';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//1. Rendering functions
//1.1 Render the first 20 pokemons

function displayPokemons(pokemonBatch){
  const container = document.getElementById('pokemons_container');
  pokemonBatch.forEach((pokemon, index) =>{
    container.innerHTML += allPokemonsTemplate(pokemon, currentPokemonIndex + index);
    setPokemonImgColor(pokemon);
  });
}

//1.2 render more pokemons
async function displayMorePokemons() {
  const button = document.getElementById("show_more_btn");
  if(currentPokemonIndex >= totalAvailablePokemons){
    button.disabled = true;
    return;
  } 
  button.disabled = true;
  toggleLoadingSpinner(true);
  try{
    await getPokemons(currentPokemonIndex, displayedCount);
  } catch (error){
    console.error("Error fetching more Pokemons:", error);
  }
  toggleLoadingSpinner(false);
  button.disabled = false;
}

//1.3. Render & hide loading screen
function toggleLoadingSpinner(show){
  const spinnerOverlay = document.getElementById('loading_spinner');
  if(show){
    spinnerOverlay.classList.remove('d-none');
  } else {
    spinnerOverlay.classList.add('d-none');
  }
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
  if(!Array.isArray(filteredResults)){
    return;
  }
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
  if(searchQuery === ''){
    showAllPokemons();
  } else {
    let filteredResults = searchPokemon(searchQuery);
    renderFilteredPokemons(filteredResults);
  }
});
