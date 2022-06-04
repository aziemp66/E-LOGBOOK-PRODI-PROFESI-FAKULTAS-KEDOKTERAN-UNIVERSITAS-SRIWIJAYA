import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styles from "./CircularProgressBar.module.css";

const CircularProgressBar = (props) => {
  const { percentage } = props;
  return (
    <div className={styles.card}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "rgb(143,186,95)",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
