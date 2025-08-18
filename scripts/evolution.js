function extractEvolutionStages(chain) {
  let stages = [];
  let current = chain;
  while (current) {
    const name = current.species.name;
    const image = extractEvolutionImages(name);
    stages.push({name, image});
    current = current.evolves_to?.[0];
  }
  return stages;
}

function extractEvolutionImages(name) {
  const match = detailedPokemons.find((p) => p.name.toLowerCase() === name.toLowerCase());
  return match?.sprites?.other.dream_world.front_default || "";
}


async function renderAllEvolutionChain(evoChainArray, targetPokemonName, pokemonDetails) {
  evoChainArray = await getCombinedEvolutionChainData(pokemonDetails);
  for (let chainData of evoChainArray) {
        const stages = extractEvolutionStages(chainData.chain);
        const matchFound = stages.some(stage => stage.name.toLowerCase() === targetPokemonName.toLowerCase());
    if (matchFound) {
      return evolutionTemplate(chainData);
    }
  }
  return "<p>No evolution chain found.</p>";
}