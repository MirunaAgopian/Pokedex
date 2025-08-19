function showAllPokemons(){
    let errorContainer = document.getElementById('error-msg');
    errorContainer.innerHTML = '';
    displayShowMoreBtn();
    showLoadedPokemonsBatch();
}

function showLoadedPokemonsBatch(){
    let container = document.getElementById("pokemons_container");
    container.innerHTML = "";
    let batch = detailedPokemons.slice(0, currentPokemonIndex);
    batch.forEach((pokemonDetails, index) => {
        container.innerHTML += allPokemonsTemplate(pokemonDetails, index);
        setPokemonImgColor(pokemonDetails);
    });
}

function showErrorMessage(){
    let errorContainer = document.getElementById('error-msg');
    errorContainer.innerHTML = searchError();
    hideShowMoreBtn();
    return [];
}

function showSearchResults(trimmedQuery){
    let errorContainer = document.getElementById('error-msg');
    errorContainer.innerHTML = '';
    hideShowMoreBtn();
    return detailedPokemons.filter(pokemon => {
        return pokemon.name?.toLowerCase().includes(trimmedQuery);
    });
}

function hideShowMoreBtn(){
    let button = document.getElementById('show_more_btn');
    button.classList.add('d-none');
}

function displayShowMoreBtn(){
    let button = document.getElementById('show_more_btn');
    button.classList.remove('d-none');
}