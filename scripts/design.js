//1. functon for play pokemon audio

//2. function for pokemob background colors

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