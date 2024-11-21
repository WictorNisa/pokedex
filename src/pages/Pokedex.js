import React, { useState, useEffect } from "react";
import styles from "./Pokedex.module.css";
import { getPokemonDetails, getPokemonList } from "../services/api";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import SearchBar from "../components/SearchBar/SearchBar";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  const setFilteredPokemon = (filteredList) => {
    setFilteredPokemonList(filteredList);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList(20, 0);
        console.log(data);
        setPokemonList(data);
        setFilteredPokemonList(data);
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

  console.log("Filtered List in Pokedex:", filteredPokemonList);
  console.log("Full List of Pokémon:", pokemonList);
  return (
    <section className={styles.pokedexContainer}>
      Pokedex Page\
      <SearchBar
        pokemonList={pokemonList}
        setFilteredPokemon={setFilteredPokemon}
      />
      <div className={styles.pokedexGalleryContainer}>
        {(filteredPokemonList.length > 0
          ? filteredPokemonList
          : pokemonList
        ).map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            src={pokemon.image}
            name={pokemon.name}
            types={pokemon.types}
          />
        ))}
      </div>
    </section>
  );
};

export default Pokedex;
