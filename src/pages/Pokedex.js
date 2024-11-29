import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Pokedex.module.css";
import { getPokemonDetails, getPokemonList } from "../services/api";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";
import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [cardBackground, setCardBackground] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const handleMoreDetails = async (pokemonName) => {
    setLoadingDetails(true);
    console.log("Button clicked for:", pokemonName); // Debugging log
    try {
      const details = await getPokemonDetails(pokemonName);
      if (details) {
        setSelectedPokemon(details); // Only set if data is valid
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(`Failed to fetch pokemon details`, error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const fetchMorePokemon = async () => {
    try {
      const data = await getPokemonList(20, offset);
      setPokemonList((prevList) => [...prevList, ...data]);
      setFilteredPokemonList((prevList) => [...prevList, ...data]);
      setOffset((prevOffset) => prevOffset + 20);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      await fetchMorePokemon();
      setOffset(20); // Set offset to 20 after the initial fetch
    };
    initialFetch();
  }, []);

  if (loading && offset === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.pokedexContainer}>
      <div className={styles.infoPokedexContainer}>
        <h1>Discover the Pokédex </h1>
        <div className={styles.lineDivider}>
          <span className={styles.line}></span>
          <span className={styles.dots}>
            <span className={styles.dotSmall}></span>
            <span className={styles.dotBig}></span>
            <span className={styles.dotSmall}></span>
          </span>
          <span className={styles.line}></span>
        </div>
        <p>
          Browse, discover, and learn all about your favorite Pokémon with
          detailed stats and fascinating insights!
        </p>
      </div>

      <InfiniteScroll
        dataLength={pokemonList.length}
        next={fetchMorePokemon}
        hasMore={hasMore}
        loader={<PuffLoader />}
        className={styles.pokedexGalleryContainer}
      >
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
      </InfiniteScroll>

      {isModalOpen && (
        <motion.div
          className={styles.modalContainer}
          style={{ background: cardBackground }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {loadingDetails ? (
            <PuffLoader color="#36d7b7" />
          ) : (
            selectedPokemon && (
              <PokemonDetails
                selectedPokemon={selectedPokemon}
                closeModal={closeModal}
                cardBackground={cardBackground}
              />
            )
          )}
        </motion.div>
      )}
    </section>
  );
};

export default Pokedex;
