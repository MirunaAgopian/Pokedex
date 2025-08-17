function playPokemonSound(pokemonId){
    let audio = document.getElementById(`audio_${pokemonId}`);
    if(audio){
        audio.paused ? audio.play() : audio.pause();
    }
}