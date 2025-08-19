function playPokemonSound(soundUrl){
    let audio = document.getElementById('global_pokemon_audio');
    if(audio.src !== soundUrl){
        audio.src = soundUrl;
    }
    audio.paused ? audio.play() : audio.pause();
}