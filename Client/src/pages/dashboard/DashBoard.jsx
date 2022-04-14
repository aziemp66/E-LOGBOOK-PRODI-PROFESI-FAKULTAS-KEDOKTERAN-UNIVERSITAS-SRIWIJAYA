import React from "react";

import styles from "./DashBoard.module.css";

import SearchBar from "../../components/searchbar/SearchBar";

import welcomeHero from "../../assets/hero/welcome-hero.svg";
import PresentionCard from "../../components/presentioncard/PresentionCard";
import ProgressCard from "../../components/progresscard/ProgressCard";

const DashBoard = () => {
	const present = 26;
	const sick = 2;
	const excused = 1;
	const absent = 1;
	const holiday = 1;
	return (
		<div className={styles.container}>
			<SearchBar />
			<section className={styles.content}>
				<div>
					<div className={styles.welcomeCard}>
						<div className={styles.texts}>
							<h3>Fiolinora Syafiya</h3>
							<p>
								Selamat datang di E-Logbook Program Studi
								Profesi Fakultas Kedokteran Universitas
								Sriwijaya
							</p>
						</div>
						<div className={styles.hero}>
							<img src={welcomeHero} alt="welcome-card-hero" />
						</div>
					</div>
					<ul className={styles.progressList}>
						<ProgressCard
							title={"Capaian Penyakit"}
							circleProgressBar={true}
							percentage={75}
							className={styles.progressCard}
						/>
						<ProgressCard
							title={"Capaian Penyakit"}
							circleProgressBar={true}
							percentage={75}
							className={styles.progressCard}
						/>
					</ul>
					<div className={styles.totalProgress}>
						<ProgressCard
							title={"Total Capaian Penyakit"}
							percentage={75}
						/>
						<ProgressCard
							title={"Capaian Ketrampilan Klinik"}
							percentage={40}
						/>
					</div>
				</div>
				<PresentionCard
					present={present}
					sick={sick}
					excused={excused}
					absent={absent}
					holiday={holiday}
				/>
			</section>
		</div>
	);
};

export default DashBoard;
