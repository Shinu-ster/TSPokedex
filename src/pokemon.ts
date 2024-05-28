import POKEMON,{url} from './index';



  const getPokemon = localStorage.getItem('Pokemon')
const headingTag = document.querySelector<HTMLHeadingElement>('#name');
const img = document.querySelector<HTMLImageElement>('#pokeImage')
const doc = document.querySelector<HTMLTitleElement>('title')
const shiny = document.querySelector<HTMLButtonElement>('#shinyBtn')
const test = document.querySelector<HTMLSpanElement>('#abi')
const types = document.querySelector<HTMLSpanElement>('#types')
const hp = document.querySelector<HTMLProgressElement>('#hp')
const attack = document.querySelector<HTMLProgressElement>('#attack')
const defense = document.querySelector<HTMLProgressElement>('#defense')
const sAttack = document.querySelector<HTMLProgressElement>('#sAttack')
const sDefense = document.querySelector<HTMLProgressElement>('#sDefense')
const speed = document.querySelector<HTMLProgressElement>('#speed')
const icon = shiny?.querySelector<HTMLElement>('i');
const prevBtn = document.querySelector<HTMLButtonElement>('#prevBtn')
const nextBtn = document.querySelector<HTMLButtonElement>('#nextBtn')


if (getPokemon) {
    console.log(JSON.parse(getPokemon));
    const pokemon:POKEMON = JSON.parse(getPokemon)
    doc!.innerHTML = pokemon.name.toUpperCase();
    headingTag!.innerHTML = pokemon.name.toUpperCase();
    img!.src = pokemon.image[0]
    test!.innerHTML = ''; // Clear previous results
    pokemon.abilities.forEach((element,index) => {
      const liElement = document.createElement('span');
    //   liElement.className = 'list-group-item';
      liElement.textContent = element;
      test!.appendChild(liElement);
      if (index < pokemon.abilities.length - 1) {
        test!.appendChild(document.createTextNode(', '));
      }
    });

    types!.innerHTML = ''; // Clear previous results
    pokemon.type.forEach((element,index) => {
      const liElement = document.createElement('span');
      liElement.textContent = element;
      types!.appendChild(liElement);
      if (index < pokemon.abilities.length - 1) {
        types!.appendChild(document.createTextNode(', '));
      }
    });
    // hp!.ariaValueNow = pokemon.stats[0]
    const maxStat = 200;
    hp!.style.width = `${(pokemon.stats[0] / maxStat) * 100}%`;
    hp!.setAttribute('aria-valuenow', pokemon.stats[0].toString());

    attack!.style.width = `${(pokemon.stats[1] / maxStat) * 100}%`;
    attack!.setAttribute('aria-valuenow', pokemon.stats[1].toString());

    defense!.style.width = `${(pokemon.stats[2] / maxStat) * 100}%`;
    defense!.setAttribute('aria-valuenow', pokemon.stats[2].toString());

    sAttack!.style.width = `${(pokemon.stats[3] / maxStat) * 100}%`;
    sAttack!.setAttribute('aria-valuenow', pokemon.stats[3].toString());

    sDefense!.style.width = `${(pokemon.stats[4] / maxStat) * 100}%`;
    sDefense!.setAttribute('aria-valuenow', pokemon.stats[4].toString());

    speed!.style.width = `${(pokemon.stats[5] / maxStat) * 100}%`;
    speed!.setAttribute('aria-valuenow', pokemon.stats[5].toString());


    if (shiny) {
      shiny.addEventListener('click', () => {
          if (icon) {
              icon.classList.toggle('fa-regular');
              icon.classList.toggle('fa-solid');
  
              if (icon.classList.contains('fa-regular')) {
                img!.src = pokemon.image[0]
              }else{
                img!.src = pokemon.image[1]
              }
          }
      });
    }

    console.log(pokemon.id)

    if (prevBtn) {
      prevBtn.addEventListener('click',()=>{
        searchPrevPokemonById(pokemon.id)
        // searchPokemonById(pokemon.id)
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener('click',()=>{
        searchNextPokemonById(pokemon.id)
        
      })
    }
  }

let searchedPokemon:POKEMON;
  const searchPrevPokemonById = async (pokeId: number) => {
    let prevPokeId: number = pokeId - 1;
    try {
      const response = await fetch(`${url}${prevPokeId}`);
      const pokemon = await response.json();
      searchedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        abilities: pokemon.abilities.map(
          (a: { ability: { name: string } }) => a.ability.name
        ),
        image: [pokemon.sprites.front_default, pokemon.sprites.front_shiny],
        type: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
        stats: pokemon.stats.map(
          (s: { base_stat: { stat: number } }) => s.base_stat
        ),
      };
      if (searchedPokemon) {
        console.log("Object set");
        console.log(searchedPokemon.stats);
        localStorage.setItem("Pokemon", JSON.stringify(searchedPokemon));
        location.reload();
        // updatePokemon();
      }
    } catch (error) {}
    console.log("function:", pokeId - 1);
  };
  
  const searchNextPokemonById = async (pokeId: number) => {
    let nextPokemonId: number = pokeId + 1;
    try {
      const response = await fetch(`${url}${nextPokemonId}`);
      const pokemon = await response.json();
      searchedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        abilities: pokemon.abilities.map(
          (a: { ability: { name: string } }) => a.ability.name
        ),
        image: [pokemon.sprites.front_default, pokemon.sprites.front_shiny],
        type: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
        stats: pokemon.stats.map(
          (s: { base_stat: { stat: number } }) => s.base_stat
        ),
      };
      if (searchedPokemon) {
        console.log("Object set");
        console.log(searchedPokemon.stats);
        localStorage.setItem("Pokemon", JSON.stringify(searchedPokemon));
        location.reload();
        // updatePokemon(); 
      }
    } catch (error) {}
    console.log("function:", pokeId - 1);
  };


// export default updatePokemon;

    
 
    
