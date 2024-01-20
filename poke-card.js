import React from "react";
/**
 * @typedef {Object} Pokemon 
 * @property {string} name
 * @property {number} id
 * @property {string} image
 * @property {string} type
 * @property {number} base_experience
 * 
 * @param {React.ComponentProps<"div"> & {pokemon: Pokemon}} PokeCardProps
 * @returns {React.JSX.Element}
 */
export default function PokeCard({pokemon, ...props}) {
  return <div {...props} className={`${props.className??''} bg-slate-400 flex justify-center items-center flex-col animate-zoom-in transition-transform hover:scale-110`}>
    <h1 className="text-3xl">{pokemon.name}</h1>
    
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
    <p>Type: {pokemon.type}</p>
    <p>Base experience: {pokemon.base_experience}</p>
  </div>
}