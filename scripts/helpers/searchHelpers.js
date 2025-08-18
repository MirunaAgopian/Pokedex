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

// here I need to hide de display more button when the user searches a pokemon