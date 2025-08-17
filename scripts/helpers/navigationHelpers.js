function moveToRight(){
    currentPokemonIndex++;
    if(currentPokemonIndex >= detailedPokemons.length){
        currentPokemonIndex = 0;
    }
    openOverlayByIndex(currentPokemonIndex);
    renderPokemonsStatistics(window.currentStatisticsTab, window.currentPokemon);
}

function moveToLeft(){
    currentPokemonIndex--;
    if(currentPokemonIndex < 0){
        currentPokemonIndex = detailedPokemons.length - 1;
    }
    openOverlayByIndex(currentPokemonIndex);
    renderPokemonsStatistics(window.currentStatisticsTab, window.currentPokemon);
}
