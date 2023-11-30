import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export const Pokemon = ({pokemon, addPoke}) => {
  
  return (
    <>
    
      <figure className="figure">
    <button onClick={addPoke}><img src={pokemon.image} className="pokemon" /></button>
    <figcaption className="figure-caption">{pokemon.name}</figcaption>
      </figure>
     
    
    </>
  )
}