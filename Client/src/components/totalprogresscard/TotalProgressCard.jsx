import React from "react";

import LineProgressBar from "../ui/lineprogressbar/LineProgressBar";

import styles from "./TotalProgressCard.module.css";

const TotalProgressCard = (props) => {
  const { percentage, title, isVerified } = props;
  const uncompleted = 100 - percentage;
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.progressList}>
        <div className={styles.progress}>
          <h4>Tercapai</h4>
          <LineProgressBar percentage={percentage} />
        </div>
        <div className={styles.progress}>
          <h4>Belum tercapai</h4>
          <LineProgressBar percentage={uncompleted} />
        </div>
      </div>
    </div>
  );
};

export default TotalProgressCard;
