import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Pokemon } from './Pokemon'

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
        {pokemones.map((pokemon) => {
            return <Pokemon key={pokemon.id} pokemon={pokemon}/>
        }
        )}
    </div>

  )
}
