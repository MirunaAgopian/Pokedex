//1. template function for the pokemons (all 40)

function allPokemonsTemplate(pokemonDetails, index){
    let number = pokemonDetails.id;
    let name = pokemonDetails.name;
    let image = pokemonDetails.sprites.front_default;
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
                    <img onclick='playPokemonSound(${number})' class='play-btn' src="./assets/img/play_btn.svg" alt="play button to hear the pokemon's sound">
                    <audio id='audio_${number}' src='${sound}'></audio>
                </div>
            </div>
    </div>`;

}

//2. template function for Pokemon overlay + pop-up

function singlePokemonTemplate(pokemonDetails, index){
  let image = pokemonDetails.sprites.front_default;
  let number = pokemonDetails.id;
  let name = pokemonDetails.name;

    return `<div class="single-pokemon-card">
            <h3><span>${number}</span>${name}</h3>
            <img id='single_pokemon_${number}' class='single-pokemon-img' src="${image}" alt="an image of the pokemon">
            <div class="stats">
              <a href="#" onclick="renderPokemonsStatistics('about', window.currentPokemon)">About</a>
              <a href="#" onclick="renderPokemonsStatistics('stats', window.currentPokemon)">Stats</a>
              <a href="#" onclick="renderPokemonsStatistics('ability', window.currentPokemon)">Abilities</a>
              <a href="#" onclick="renderPokemonsStatistics('evolution', window.currentPokemon)">Evolution</a>
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
                <td>
                     <div class="stat-bar">
                      <div class="fill" style="width: ${experience}%;"></div>
                     </div>
                 </td>  
              </tr>
              <tr>
                <td>Attack</td>
                 <td>
                     <div class="stat-bar">
                      <div class="fill" style="width: ${attack}%;"></div>
                     </div>
                 </td>  
              </tr>
              <tr>
                <td>Defense</td>
                <td>
                     <div class="stat-bar">
                      <div class="fill" style="width: ${defense}%;"></div>
                     </div>
                 </td>  
              </tr>
              <tr>
                <td>Speed</td>
                <td>
                     <div class="stat-bar">
                      <div class="fill" style="width: ${speed}%;"></div>
                     </div>
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

function evolutionTemplate(evoChain){
  let pokemonId = evoChain.id;
  let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return  `<div class='pokemons-evo-chain'>
            <img class="evo-chain-imgs" src="${imgUrl}" alt="images showing the species evolution of the pokemons">
          </div>`;
}



//3. Error template 

function searchError(){
    return `<p class='error'>Min. 3 characters</p>`;
}