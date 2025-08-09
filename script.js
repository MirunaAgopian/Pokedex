let BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0'
let pokemonsArray = [];
let detailedPokemons = [];
let displayedCount = 20;

//1. Fetching data - GET all 40 Pokemons

async function getPokemons(path=""){
    let response = await fetch(BASE_URL + path + ".json");

    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
        let responseAsJson = await response.json();
        pokemonsArray = responseAsJson.results;
        detailedPokemons = await getSinglePokemon(pokemonsArray);
        displayPokemons();
                
    }
   
}

//1.2. Fetching data - GET individual pokemon 
async function getSinglePokemon(pokemonsArray){
    let allDetails = [];
    for(let pokemon of pokemonsArray) {
        let response = await fetch(pokemon.url);

        if(!response.ok){
            throw new Error(`Failed to fetch ${pokemon.name}`);
        } else {
            pokemonDetails = await response.json();
            allDetails.push(pokemonDetails);
        }
    }

    return allDetails;
}

//2. Rendering functions
//2.1 Render the first 20 pokemons

function displayPokemons(){
    let container = document.getElementById('pokemons_container');
    container.innerHTML = '';

    let batch = detailedPokemons.slice(0, displayedCount);
    batch.forEach(pokemonDetails => {
        container.innerHTML += allPokemonsTemplate(pokemonDetails);
        applyPokemonsBackground(pokemonDetails);
    });

}

//2.2 render the last 20 pokemons
function displayMorePokemons(){
    displayedCount = pokemonsArray.length;
    showLoadingSpinner();
    setTimeout(hideLoadingSpinner, 2000);
    displayPokemons();
}

//2.3. Render & hide loading screen
function showLoadingSpinner(){
    let spinnerOverlay = document.getElementById('loading_spinner');
    spinnerOverlay.classList.remove('d-none');
}

function hideLoadingSpinner(){
    let spinnerOverlay = document.getElementById('loading_spinner');
    spinnerOverlay.classList.add('d-none');
}

//2.4.Render single pokemon overlay...

//3.Search functions

function searchPokemon(searchQuery) {
    let trimmedQuery = searchQuery.trim().toLowerCase();

    if(trimmedQuery === ''){
        return showAllPokemons();
    } else if(trimmedQuery.length < 3){
        return showErrorMessage();
    } else {
        return showSearchResults(trimmedQuery);
    }
}

function renderFilteredPokemons(filteredResults){
    let container = document.getElementById('pokemons_container');
    container.innerHTML = '';

    filteredResults.forEach(pokemon => {
        let pokemonIndex = detailedPokemons.findIndex(p => p.name === pokemon.name);

        if(pokemonIndex !== -1){
            container.innerHTML += allPokemonsTemplate(pokemon);
            applyPokemonsBackground(pokemon);
        }
    });
}

let searchBar = document.getElementById('search_bar');
searchBar.addEventListener('input', function(){
    let searchQuery = searchBar.value.toLowerCase();
    let filteredResults = searchPokemon(searchQuery);
    renderFilteredPokemons(filteredResults);
});
