import React from "react";
import styles from "./WelcomeCard.module.css";

import welcomeHero from "../../assets/hero/welcome-hero.svg";

const WelcomeCard = ({ username, message }) => {
  return (
    <div className={styles.welcomeCard}>
      <div className={styles.texts}>
        <h3>Halo {username}!</h3>
        <p>{message}</p>
      </div>
      <div className={styles.hero}>
        <img src={welcomeHero} alt="welcome-card-hero" />
      </div>
    </div>
  );
};

export default WelcomeCard;
