import React from "react";
import styles from "./HeroDesign.module.css";
import { motion } from "motion/react";
import { animate, delay, stagger } from "motion";
import { text } from "motion/react-client";

const HeroDesign = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: "easeInOut",
        staggerChildren: .8,
        
      },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: .5 } },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: .5 } },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: .5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 2.8 } , },
  };
  return (
    <div className={styles.heroDesignWrapper}>
      <motion.div
        className={styles.HeroDesignContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={`${styles.card} ${styles.cardLeft}`}
          variants={slideInLeftVariants}
        >
          <motion.h2 variants={textVariants}>
            Discover the World of Pokémon
          </motion.h2>
          <motion.p variants={textVariants}>
            Browse through a collection of Pokémon and learn fun facts about
            each. Find your favorites and start your journey!
          </motion.p>
        </motion.div>
        <motion.div
          className={`${styles.card} ${styles.cardMiddle}`}
          variants={slideInVariants}
        >
          <motion.h1 variants={textVariants}>Welcome to the Pokédex</motion.h1>
          <motion.p variants={textVariants}>
            Dive into the ultimate Pokémon experience. View Pokémon details and
            keep track of the ones you love by favoriting them.
          </motion.p>
        </motion.div>
        <motion.div
          className={`${styles.card} ${styles.cardRight}`}
          variants={slideInRightVariants}
        >
          <motion.h3 variants={textVariants}>Personalize Your Journey</motion.h3>
          <motion.p variants={textVariants}>
            Mark Pokémon as favorites to build your own collection. It's your
            personal adventure—ready to begin?
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroDesign;
