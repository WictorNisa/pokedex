import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = `https://pokeapi.co/api/v2/`;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const res = await apiClient.get(`pokemon?limit=${limit}&offset=${offset}`);
    const results = res.data.results;

    //Fetch additional details for each Pokemon
    const detailedPokemonList = await Promise.all(
      results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          image: details.data.sprites.front_default,
          types: details.data.types.map((type) => type.type.name),
        };
      })
    );

    return detailedPokemonList;
  } catch (error) {
    console.log("Error fetching pokemon list: ", error);
    throw error;
  }
};

export const getPokemonDetails = async (pokemonNameOrId) => {
  try {
    const res = await apiClient.get(`/pokemon/${pokemonNameOrId}`);
    return res.data;
  } catch (error) {
    console.log(
      `Error fetching details for pokemon: ${pokemonNameOrId}`,
      error
    );
    throw error;
  }
};
