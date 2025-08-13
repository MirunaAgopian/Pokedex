let BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0'
let pokemonsArray = [];
let detailedPokemons = [];
let speciesData = [];
let evoChain = [];
let displayedCount = 20;
let currentPokemonIndex = 0;



//1. Fetching data
//1.1 - GET all 40 Pokemons

async function getPokemons(path=""){
    let response = await fetch(BASE_URL + path + ".json");

    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
        let responseAsJson = await response.json();
        pokemonsArray = responseAsJson.results;

        detailedPokemons = await getSinglePokemon(pokemonsArray);
        speciesData = await  getSpeciesDetails(detailedPokemons);
        evoChain = await getEvoChain(speciesData);

        displayPokemons();
        console.log(evoChain);     
    }
   
}

//1.2. GET individual pokemon 
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

//1.3. GET species data and evo chain

async function getSpeciesDetails(detailedPokemons){
    let pokemonSpeciesDatails =[];
    for(let pokemon of detailedPokemons){
        let response = await fetch(pokemon.species.url);

        if(!response.ok){
            throw new Error(`Failed to fetch ${pokemon.name}`);
            
        } else {
            let speciesDetails = await response.json();
            pokemonSpeciesDatails.push(speciesDetails);
        }
    }

    return pokemonSpeciesDatails;
    
}

async function getEvoChain(speciesData){
    let pokemonEvoChain =[];
    for(let species of speciesData){
        let response = await fetch(species.evolution_chain.url);

        if(!response.ok){
            throw new Error(`Failed to fetch ${species.name}`);
            
        } else {
            let evoChainDatails = await response.json();
            pokemonEvoChain.push(evoChainDatails);
        }
    }

    return pokemonEvoChain;
    
}

//2. Rendering functions
//2.1 Render the first 20 pokemons

function displayPokemons(){
    let container = document.getElementById('pokemons_container');
    container.innerHTML = '';

    let batch = detailedPokemons.slice(0, displayedCount);
    batch.forEach((pokemonDetails, index) => {
        container.innerHTML += allPokemonsTemplate(pokemonDetails, index);
        applyPokemonsBackground(pokemonDetails);
    });
}



//2.2 render the last 20 pokemons
function displayMorePokemons(){
    displayedCount = pokemonsArray.length;
    showLoadingSpinner();
    setTimeout(hideLoadingSpinner, 2000);
    displayPokemons();
    document.getElementById('show_more_btn').disabled = true;
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

//2.4.Render single pokemon overlay

function openOverlay(pokemonDetails){
   let overlay = document.getElementById('overlay');
   let singlePokemonContainer = document.getElementById('single_pokemon_container');

   window.currentPokemon = pokemonDetails;
   singlePokemonContainer.innerHTML = singlePokemonTemplate(pokemonDetails);
   renderPokemonsStatistics('about', pokemonDetails);

   overlay.classList.remove('d-none');
   singlePokemonContainer.classList.remove('d-none');
   document.body.classList.add('lock-scroll');
}

function openOverlayByIndex(index){
    currentPokemonIndex = index;
    let pokemonDetails = detailedPokemons[index];
    openOverlay(pokemonDetails);
    // applyPokemonsBackground(pokemonDetails);
}


function renderPokemonsStatistics(section, pokemonDetails) {
    let container = document.getElementById('pokemon_statistics');
    switch(section){
        case 'about':
            container.innerHTML = aboutTemplate(pokemonDetails);
            break;
        case 'stats':
            container.innerHTML = statsTemplate(pokemonDetails);
            break;
        case 'ability':
            container.innerHTML = abilityTemplate(pokemonDetails);
            break;
        case 'evolution':
            container.innerHTML = evolutionTemplate(pokemonDetails);
            break;
    }
}

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
