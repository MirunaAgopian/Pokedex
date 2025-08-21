//1. Fetching data
//1.1 - GET all Pokemons

async function getPokemons(offset = 0, limit = displayedCount) {
  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const responseAsJson = await response.json();
  if(totalAvailablePokemons === 0){
    totalAvailablePokemons = responseAsJson.count;
  }
  const newResponse = await getSinglePokemon(responseAsJson.results);
  detailedPokemons.push(...newResponse);
  displayPokemons(newResponse);
  currentPokemonIndex += limit;
}

//1.2. GET individual pokemon

async function getSinglePokemon(pokemonsArray) {
  const allDetails = [];
  for(const pokemon of pokemonsArray){
    const response = await fetch(pokemon.url);
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
//THESE FUNCTIONS SHOULD BE REFRACTORED! SEE ALSO EVOLUTION.JS!
async function getSpeciesDetails(detailedPokemons) {
  let pokemonSpeciesDatails = [];
  for (let pokemon of detailedPokemons) {
    let response = await fetch(pokemon.species.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${pokemon.name}`);
    } else {
      let speciesDetails = await response.json();
      pokemonSpeciesDatails.push(speciesDetails);
    }
  }
  return pokemonSpeciesDatails;
}

async function getEvoChain(speciesData) {
  let pokemonEvoChain = [];
  for (let species of speciesData) {
    let response = await fetch(species.evolution_chain.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${species.name}`);
    } else {
      let evoChainDatails = await response.json();
      pokemonEvoChain.push(evoChainDatails);
    }
  }
  return pokemonEvoChain;
}

async function getCombinedEvolutionChainData(pokemonDetails){
    if (!pokemonDetails.speciesData || !pokemonDetails.evoChain) {
    const speciesData = await getSpeciesDetails([pokemonDetails]);
    const evoChain = await getEvoChain(speciesData);
    pokemonDetails.speciesData = speciesData[0];
    pokemonDetails.evoChain = evoChain;
  }
  return pokemonDetails.evoChain;
}
