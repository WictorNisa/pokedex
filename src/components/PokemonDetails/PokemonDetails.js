import React from "react";
import styles from "./PokemonDetails.module.css";
import { PuffLoader } from "react-spinners";
import { typeGradients } from "../../utils/typeStyles";
import { motion } from "motion/react";

const PokemonDetails = ({ selectedPokemon, closeModal }) => {
  //Things to extract from the props: English name, number in the pokedex #, types, image, height, weight, bio and evolutions
  const { name, id, types, sprites, height, weight } = selectedPokemon;

  const typeNames = types.map(
    (type) => type.type?.name || (typeof type === "string" ? type : "unknown")
  );
  const type = typeNames[0]; // First type for the background
  const cardBackground =
    typeGradients[type] || "linear-gradient(135deg, #CCC, #EEE)";

  console.log("Types array for:", name, types);

  if (!selectedPokemon) {
    return <PuffLoader />;
  }

  return (
    <>
      <div className={styles.modalBackdrop} onClick={closeModal}></div>
      <div
        className={styles.pokemonModalContainer}
        style={{ background: cardBackground }}
      >
        <div className={styles.modalHeader}>
          <div className={styles.nameContainer}>
            <p>#00{id}</p>
            <h4>{name}</h4>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.imageInnerContainer}>
            <h2 className={styles.japaneseNameText}>
              {selectedPokemon.japName}{" "}
            </h2>
            <img
              src={sprites.other["official-artwork"].front_default}
              alt={name}
            />
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.infoContainer}>
            <p>Height -</p>
            <span>{height}"</span>
            <p>Weight -</p>
            <span>{weight}Kg</span>
            <p>Type -</p>
            <span>{types.map((type) => type.type.name).join("/")}</span>
          </div>

          <div className={styles.bioContainer}>
            <h3>Bio</h3>
            <p>{selectedPokemon.bio}</p>
          </div>
        </div>

        <div className={styles.evoContainer}>
          <h5>Evolution</h5>
          <div className={styles.innerEvoContainer}>
            <ul>
              {selectedPokemon.evolutionStages.map((stage, index) => (
                <li key={index}>
                  <p>{stage.name}</p>
                  <img
                    src={stage.sprite}
                    alt={stage.name}
                    className={styles.evoImage}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
