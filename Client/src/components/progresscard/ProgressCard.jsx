import React from "react";

import styles from "./ProgressCard.module.css";

import CircularProgressBar from "../ui/circularprogressbar/CircularProgressBar";
import LineProgressBar from "../ui/lineprogressbar/LineProgressBar";

const ProgressCard = (props) => {
	const { percentage, circleProgressBar, title } = props;
	const uncompleted = 100 - percentage;
	return (
		<div className={styles.card}>
			<div className={styles.title}>
				<h3>{title}</h3>
			</div>
			{circleProgressBar && (
				<div className={styles.circleProgress}>
					<CircularProgressBar percentage={percentage} />
				</div>
			)}
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

export default ProgressCard;
