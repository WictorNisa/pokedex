export const extractEvolutionStages = (chain) => {
  const stages = [];
  let currentStage = chain;

  while (currentStage) {
    stages.push({
      name: currentStage.species.name,
      url: currentStage.species.url, // Save the species URL to fetch sprites later
    });
    currentStage = currentStage.evolves_to[0];
  }

  return stages;
};