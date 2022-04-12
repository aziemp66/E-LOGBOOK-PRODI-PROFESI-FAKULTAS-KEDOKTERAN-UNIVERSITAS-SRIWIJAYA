import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
	const { percentage } = props;
	return (
		<div className={styles.card}>
			<CircularProgressbar
				value={percentage}
				text={`${percentage}%`}
				styles={buildStyles({
					strokeLinecap: "round",
					textSize: "16px",
					pathTransitionDuration: 0.5,
					pathColor: `rgba(156, 182, 128, ${percentage / 100})`,
					textColor: "#f88",
					trailColor: "#d6d6d6",
					backgroundColor: "#3e98c7",
				})}
			/>
		</div>
	);
};

export default ProgressBar;
