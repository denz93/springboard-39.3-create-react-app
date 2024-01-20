import React from 'react'
import PokeCard from './poke-card';

/**
 * @param {{pokemonList: Pokemon[]}} PokeDexProps
 */
export default function PokeDex({pokemonList = [], isWinner = false}) {
  return <div>
    <ul className="grid grid-cols-2 gap-4">
      {pokemonList.map((pokemon) => <li key={pokemon.id}><PokeCard pokemon={pokemon} /></li>)}
    </ul>
    {isWinner && <div className="text-2xl font-bold col-span-2 text-center w-100 mt-5">THIS HAND WINS! 🏆</div>}
  </div> 
}