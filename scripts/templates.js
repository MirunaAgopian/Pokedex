//1. template function for the pokemons (the first 20 and the last 20)

function allPokemonsTemplate(pokemonDetails){
    let number = pokemonDetails.id;
    let name = pokemonDetails.name;
    let image = pokemonDetails.sprites.front_default;
    let sound = pokemonDetails.cries.latest;
    let type = pokemonDetails.types[0].type.name;

    return` <div class="pokemon-general-details"> 
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

//2. Error template 

function searchError(){
    return `<p class='error'>Min. 3 characters</p>`;
}

//2. template function for Pokemon overlay + pop-up (like in Fotogram)
