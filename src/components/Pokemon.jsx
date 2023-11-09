import React from 'react'

export const Pokemon = ({pokemon, id}) => {
  
  return (
    <>
        <h3>{pokemon.name}</h3>
        
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} style={{width:'250px', height:'auto'}} />
        <hr />
    
    </>
  )
}
