//1. function for pokemon background colors

function setPokemonImgColor(pokemonDetails) {
    const type = pokemonDetails.types[0].type.name;
    const number = pokemonDetails.id;
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
    } else if(type === 'fighting'){
        pokeImg.classList.add('fighting');
    } else if(type === 'psychic'){
        pokeImg.classList.add('psychic');
    } else if(type === 'rock'){
        pokeImg.classList.add('rock');
    } else if(type === 'ghost'){
        pokeImg.classList.add('ghost');
    } else if(type === 'ice'){
        pokeImg.classList.add('ice');
    } else if(type === 'dragon'){
        pokeImg.classList.add('dragon');
    } else if(type === 'dark'){
        pokeImg.classList.add('dark');
    }
}

function setSinglePokemonImgColor(pokemonDetails) {
    const type = pokemonDetails.types[0].type.name;
    const number = pokemonDetails.id;
    let SinglePokeImg = document.getElementById(`single_pokemon_${number}`);

    if(type === 'grass'){
        SinglePokeImg.classList.add('grass');
    } else if(type === 'fire') {
        SinglePokeImg.classList.add('fire');
    } else if(type === 'water'){
        SinglePokeImg.classList.add('water');
    } else if(type === 'bug'){
        SinglePokeImg.classList.add('bug');
    } else if(type === 'normal'){
        SinglePokeImg.classList.add('normal');
    } else if(type === 'poison'){
        SinglePokeImg.classList.add('poison');
    } else if(type === 'electric'){
        SinglePokeImg.classList.add('electric');
    } else if(type === 'ground'){
        SinglePokeImg.classList.add('ground');
    } else if(type === 'fairy'){
        SinglePokeImg.classList.add('fairy');
    } else if(type === 'fighting'){
        SinglePokeImg.classList.add('fighting');
    } else if(type === 'psychic'){
        SinglePokeImg.classList.add('psychic');
    } else if(type === 'rock'){
        SinglePokeImg.classList.add('rock');
    } else if(type === 'ghost'){
        SinglePokeImg.classList.add('ghost');
    } else if(type === 'ice'){
        SinglePokeImg.classList.add('ice');
    } else if(type === 'dragon'){
        SinglePokeImg.classList.add('dragon');
    } else if(type === 'dark'){
        SinglePokeImg.classList.add('dark');
    }
} 

//2. Helper functions for the main overlay

function closeOverlay(){
    document.getElementById('overlay').classList.toggle('d-none');
    document.getElementById('single_pokemon_container').classList.toggle('d-none');
    document.body.classList.remove('lock-scroll');
}

function setActiveTabColor(tab){
    document.querySelectorAll('.stats-tabs').forEach(el => el.classList.remove('active'));
    let idMap = {
        about: 'tab_about',
        stats: 'tab_stats',
        ability: 'tab_ability',
        evolution: 'tab_evolution'
    };
    const activeTab = document.getElementById(idMap[tab]);
    if (activeTab) activeTab.classList.add('active');
}

function handleOverlayChanges(){
    let singlePokemonContainer = document.getElementById("single_pokemon_container");
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");
    singlePokemonContainer.classList.remove("d-none");
    document.body.classList.add("lock-scroll");
} 