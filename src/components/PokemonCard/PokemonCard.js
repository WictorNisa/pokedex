import React from "react";
import styles from "./PokemonCard.module.css";
import { typeGradients, typeColors } from "../../utils/typeStyles";
import Button from "../Button/Button";

const PokemonCard = ({ src, name, types }) => {
  // Flattening the types array to get individual type names
  const type = types[0];
  // Set the background gradient for the first type
  const cardBackground =
    typeGradients[type] || "linear-gradient(135deg, #CCC, #EEE)";

  return (
    <div
      className={styles.cardContainer}
      style={{ background: cardBackground }}
    >
      <div className={styles.imgContainer}>
        <img src={src} alt={name} />
        <h3>{name}</h3>
      </div>
      <div className={styles.details}>
        <div className={styles.typeContainer}>
          {types.map((typeName, index) => (
            <div
              key={index}
              style={{ backgroundColor: typeColors[typeName] || "#DDD" }}
              className={styles.typeContainerInner}
            >
              <p>{typeName}</p>
            </div>
          ))}
        </div>
        <Button/>
      </div>
    </div>
  );
};

export default PokemonCard;
