import React from "react";

import styles from "./DashBoard.module.css";

import SearchBar from "../../components/searchbar/SearchBar";

import welcomeHero from "../../assets/hero/welcome-hero.svg";
import ProgressBar from "../../components/ui/progressbar/ProgressBar";

const DashBoard = () => {
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
				<ProgressBar percentage={77} />
			</section>
		</div>
	);
};

export default DashBoard;
