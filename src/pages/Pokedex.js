import React, { useState, useEffect } from "react";
import styles from "./Pokedex.module.css";
import { getPokemonDetails, getPokemonList } from "../services/api";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import SearchBar from "../components/SearchBar/SearchBar";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const setFilteredPokemon = (filteredList) => {
    setFilteredPokemonList(filteredList);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const handleMoreDetails = async (pokemonName) => {
    setLoadingDetails(true);
    console.log("Button clicked for:", pokemonName); // Debugging log
    try {
      const details = await getPokemonDetails(pokemonName);
      console.log("Fetched details:", details); // Debug log
      setSelectedPokemon(details);
      setIsModalOpen(true);
    } catch (error) {
      console.log(`Failed to fetch pokemon details`, error);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    console.log("Is modal open:", isModalOpen);
    console.log("Selected pokemon:", selectedPokemon);
  }, [isModalOpen, selectedPokemon]);

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
  if (loadingDetails) return <p>Loading Pokémon details...</p>;

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
            onMoreDetails={() => handleMoreDetails(pokemon.name)}
          />
        ))}
      </div>
      {isModalOpen && (
        <PokemonDetails
          selectedPokemon={selectedPokemon}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

export default Pokedex;
