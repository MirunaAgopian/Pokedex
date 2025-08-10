//1. template function for the pokemons (the first 20 and the last 20)

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

//2. template function for Pokemon overlay + pop-up (like in Fotogram)

function singlePokemonTemplate(pokemonDetails){
  let image = pokemonDetails.sprites.front_default;
  let number = pokemonDetails.id;
  let name = pokemonDetails.name;
  let type = pokemonDetails.types[0].type.name;
  let height = pokemonDetails.height;
  let weight = pokemonDetails.weight;
  let ability = pokemonDetails.abilities[0].ability.name;

    return `<div class="single-pokemon-card">
            <h3><span>${number}</span>${name}</h3>
            <img id='single_pokemon_${number}' class='single-pokemon-img' src="${image}" alt="an image of the pokemon">
            <div class="stats">
              <a href='#'>About</a>
              <a href='#' onclick='statsTemplate(pokemonDetails)'>Stats</a>
              <a href='#'>Gender</a>
              <a href='#'>Evolution</a>
            </div>
            <table class='table-about'>
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
              <tr>
                <td>Abilities</td>
                <td>${ability}</td>
              </tr>
            </table>
            <div class="arrow-buttons">
              <img src="./assets/img/left-arrow.png" alt="left arrow">
              <img src="./assets/img/right-arrow.png" alt="right arrow">
            </div>`;
}

function statsTemplate(pokemonDetails){
  let image = pokemonDetails.sprites.front_default;
  let number = pokemonDetails.id;
  let name = pokemonDetails.name;

    return  `<div class="single-pokemon-card">
            <h3><span>${number}</span>${name}</h3>
            <img id='single_pokemon_${number}' class='single-pokemon-img' src="${image}" alt="an image of the pokemon">
            <div class="stats">
              <a href='#'>About</a>
              <a href='#'>Stats</a>
              <a href='#'>Gender</a>
              <a href='#'>Evolution</a>
            </div>
            <table class='table-about'>
              <tr>
                <td>Base experience</td>
                <td>...</td>
              </tr>
              <tr>
                <td>Attack</td>
                <td>....</td>
              </tr>
              <tr>
                <td>Defense</td>
                <td>...</td>
              </tr>
              <tr>
                <td>Speed</td>
                <td>....</td>
              </tr>
            </table>
            <div class="arrow-buttons">
              <img src="./assets/img/left-arrow.png" alt="left arrow">
              <img src="./assets/img/right-arrow.png" alt="right arrow">
            </div>`;
} 


//3. Error template 

function searchError(){
    return `<p class='error'>Min. 3 characters</p>`;
}