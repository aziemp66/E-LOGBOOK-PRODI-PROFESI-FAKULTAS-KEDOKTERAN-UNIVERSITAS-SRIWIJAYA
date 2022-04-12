import React from "react";

import styles from "./DashBoard.module.css";

import searchIcon from "../../assets/icons/search.svg";
import SearchBar from "../../components/ui/searchbar/SearchBar";

const DashBoard = () => {
	return (
		<div className={styles.container}>
			<SearchBar />
		</div>
	);
};

export default DashBoard;
