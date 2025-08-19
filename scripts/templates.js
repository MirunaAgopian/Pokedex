//1. template function for the pokemons (all 40)
function allPokemonsTemplate(pokemonDetails, index){
    let number = pokemonDetails.id;
    let name = pokemonDetails.name;
    let image = pokemonDetails.sprites.other.dream_world.front_default;
    let sound = pokemonDetails.cries.latest;
    let type = pokemonDetails.types[0].type.name;

    return` <div onclick='openOverlayByIndex(${index})' class="pokemon-general-details">
            <h3><span>${number}</span>${name}</h3>
            <div id='pokemon_${number}' class='poke-background'>
                <img src='${image}' alt='${name}'>
            </div>
            <div class='abilities-general'>
                <p>${type}</p>
                <div class='audio-container'>
                    <img onclick='event.stopPropagation(); playPokemonSound("${sound}")' 
                    class='play-btn' 
                    src="./assets/img/play_btn.svg" 
                    alt="play button to hear the pokemon's sound">
                </div>
            </div>
    </div>`;

}

//2. template function for Pokemon overlay + pop-up

function singlePokemonTemplate(pokemonDetails){
  let image = pokemonDetails.sprites.other.dream_world.front_default;
  let number = pokemonDetails.id;
  let name = pokemonDetails.name;

    return `<div class="single-pokemon-card">
            <h3><span>${number}</span>${name}</h3>
            <div id='single_pokemon_${number}' class='single-pokemon-img'>
              <img src="${image}" alt="an image of the pokemon">
            </div>
            <div class="stats">
              <div class="stats-tabs" id='tab_about'>
                <span onclick="renderPokemonsStatistics('about', window.currentPokemon); setActiveTabColor('about');">About</span>
              </div>
              <div class="stats-tabs" id='tab_stats'>
                <span onclick="renderPokemonsStatistics('stats', window.currentPokemon); setActiveTabColor('stats');">Stats</span>
              </div>
              <div class="stats-tabs" id='tab_ability'>
                <span onclick="renderPokemonsStatistics('ability', window.currentPokemon); setActiveTabColor('ability');">Abilities</span>
              </div>
              <div class="stats-tabs" id='tab_evolution'>
                <span onclick="renderPokemonsStatistics('evolution', window.currentPokemon); setActiveTabColor('evolution');">Evolution</span>
              </div>
            </div>
            <div id='pokemon_statistics'></div>
            <div class="arrow-buttons">
              <img onclick='moveToLeft()' src="./assets/img/left-arrow.png" alt="left arrow">
              <img onclick='moveToRight()' src="./assets/img/right-arrow.png" alt="right arrow">
            </div>`;
}

function aboutTemplate(pokemonDetails){
  let name = pokemonDetails.name;
  let type = pokemonDetails.types[0].type.name;
  let height = pokemonDetails.height;
  let weight = pokemonDetails.weight;

  return ` <table class='table-about'>
                <tr>
                  <td>Type</td>
                  <td>${type}</td>
                </tr>
                <tr>
                  <td>Species</td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>${height} m</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>${weight} kg</td>
                </tr>
              </table>`;

}

function statsTemplate(pokemonDetails){
  let experience = pokemonDetails.base_experience;
  let attack = pokemonDetails.stats[1].base_stat;
  let defense = pokemonDetails.stats[2].base_stat;
  let speed = pokemonDetails.stats[5].base_stat;

    return  `<table class='table-about'>
              <tr>
                <td>Base experience</td>
                <td class="stat-bar">
                  <div class="fill" style="width: ${experience}%;"><span>${experience}</span></div>
                </td>  
              </tr>
              <tr>
                <td>Attack</td>
                <td class="stat-bar">
                  <div class="fill" style="width: ${attack}%;"><span>${attack}</span></div>
                </td>  
              </tr>
              <tr>
                <td>Defense</td>
                <td class="stat-bar">
                  <div class="fill" style="width: ${defense}%;"><span>${defense}</span></div>
                </td>  
              </tr>
              <tr>
                <td>Speed</td>
                <td class="stat-bar">
                  <div class="fill" style="width: ${speed}%;"><span>${speed}</span></div>
                </td>  
              </tr>
            </table>`
} 

function abilityTemplate(pokemonDetails){
  let abilities = pokemonDetails.abilities;
  let primary = abilities.find(ability => !ability.is_hidden);
  let hidden = abilities.find(ability => ability.is_hidden)
  let primaryAbility = primary ? primary.ability.name : 'None';
  let secondaryAbility = hidden ? hidden.ability.name : 'None';

    return  `<table class='table-about'>
              <tr>
                <td>Primary</td>
                <td>${primaryAbility}</td>
              </tr>
              <tr>
                <td>Secondary</td>
                <td>${secondaryAbility}</td>
              </tr>
            </table>`

}

function evolutionTemplate(chainData){
  let firstStage = chainData.chain.species.name;
  let secondStage = chainData.chain.evolves_to[0]?.species?.name || "";
  let thirdStage = chainData.chain.evolves_to[0]?.evolves_to[0]?.species?.name || "";

  let firstImg = extractEvolutionImages(firstStage);
  let secondImg = secondStage ? extractEvolutionImages(secondStage) : "";
  let thirdImg = thirdStage ? extractEvolutionImages(thirdStage) : "";

  return `<div class='pokemons-evo-chain'>
            <div class='evo-txt-img'>
              <img class='evo-sprites' src="${firstImg}" alt="${firstStage}">
              <p>${firstStage}</p>
            </div>
            <div class="evo-arrow"></div>
             ${secondStage? `
              <div class='evo-txt-img'>
                <img class='evo-sprites' src="${secondImg}" alt="${secondStage}">
              <p>${secondStage}</p>
            </div>` : ""}
            <div class="evo-arrow"></div>
              ${thirdStage? `
              <div class='evo-txt-img'>
                <img class='evo-sprites' src="${thirdImg}" alt="${thirdStage}">
              <p>${thirdStage}</p>
            </div>` : ""}
          </div>`;
}

//3. Error template 

function searchError(){
    return `<p class='error'>Min. 3 characters</p>`;
}