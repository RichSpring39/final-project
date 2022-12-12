let pokemonCount = 151;
let pokedex = {};

window.onload = async function() {
    // getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }

    // document.getElementById("pokemon-weight") = pokedex[1]["weight"];

    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];

    console.log(pokedex);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    // console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonHeight = pokemon["height"];
    let pokemonWeight = pokemon["weight"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    // res = await fetch(pokemon["height"]["url"]);

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][7]["flavor_text"];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "height" : pokemonHeight, "weight" : pokemonWeight, "desc" : pokemonDesc};

}

function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //Clear previous height
    let pokeHeight = document.getElementById("pokemon-height");
    while (pokeHeight.firstChild){
        pokeHeight.firstChild.remove();
    }

    //Clear previous weight
    let pokeWeight = document.getElementById("pokemon-weight");
    while (pokeWeight.firstChild){
        pokeWeight.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    //update height
    let heights = pokedex[this.id]["height"];
    for (let i = 0; i < heights.length; i++) {
        let PokHeight = document.createElement("span");
        PokHeight.innerText = heights[i]["height"]["name"].toUpperCase();
        PokHeight.classList.add("type-box-height");
        PokHeight.classList.add(heights[i]["height"]["name"]); //adds background color and font color
        pokeHeight.append(PokHeight);
    }

    //update weight
    let weights = pokedex[this.id]["weight"];

    //pokemon height
    document.getElementById("pokemon-height").innerText = pokedex[this.id]["height"];

    //pokemon weight
    document.getElementById("pokemon-weight").innerText = pokedex[this.id]["weight"];

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}