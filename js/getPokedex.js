document.addEventListener("DOMContentLoaded", function() {
    const pokemonList = document.getElementById("pokemonList");
    const genButtons = document.querySelectorAll("#genButton");
    let genButtonSelected = null; 

    genButtons.forEach(genButton => {
        genButton.addEventListener("click", () => {
            if (genButtonSelected) {
                genButtonSelected.classList.remove("selected");
            }
            genButton.classList.add("selected");
            genButtonSelected = genButton;
            getPokedexGen(genButton, pokemonList);
        });
    });

    const firstGenButton = genButtons[0];
    if (firstGenButton) {
        firstGenButton.click(); 
    }
});

function getPokedexGen(genButton, pokemonList) {
    let pokemonSelected = null;

    let b = parseInt(genButton.dataset.b);
    let e = parseInt(genButton.dataset.e);

    pokemonList.innerHTML = "";

    const pokemonPromises = [];

    for (let i = b; i <= e; i++) {
        pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json())
            .then(data => ({
                id: data.id,
                name: data.name.replace(/-(.{4,})$/, ''),
                smallSprite: data.sprites.versions['generation-viii'].icons.front_default
            }))
        );
    }

    Promise.all(pokemonPromises).then(pokemons => {
        pokemons.forEach(pokemon => {
            const pokemonItem = document.createElement("div");
            pokemonItem.dataset.pokemonId = pokemon.id;
            pokemonItem.classList.add("pokemonItem");
            pokemonList.appendChild(pokemonItem);

            const pokemonIconContainer = document.createElement("div");
            pokemonIconContainer.classList.add("pokemonIconContainer");
            pokemonItem.appendChild(pokemonIconContainer);

            const pokemonIcon = document.createElement("div");
            pokemonIcon.classList.add("pokemonIcon");
            pokemonIcon.style.backgroundImage = `url("${pokemon.smallSprite}")`;
            pokemonIconContainer.appendChild(pokemonIcon);

            const pokemonNumber = document.createElement("p");
            pokemonNumber.classList.add("pokemonNumber");
            pokemonNumber.textContent = `No.${pokemon.id}`;
            pokemonIconContainer.appendChild(pokemonNumber);

            const pokemonNameContainer = document.createElement("div");
            pokemonNameContainer.classList.add("pokemonNameContainer");
            pokemonItem.appendChild(pokemonNameContainer);

            const pokemonName = document.createElement("p");
            pokemonName.classList.add("pokemonName");
            pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokemonNameContainer.appendChild(pokemonName);

            const pokeBallIcon = document.createElement("div");
            pokeBallIcon.classList.add("pokeBallIcon");
            pokemonItem.appendChild(pokeBallIcon);

            pokemonItem.addEventListener("click", () => {
                if (pokemonSelected) {
                    pokemonSelected.classList.remove("selected");
                }
                pokemonItem.classList.add("selected");
                pokemonSelected = pokemonItem;
            });
        });

        const firstPokemonItem = pokemonList.querySelector(".pokemonItem");
        if (firstPokemonItem) {
            firstPokemonItem.click(); 
        }

    }).catch(error => console.error("Error al buscar Pokémon:", error));
}
