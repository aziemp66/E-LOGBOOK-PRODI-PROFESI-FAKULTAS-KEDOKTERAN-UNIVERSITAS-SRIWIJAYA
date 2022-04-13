import React from "react";

import styles from "./DashBoard.module.css";

import SearchBar from "../../components/searchbar/SearchBar";

import welcomeHero from "../../assets/hero/welcome-hero.svg";
import PresentionCard from "../../components/presentioncard/PresentionCard";

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
				<div className={styles.welcomeCard}>
					<div className={styles.texts}>
						<h3>Fiolinora Syafiya</h3>
						<p>
							Selamat datang di E-Logbook Program Studi Profesi
							Fakultas Kedokteran Universitas Sriwijaya
						</p>
					</div>
					<div className={styles.hero}>
						<img src={welcomeHero} alt="welcome-card-hero" />
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
