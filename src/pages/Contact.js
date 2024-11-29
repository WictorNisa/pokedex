import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <footer className={styles.contactFooter}>
      <div className={styles.bigText}>Contact me</div>
      <div className={styles.contactContainer}>
        <h1>Contact me</h1>
        <p>
          I'm Wictor, reach out to me on github
        </p>
        <button>
          <a
            href="https://github.com/WictorNisa"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            GitHub
          </a>
        </button>
      </div>
    </footer>
  );
};

export default Contact;
