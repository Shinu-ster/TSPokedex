const getPokemon = localStorage.getItem('Pokemon')
const headingTag = document.querySelector<HTMLHeadingElement>('#name');
const img = document.querySelector<HTMLImageElement>('#pokeImage')
const doc = document.querySelector<HTMLTitleElement>('title')
// const 
const test = document.querySelector<HTMLSpanElement>('#abi')
const types = document.querySelector<HTMLSpanElement>('#types')
const hp = document.querySelector<HTMLProgressElement>('#hp')
const attack = document.querySelector<HTMLProgressElement>('#attack')
const defense = document.querySelector<HTMLProgressElement>('#defense')
const sAttack = document.querySelector<HTMLProgressElement>('#sAttack')
const sDefense = document.querySelector<HTMLProgressElement>('#sDefense')
const speed = document.querySelector<HTMLProgressElement>('#speed')

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
}