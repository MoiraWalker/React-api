import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import pokemonLogo from "./assets/pokemon-logo.png";
import { Button, Pokemon } from "./components";

function App() {
  const [pokemonName, setPokemonName ] = useState("");
  const [ currentPageUrl, setCurrentPageUrl ] = useState(`https://pokeapi.co/api/v2/pokemon`);
  const [ nextPageUrl, setNextPageUrl ] = useState();
  const [ previousPageUrl, setPreviousPageUrl ] = useState();

  useEffect( () => {
    async function fetchPokemons() {
      try {
        const result = await axios.get(currentPageUrl);
        setPokemonName(result.data.results);
        setNextPageUrl(result.data.next);
        setPreviousPageUrl(result.data.previous);
      } catch (e) {
        console.error(e);
      }
    }
    fetchPokemons();
  }, [currentPageUrl] )

  function nextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function previousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  return(
      <div className="app">
        <header className="app-header">
          <img className="pokemon-logo" src={pokemonLogo} alt="logo"/>
        </header>
        <div className="button-wrapper">
          <Button onClick={previousPage} className={!previousPageUrl ? 'disabled-button' : 'primary-button'}>Previous</Button>
          <Button onClick={nextPage} className={!nextPageUrl ? 'disabled-button' : 'primary-button'} >Next</Button>
        </div>
        <div className="page-container">
          {pokemonName &&
          <div className="pokemon-name-list">
            {
              pokemonName.map((names) => {
                return <Pokemon key={names.name} pokemonName={names.name}></Pokemon>
              })
            }
          </div>
          }
        </div>
      </div>
  );
}

export default App;
