import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Pokemon } from './Pokemon'

// TODO: analizar documentación de pokeapi para mostrar imagen.



export const Pokedex = () => {
    const [pokemones, setPokemones] = useState([])

    const url = "https://pokeapi.co/api/v2/pokemon/"

    useEffect(()=> {
        axios.get(url).then((response) => {
            setPokemones(response.data.results)
            
        })
    }, [setPokemones])


  return (
    <div>
        {pokemones.map((pokemon, index) => {
            console.log(index)
            index = index + 1
            return <Pokemon key={pokemon.id} pokemon={pokemon} id={index}/>
        }
        )}
    </div>

  )
}
