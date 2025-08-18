function moveToRight(){
    currentOverlayIndex++;
    if(currentOverlayIndex >= detailedPokemons.length){
        currentOverlayIndex = 0;
    }
    openOverlayByIndex(currentOverlayIndex);
    renderPokemonsStatistics(window.currentStatisticsTab, window.currentPokemon);
}

function moveToLeft(){
    currentOverlayIndex--;
    if(currentOverlayIndex < 0){
        currentOverlayIndex = detailedPokemons.length - 1;
    }
    openOverlayByIndex(currentOverlayIndex);
    renderPokemonsStatistics(window.currentStatisticsTab, window.currentPokemon);
}
