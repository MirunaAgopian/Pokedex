//1. Fetching data
//1.1 - GET all Pokemons

async function getPokemons(offset = 0, limit = displayedCount) {
  toggleLoadingSpinner(true);
  await delay(500);
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
  toggleLoadingSpinner(false);
}

//1.2. GET individual pokemon data

async function getDataFromServer(urls) {
    const serverData = [];
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
        } else {
            const details = await response.json();
            serverData.push(details);
        }
    }
    return serverData;
}

async function getSinglePokemon(pokemonsArray) {
    const urls = pokemonsArray.map(p => p.url);
    return getDataFromServer(urls);

}

async function getSpeciesDetails(detailedPokemons) {
    const urls = detailedPokemons.map(p => p.species.url);
    return getDataFromServer(urls);

 }

async function getEvoChain(speciesData) {
    const urls = speciesData.map(s => s.evolution_chain.url);
    return getDataFromServer(urls);
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