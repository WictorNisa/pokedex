import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <footer>
      <form className={styles.contactForm}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </footer>
  );
};

export default Contact;
