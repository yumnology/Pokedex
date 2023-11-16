import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Pokemon } from './Pokemon'
import db from '../firebase/firebaseConfig'
import { collection, addDoc, getDocs} from 'firebase/firestore'


async function getData(db) {
    const coleccion = collection(db, 'team');
    const documento = await getDocs(coleccion, 'principal');
    const listaresult = documento.docs.map(doc => {
        doc.data()
        console.log(doc.data())
    });
    return listaresult;
    
  }



export const Pokedex = () => {
    const [pokemones, setPokemones] = useState([])
    const listaresult = getData(db)
    //console.log(listaresult)
    const url = "https://pokeapi.co/api/v2/pokemon/"

    useEffect(()=> {
        axios.get(url).then((response) => {
            // setPokemones(response.data.results)

            const pokemonList = response.data.results
            const pokemonPromises = pokemonList.map((pokemon) => {
                return axios.get(pokemon.url)
            })
            Promise.all(pokemonPromises).then(pokemonResponses =>{
                const pokemonData = pokemonResponses.map(res => {
                    const pokemon = res.data
                    return {
                        ...pokemon, //los ... esparce todos los datos dentro del objeto, el equivalente es una lista en python y se le hace append
                        image: pokemon.sprites.front_default, 
                        sprites: pokemon.sprites

                    }
                })
                setPokemones(pokemonData)
            })
        })
    }, [setPokemones])


  return (
    <div className="container mt-4">
        
        {pokemones.map((pokemon) => {
        
            return <Pokemon key={pokemon.id} pokemon={pokemon}/>
        }
        )}
    </div>

  )
}
