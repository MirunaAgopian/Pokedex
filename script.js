let BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0'
let pokemonsArray = [];

//1. GET all 40 Pokemons

async function getPokemons(path=""){
    let response = await fetch(BASE_URL + path + ".json");

    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
        let responseAsJson = await response.json();
        pokemonsArray = responseAsJson.results;

        console.log(responseAsJson);
        console.log(pokemonsArray);

        await getSinglePokemon(pokemonsArray);
        displayPokemons();
                
    }
   
}

//1.2. GET individual pokemon 
async function getSinglePokemon(pokemonsArray){
    let allDetails = [];
    for(let pokemon of pokemonsArray) {
        let response = await fetch(pokemon.url);

        if(!response.ok){
            throw new Error(`Failed to fetch ${pokemon.name}`);
        } else {
            pokemonDetails = await response.json();
            allDetails.push(pokemonDetails);
        }
    }

    return allDetails;
}



//2. Render the elements via a template function

function displayPokemons(){
    let container = document.getElementById('pokemons_container');
    container.innerHTML = '';

    getSinglePokemon(pokemonsArray).then(allDetails => {
        allDetails.forEach(pokemonDetails => {
        container.innerHTML += allPokemonsTemplate(pokemonDetails);
            //set img background color!
            const type = pokemonDetails.types[0].type.name;
            const number = pokemonDetails.id;
            setPokemonImgColor(type, number);
        });
    });

}

//2.2 render only 20 pokemons
