import React from "react";
import styles from "./Home.module.css";
import heroImg from "../assets/img/file (2).png";
import HeroDesign from "../components/HeroDesign/HeroDesign";

const Home = () => {
  return (
    <main className={styles.heroContainer}>
      <div className={styles.imgContainer}>
        <HeroDesign />
      </div>
    </main>
  );
};

export default Home;
