import axios from "axios";
import { useState, useEffect } from "react";
import { extractEvolutionStages } from "../utils/extractEvo";

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

export const getPokemonDetails = async (pokemonName) => {
  try {
    // Fetch the basic Pokémon data
    const res = await apiClient.get(`/pokemon/${pokemonName}`);
    const pokemonData = res.data;

    // Fetch the species data using the species URL
    const speciesRes = await apiClient.get(pokemonData.species.url);
    const speciesData = speciesRes.data;

    // Fetch the evolution chain using the evolution_chan URL
    const evolutionRes = await apiClient.get(speciesData.evolution_chain.url);
    const evolutionData = evolutionRes.data;

    // Extract the bio from the species data
    const bio = speciesData.flavor_text_entries?.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text;

    const japaneseName = speciesData.names.find(
      (entry) => entry.language.name === "ja"
    )?.name;

    // Extract the evolution stages
    const evolutionStages = extractEvolutionStages(evolutionData.chain);

    // Return the Pokemon data with bio and evolution stages

    //Fetch sprites for each evolution stage
    const evolutionStagesWithSprites = await Promise.all(
      evolutionStages.map(async (stage) => {
        const stageRes = await apiClient.get(
          `https://pokeapi.co/api/v2/pokemon/${stage.name}`
        );
        return {
          name: stage.name,
          sprite: stageRes.data.sprites.front_default, // Or use another sprite
        };
      })
    );

    return {
      ...pokemonData,
      bio: bio || "No bio available for this Pokemon",
      evolutionStages: evolutionStagesWithSprites,
      japName: japaneseName
    };
  } catch (error) {
    console.log(`Error fetching details for pokemon: ${pokemonName}`, error);
    throw error;
  }
};
