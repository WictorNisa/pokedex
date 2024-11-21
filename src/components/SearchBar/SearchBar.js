import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ pokemonList, setFilteredPokemon }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter the Pokémon list dynamically as user types

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query); // Update the search query state

    // Filter Pokémon list based on the current search query
    const filteredList = pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase().includes(query) // Case-insensitive match
    );

    setFilteredPokemon(filteredList); // Update the filtered list
  };

  return (
    <div>
      <label>
        <span>Search Pokémon</span>
        <input type="text" value={searchQuery} onChange={handleSearchChange} />
      </label>
    </div>
  );
};

export default SearchBar;
