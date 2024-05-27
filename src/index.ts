const url = 'https://pokeapi.co/api/v2/pokemon/';

type POKEMON = {
  id: string;
  name: string;
  abilities: string[];
  image: string[];
  type: string[];
};

const inputPokemon = document.querySelector<HTMLInputElement>('#name');
const heading = document.querySelector<HTMLHeadingElement>('#pokename');
const desc = document.querySelector<HTMLUListElement>('#desc');
const type = document.querySelector<HTMLUListElement>('#type');
const image = document.querySelector<HTMLImageElement>('#pokeImage');
const resultContainer = document.querySelector<HTMLDivElement>('#resultContainer');
const pokemonLink = document.querySelector<HTMLAnchorElement>('#pokemonLink');
let input: string | undefined;
let searchedPokemon: POKEMON;

document.getElementById('submit')?.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log(inputPokemon?.value);
  input = inputPokemon?.value;
  try {
    const response = await fetch(`${url}${input?.toLowerCase()}`);
    const pokemon = await response.json();
    searchedPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      abilities: pokemon.abilities.map((a: { ability: { name: string } }) => a.ability.name),
      image: [pokemon.sprites.front_default, pokemon.sprites.front_shiny],
      type: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
    };
    if (searchedPokemon) {
      console.log("Object set");
      localStorage.setItem('Pokemon', JSON.stringify(searchedPokemon));
      heading!.textContent = searchedPokemon.name.toUpperCase();

      desc!.innerHTML = ''; // Clear previous results
      searchedPokemon.abilities.forEach(element => {
        const liElement = document.createElement('li');
        liElement.className = 'list-group-item';
        liElement.textContent = element;
        desc!.appendChild(liElement);
      });

      type!.innerHTML = ''; // Clear previous results
      searchedPokemon.type.forEach(element => {
        const liElement = document.createElement('li');
        liElement.className = 'list-group-item';
        liElement.textContent = element;
        type!.appendChild(liElement);
      });

      image!.src = searchedPokemon.image[0];
      image!.alt = searchedPokemon.name;

      resultContainer!.style.display = 'block';
      pokemonLink!.style.display = 'block';
    }
    console.log(searchedPokemon);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
});
