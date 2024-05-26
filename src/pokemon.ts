console.log('hello')
const pokemonName = localStorage.getItem('Pokemon')
if (pokemonName) {
    console.log(JSON.parse(pokemonName));
}