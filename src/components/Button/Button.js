import React from "react";
import styles from "./Button.module.css";

const Button = ({ onMoreDetails }) => {
  return (
    <button className={styles.detailsButton} onClick={onMoreDetails}>
      More Details
    </button>
  );
};

export default Button;
