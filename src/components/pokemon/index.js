import './index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Pokemon = ({ pokemonName }) => {
    const [pokemonData, setPokemonData ] = useState(null);

    useEffect( () => {
        async function fetchData(pokemonName) {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                setPokemonData(result.data);

            } catch (e) {
                console.error(e);
            }
        }
        fetchData(pokemonName);
    }, [pokemonName]);

    return(
            <div className="pokemon-container">
                { pokemonData &&
                <div className="pokemon-card shadow">
                    <h2>{pokemonData.name}</h2>
                    <div className="pokemon-image-wrapper">
                        <img className="pokemon-image" alt="pokemon" src={pokemonData.sprites.other.dream_world.front_default} />
                    </div>
                    <div className="pokemon-item">
                        <label className="pokemon-label">Moves</label>
                        <p>{pokemonData.moves.length}</p>
                    </div>
                    <div className="pokemon-item">
                        <label className="pokemon-label">Weight</label>
                        <p>{pokemonData.weight}</p>
                    </div>
                    <div className="pokemon-item-abilities">
                        <label className="pokemon-label">Abilities</label>
                        { pokemonData.abilities.map((ability) => {
                                return <p key={ability.ability.name} className="pokemon-ability">{ability.ability.name}</p>
                        })
                        }
                    </div>
                </div>
                }
            </div>
    );
};