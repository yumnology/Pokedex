import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Pokemon } from './Pokemon'
import db from '../firebase/firebaseConfig'
import { collection, addDoc, getDoc, onSnapshot, doc, setDoc, Timestamp, updateDoc} from 'firebase/firestore'


/* async function getData(db) {
    const coleccion = collection(db, 'team');
    const documento = await getDocs(coleccion, 'principal');
    const listaresult = documento.docs.map(doc => {
        doc.data()
        console.log(doc.data())
    });
    return listaresult;
    
  } */



export const Pokedex = () => {
    const [pokemones, setPokemones] = useState([])
    const [team, setTeam] = useState([])
    const [page, setPage] = useState(1)
    /* const listaresult = getData(db)
    //console.log(listaresult) */

    const addPokemon = (pokemon) => {  
        if (team.length < 6 && !team.includes(pokemon)){
            setTeam([...team, pokemon])
            console.log(team) 
            //dbupdate(team) 
        }   
    }

    const deletePokemon = (pokemon) => {
        // Remove the specified Pokémon from the team
        setTeam(team.filter((pokemonInTeam) => pokemonInTeam !== pokemon));
        console.log(`Removed ${pokemon} from the team`);
        //dbupdate(team)
      };
      

    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`

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
    }, [setPokemones, page])



    useEffect(() => {
        if (team.length > 0) {
          const datatosend = team.map((pokemon) => {
            if (pokemon.image) {
              return {
                name: pokemon.name,
                image: pokemon.image,
              };
            } else if (pokemon.sprite) {
              return {
                name: pokemon.name,
                image: pokemon.sprite,
              };
            }
          })
      
          setDoc(doc(db, "team", "principal"), { datatosend });
        } else{
            setTimeout(() => {
                setDoc(doc(db, "team", "principal"), { });
            }, 1000)
            
        }
      }, [team]);
      

    //Get team
    useEffect(() => {
        getDoc(doc(db, "team", "principal")).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // Extract the data from the document
            const teamData = docSnapshot.data();
            console.log("TEAMDATA",teamData)
            // Assuming 'datatosend' is the field containing the array of pokemons
            if (teamData.datatosend && Array.isArray(teamData.datatosend)) {
              setTeam(teamData.datatosend);
              console.log("SetTeam success")
            } else {
              console.log("Team data is not in the expected format");
              setTeam([]);
            }
          } else {
            console.log("Document doesn't exist or error occurred");
            setTeam([]); // Set the team to an empty array if the document doesn't exist
          }
        });
    }, []);
    
      



  return (
    <>
    <div>
        <h3>Team</h3>
    {team.map((pokemon) => {
        
        return <Pokemon key={pokemon.name} pokemon={pokemon} addPoke={()=> deletePokemon(pokemon)} select={false}/>
        }
        )}
    </div>

    <div className="container mt-4">

        
    <h3>Select pokemons</h3>
        {pokemones.map((pokemon) => {
            
            return <Pokemon key={pokemon.id} pokemon={pokemon} addPoke={()=> addPokemon(pokemon)} select={true}/>
        }
        )}
        <div>
            {
                page != 1 && <button onClick={() => setPage(page - 1)}>Anterior</button> 
            }
            
            <button onClick={() => setPage(page + 1)}>Siguiente</button>
        </div>
    </div>
    </>
  )
}
