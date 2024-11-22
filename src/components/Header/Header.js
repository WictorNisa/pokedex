import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <span>Pokédex</span>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pages/pokedex">Pokedex</Link>
          </li>
          <li>
            <Link to="/pages/favourites">Favourites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
