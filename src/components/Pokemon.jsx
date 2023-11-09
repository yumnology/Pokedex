import React from 'react'

export const Pokemon = ({pokemon, id}) => {
  
  return (
    <>
        <h3>{pokemon.name}</h3>
        
        <img src={pokemon.image} style={{width:'250px', height:'auto'}} alt="" />
        <hr />
    
    </>
  )
}
