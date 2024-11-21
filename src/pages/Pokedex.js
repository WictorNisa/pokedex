import React, { useState, useEffect } from "react";
import styles from "./Pokedex.module.css";
import { getPokemonDetails, getPokemonList } from "../services/api";
import PokemonCard from "../components/PokemonCard/PokemonCard";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList(20, 0);
        console.log(data)
        setPokemonList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.pokedexContainer}>
      Pokedex Page\
      Search for a pokemon..
      <div className={styles.pokedexGalleryContainer}>
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} src={pokemon.image} name={pokemon.name} types={pokemon.types}/>
        ))}
      </div>
    </section>
  );
};

export default Pokedex;
