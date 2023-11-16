import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export const Pokemon = ({pokemon, id}) => {
  
  return (
    <>
    
      <figure class="figure">
    <img src={pokemon.image} class="pokemon" />
    <figcaption class="figure-caption">{pokemon.name}</figcaption>
      </figure>
     
    
    </>
  )
}