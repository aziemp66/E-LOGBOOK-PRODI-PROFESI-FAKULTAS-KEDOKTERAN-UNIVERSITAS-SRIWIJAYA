import React from "react";

import styles from "./ProgressCard.module.css";

import CircularProgressBar from "../ui/circularprogressbar/CircularProgressBar";

const ProgressCard = (props) => {
	const { percentage, stase, skillCompetences, diseasesCompetences, title } =
		props;
	const uncompleted = 100 - percentage;
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
					{/* prettier-ignore */}
					<h4>Stase 					: {stase}</h4>
				</div>
				<div>
					{/* prettier-ignore */}
					<h4>Kompetensi Penyakit 	: Level {diseasesCompetences}</h4>
				</div>
				<div>
					<h4>Kompetensi Keterampilan : Level {skillCompetences}</h4>
				</div>
			</div>
		</div>
	);
};

export default ProgressCard;
