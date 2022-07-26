import React from "react";

import styles from "./ProgressCard.module.css";

import CircularProgressBar from "../ui/circularprogressbar/CircularProgressBar";

const ProgressCard = (props) => {
  const { stase, skillCompetences, diseasesCompetences, title, isVerified } =
    props;

  let total = 0;
  let progress = 0;

  [stase, skillCompetences, diseasesCompetences, title, isVerified].map(
    (value) => {
      total++;
      console.log(total);

      if (value) {
        progress++;
      }
    }
  );
  //percentage is equal to floor of progress / total * 100
  // console.log(progress, total);
  const percentage = Math.floor((progress / total) * 100);
  // console.log(percentage);

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
          <p>Status : {isVerified ? "Terverifikasi" : "Belum Terverifikasi"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
