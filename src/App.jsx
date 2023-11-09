import { useState } from 'react'
import './App.css'
import pokeLogo from './assets/pokeLogo.png'
import { Pokedex } from './components/pokedex'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://pokeapi.co" target="_blank">
          <img src={pokeLogo} className="logo" alt="Pokelogo" />
        </a>
      </div>
      <h1>Pokedex</h1>
      <div className="card">
        <Pokedex/>
      </div>
    </>
  )
}

export default App
