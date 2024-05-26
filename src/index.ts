const url = 'https://pokeapi.co/api/v2/pokemon/';

type POKEMON = {
  id:string
  name:string
  abilities:string[]
  image: string[]
  type: string[]
}
const searchPokemon = document.querySelector<HTMLInputElement>('#name')
let input : string | undefined;
let searchedPokemon:POKEMON;

document.getElementById('submit')?.addEventListener('click',async (e)=>{
  e.preventDefault();
  console.log(searchPokemon?.value);
  input = searchPokemon?.value;
  try {
    const response = await fetch(`${url}${input?.toLowerCase()}`)
    const pokemon = await response.json();
    searchedPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      abilities: pokemon.abilities.map((a: { ability: { name: string; }; }) => a.ability.name),
      image: [pokemon.sprites.front_default, pokemon.sprites.front_shiny],
      type: pokemon.types.map((t: { type: { name: string; }; }) => t.type.name)
      };
      if (searchedPokemon) {
        console.log("OBject set")
        localStorage.setItem('Pokemon',JSON.stringify(searchedPokemon))
        window.location.href = 'pokemon.html'
      }
      console.log(searchedPokemon)
  } catch (error) {
    
  }
  
})


