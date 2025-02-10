document.addEventListener("DOMContentLoaded", function() {
    const pokemonList = document.getElementById("pokemonList");

    pokemonList.addEventListener("click", function(event) {
        const pokemonItem = event.target.closest(".pokemonItem");
        if (pokemonItem) {
            const pokemonId = pokemonItem.dataset.pokemonId;

            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                .then(response => response.json())
                .then(data => {
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
                        .then(response => response.json())
                        .then(categoryData => {

                            const category = categoryData.genera.find(entry => entry.language.name === "en").genus;
                            
                            const pokemonInfo = {
                                name: data.name,   
                                category: category,
                                sprite: `https://play.pokemonshowdown.com/sprites/ani/${data.name.replace(/-/g, '')}.gif`, 
                                types: data.types.map(typeInfo => typeInfo.type.name),
                                height: data.height / 10,
                                weight: data.weight / 10,
                                cry: `https://pokemoncries.com/cries/${pokemonId}.mp3`
                            };

                            const dexNumber = document.getElementById("dexNumber");
                            dexNumber.textContent = `No.${pokemonId}`;

                            const dexName = document.getElementById("dexName");
                            dexName.textContent = pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1);

                            const dexCategory = document.getElementById("dexCategory");
                            dexCategory.textContent = pokemonInfo.category.charAt(0).toUpperCase() + pokemonInfo.category.slice(1);

                            const pokemonSprite = document.getElementById("dexSprite");
                            pokemonSprite.style.backgroundImage = `url("${pokemonInfo.sprite}")`;

                            const dexTypes = document.getElementById("dexTypes");
                            dexTypes.innerHTML = "";

                            pokemonInfo.types.forEach(type => {
                                let typeContainer = document.createElement("div");
                                dexTypes.appendChild(typeContainer);
                                typeContainer.classList.add("typeContainer");
                                
                                let typeText = document.createElement("p");
                                typeContainer.appendChild(typeText);
                                typeText.textContent = type.charAt(0).toUpperCase() + type.slice(1);

                                styleType(type, typeContainer);
                            });

                            const heightText = document.getElementById("heightText");
                            heightText.textContent = "Height";

                            const weightText = document.getElementById("weightText");
                            weightText.textContent = "Weight";

                            const lineBars = document.querySelectorAll(".lineBar");
                            lineBars.forEach(lineBar => {
                                lineBar.style.opacity = "1";
                            });
                            
                            const dexHeight = document.getElementById("dexHeight");
                            dexHeight.textContent = pokemonInfo.height + "m";

                            const dexWeight = document.getElementById("dexWeight");
                            dexWeight.textContent = pokemonInfo.weight + "kg";

                            const genStamp = document.querySelector(".genStamp");
                            genStamp.style.opacity = "1";

                            const genStampText = document.getElementById("genStampText");

                            if (pokemonId >= 1 & pokemonId <= 151){
                                genStampText.textContent = "Gen 1";
                            }
                            else if (pokemonId >= 152 & pokemonId <= 251 ){ 
                                genStampText.textContent = "Gen 2";
                            }
                            else if (pokemonId >= 252 & pokemonId <= 386 ){ 
                                genStampText.textContent = "Gen 3";
                            }
                            else if (pokemonId >= 387 & pokemonId <= 493 ){ 
                                genStampText.textContent = "Gen 4";
                            }
                            else if (pokemonId >= 494 & pokemonId <= 649 ){ 
                                genStampText.textContent = "Gen 5";
                            }
                            else if (pokemonId >= 650 & pokemonId <= 721 ){ 
                                genStampText.textContent = "Gen 6";
                            }
                            else if (pokemonId >= 722 & pokemonId <= 809 ){ 
                                genStampText.textContent = "Gen 7";
                            }
                            else if (pokemonId >= 810 & pokemonId <= 898 ){ 
                                genStampText.textContent = "Gen 8";
                            }
                            else if (pokemonId >= 899 & pokemonId <= 1025 ){ 
                                genStampText.textContent = "Gen 9";
                            }

                            let pokemonCry = new Audio(pokemonInfo.cry);
                            pokemonCry.play();
                        })
                        .catch(error => console.error("Error al obtener la categoría:", error));
                })
                .catch(error => console.error("Error al buscar el Pokémon:", error));
        }
    });

    function styleType(type, typeContainer) {
        switch (type) {
            case "bug":
                typeContainer.style.backgroundColor = "#A8B820"; 
                break;
            case "dark":
                typeContainer.style.backgroundColor = "#705848"; 
                break;
            case "dragon":
                typeContainer.style.backgroundColor = "#7038F8"; 
                break;
            case "electric":
                typeContainer.style.backgroundColor = "#F8D030"; 
                break;
            case "fairy":
                typeContainer.style.backgroundColor = "#EE99AC"; 
                break;
            case "fighting":
                typeContainer.style.backgroundColor = "#C03028"; 
                break;
            case "fire":
                typeContainer.style.backgroundColor = "#F08030"; 
                break;
            case "flying":
                typeContainer.style.backgroundColor = "#A890F0"; 
                break;
            case "ghost":
                typeContainer.style.backgroundColor = "#705898"; 
                break;
            case "grass":
                typeContainer.style.backgroundColor = "#78C850"; 
                break;
            case "ground":
                typeContainer.style.backgroundColor = "#E0C068"; 
                break;
            case "ice":
                typeContainer.style.backgroundColor = "#98D8D8"; 
                break;
            case "poison":
                typeContainer.style.backgroundColor = "#A040A0"; 
                break;
            case "psychic":
                typeContainer.style.backgroundColor = "#F85888"; 
                break;
            case "rock":
                typeContainer.style.backgroundColor = "#B8A038"; 
                break;
            case "steel":
                typeContainer.style.backgroundColor = "#B8B8D0"; 
                break;
            case "water":
                typeContainer.style.backgroundColor = "#6890F0"; 
                break;
            default:
                typeContainer.style.backgroundColor = "#68A090"; 
        }
    }
});
