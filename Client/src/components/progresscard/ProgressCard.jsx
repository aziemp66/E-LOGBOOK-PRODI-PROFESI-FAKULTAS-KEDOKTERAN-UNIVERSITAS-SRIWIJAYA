import React from "react";

import styles from "./ProgressCard.module.css";

import CircularProgressBar from "../ui/circularprogressbar/CircularProgressBar";

const ProgressCard = (props) => {
  const { percentage, stase, skillCompetences, diseasesCompetences, title } =
    props;
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.circleProgress}>
        <CircularProgressBar percentage={percentage} />
      </div>
      <div className={styles.progressList}>
        <div>
          <p>Stase : {stase}</p>
        </div>
        <div>
          <p>Kompetensi Penyakit : Level {diseasesCompetences}</p>
        </div>
        <div>
          <p>Kompetensi Keterampilan : Level {skillCompetences}</p>
        </div>
        <div>
          <p>
            Status : <span>Terverifikasi</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
