import {useMemo} from 'react';
import PokeDek from "./poke-dex.js";
import Blackjack from './blackjack.js';

const samplePokemons = [
  {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
  {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
  {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
  {id: 12, name: 'Butterfree', type: 'flying', base_experience: 178},
  {id: 25, name: 'Pikachu', type: 'electric', base_experience: 112},
  {id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95},
  {id: 94, name: 'Gengar', type: 'poison', base_experience: 225},
  {id: 133, name: 'Eevee', type: 'normal', base_experience: 65}
];

function shuffle(array) {
  let currentIndex = array.length-1,  randomIndex;
  const newArray = [...array]

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }
  
  return newArray;
}

const App = () => {
  const randomPokemons = useMemo(() => shuffle(samplePokemons), [])
  const leftDex = useMemo(() => randomPokemons.slice(0, 4), [randomPokemons]);
  const rightDex = useMemo(() => randomPokemons.slice(4, 8), [randomPokemons]);
  const leftTotal = leftDex.reduce((acc, cur) => acc + cur.base_experience, 0)
  const rightTotal = rightDex.reduce((acc, cur) => acc + cur.base_experience, 0)
  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        <PokeDek pokemonList={leftDex} isWinner={leftTotal > rightTotal}/>
        <PokeDek pokemonList={rightDex} isWinner={leftTotal < rightTotal}/>
      </div>

      <div>
        <Blackjack/>
      </div>
    </div>
  )

}

export default App;
