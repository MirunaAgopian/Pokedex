//1. Fetching data
//1.1 - GET all 40 Pokemons

async function getPokemons(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  } else {
    let responseAsJson = await response.json();
    pokemonsArray = responseAsJson.results;
    detailedPokemons = await getSinglePokemon(pokemonsArray);
    speciesData = await getSpeciesDetails(detailedPokemons);
    evoChain = await getEvoChain(speciesData);
    displayPokemons();
  }
}

//1.2. GET individual pokemon
async function getSinglePokemon(pokemonsArray) {
  let allDetails = [];
  for (let pokemon of pokemonsArray) {
    let response = await fetch(pokemon.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${pokemon.name}`);
    } else {
      pokemonDetails = await response.json();
      allDetails.push(pokemonDetails);
    }
  }
  return allDetails;
}

//1.3. GET species data and evo chain

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