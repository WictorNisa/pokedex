import React from "react";
import styles from "./PokemonCard.module.css";
import { typeGradients, typeColors } from "../../utils/typeStyles";
import Button from "../Button/Button";
import { useEffect } from "react";

const PokemonCard = ({ src, name, types, onMoreDetails }) => {
  // Flattening the types array to get individual type names
  const type = Array.isArray(types) ? types[0] : "unknown";

  // Set the background gradient for the first type
  const cardBackground =
    typeGradients[type] || "linear-gradient(135deg, #CCC, #EEE)";
  console.log("Types array for:", name, types);

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
        <Button onMoreDetails={onMoreDetails} />
      </div>
    </div>
  );
};

export default PokemonCard;
