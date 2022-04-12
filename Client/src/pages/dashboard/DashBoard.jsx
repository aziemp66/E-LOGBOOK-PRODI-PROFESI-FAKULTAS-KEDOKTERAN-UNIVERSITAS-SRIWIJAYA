import React from "react";

import styles from "./DashBoard.module.css";

import searchIcon from "../../assets/icons/search.svg";

const DashBoard = () => {
	return (
		<div className={styles.container}>
			<div className={styles.searchBar}>
				<input type="text" placeholder="Search" />
				<img src={searchIcon}></img>
			</div>
			<section></section>
		</div>
	);
};

export default DashBoard;
