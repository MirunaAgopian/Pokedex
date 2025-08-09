//1. functon to play the pokemon audio

function playPokemonSound(pokemonId){
    let audio = document.getElementById(`audio_${pokemonId}`);

    if(audio){
        audio.paused ? audio.play() : audio.pause();
    }
}


//2. function for pokemon background colors

function setPokemonImgColor(type, number) {
    let pokeImg = document.getElementById(`pokemon_${number}`);

    if(type === 'grass'){
        pokeImg.classList.add('grass');
    } else if(type === 'fire') {
        pokeImg.classList.add('fire');
    } else if(type === 'water'){
        pokeImg.classList.add('water');
    } else if(type === 'bug'){
        pokeImg.classList.add('bug');
    } else if(type === 'normal'){
        pokeImg.classList.add('normal');
    } else if(type === 'poison'){
        pokeImg.classList.add('poison');
    } else if(type === 'electric'){
        pokeImg.classList.add('electric');
    } else if(type === 'ground'){
        pokeImg.classList.add('ground');
    } else if(type === 'fairy'){
        pokeImg.classList.add('fairy');
    }
}

function applyPokemonsBackground(pokemonDetails){
    const type = pokemonDetails.types[0].type.name;
    const number = pokemonDetails.id;

    if(type && number) {
        setPokemonImgColor(type, number);
    } else {
        console.warn(`Missing type or number for ${pokemonDetails.name}`)
    }

}

//3. Helper functions for the search bar

function showAllPokemons(){
    let errorContainer = document.getElementById('error-msg');
    errorContainer.innerHTML = '';
    return detailedPokemons;
}

function showErrorMessage(){
    let errorContainer = document.getElementById('error-msg');
    errorContainer.innerHTML = searchError();
    return [];
}

function showSearchResults(trimmedQuery){
    let errorContainer = document.getElementById('error-msg');
    errorContainer.innerHTML = '';
    return detailedPokemons.filter(pokemon => {
        return pokemon.name?.toLowerCase().includes(trimmedQuery);
    });
}