let pokemonCount = 151;
let pokedex = {};

// windows is supported by all browser windows
//onload helps execute a script when everything is completely loaded
//used for list of pokemon and description of pokemon
window.onload = async function() {
    getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        let pokemon = document.createElement("div");
        pokemon.id = i;

        //
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();

        pokemon.classList.add("pokemon-name");

        //click
        pokemon.addEventListener("click", updatePokemon);

        //append inserts node or string object at after the last child element.String
        document.getElementById("pokemon-list").append(pokemon);
    }

    //used for description of pokemon
    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];

    //inspect to see all links to the api
    console.log(pokedex);
}

//async used with await
//used with api in order to change names, numbers and descriptions
async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonHeight = pokemon["height"];
    let pokemonWeight = pokemon["weight"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][7]["flavor_text"];

    //failed code
//     ris = await fetch(pokemon["location_area_encounters"]);
//     let pokemonlocation = await ris.json();

// console.log(pokemonlocation);

//     pokemonlocation = pokemonlocation[3];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "height" : pokemonHeight, "weight" : pokemonWeight, "desc" : pokemonDesc};
    
    //failed code
    //"location_area_encounters" : pokemonlocation
}

//the this keyword is used depending on the how its invoked refering to different objects based on its use
//function for replacing previous information about pokemon
function updatePokemon(){

    //replacing picture
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //replacing types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        
        //Upper text
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");

        //type background color change
        type.classList.add(types[i]["type"]["name"]);
        //span targeted
        typesDiv.append(type);
    }

    //replacing pokemon height
    document.getElementById("pokemon-height").innerText = pokedex[this.id]["height"];

    //replacing pokemon weight
    document.getElementById("pokemon-weight").innerText = pokedex[this.id]["weight"];

    //update pokemon location
    // document.getElementById("pokemon-habitat").innerText = pokedex[this.id]["location_area_encounters"];

    //replacing description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];

    //replacing pokemon name
    document.getElementById("pokemon-name").innerText = pokedex[this.id]["name"];
}