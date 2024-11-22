import React from "react";
import styles from "./PokemonDetails.module.css";
import starIcon from "../../assets/img/favourite-star-svgrepo-com.svg";

const PokemonDetails = ({ selectedPokemon, closeModal }) => {
  //Things to extract from the props: English name, number in the pokedex #, types, image, height, weight, bio and evolutions
  const { name, id, types, sprites, height, weight, flavor_text_entries } =
    selectedPokemon;

  const bio = flavor_text_entries?.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;

  if (!selectedPokemon) {
    return <p>Loading Pokémon details...</p>;
  }

  return (
    <>
      <div className={styles.modalBackdrop} onClick={closeModal}></div>
      <div className={styles.pokemonModalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.nameContainer}>
            <p>#00{id}</p>
            <h4>{name}</h4>
          </div>

          <div className={styles.favouriteContainer}>
            <img src={starIcon} alt="Favourite Icon" />
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img src={sprites.front_default} alt={name} />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.infoContainer}>
            <p>Height -</p>
            <span>{height}</span>
            <p>Weight -</p>
            <span>{weight}</span>
            <p>Type -</p>
            <span>{types.map((type) => type.type.name).join(", ")}</span>
          </div>

          <div className={styles.bioContainer}>
            <p>{bio || "No bio available for this pokemon"}</p>
          </div>
        </div>

        <div className={styles.evoContainer}>
          <h5>Evolution</h5>
          <div className={styles.innerEvoContainer}>Coming soon...</div>
        </div>

        <div className={styles.closeModalContainer}>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
