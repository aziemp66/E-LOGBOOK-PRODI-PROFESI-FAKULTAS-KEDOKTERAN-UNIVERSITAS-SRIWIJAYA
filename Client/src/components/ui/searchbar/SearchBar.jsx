import React from "react";

import searchIcon from "../../../assets/icons/search.svg";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
	return (
		<div className={styles.container}>
			<div className={styles.searchBar}>
				<input type="text" placeholder="Search" />
				<img src={searchIcon}></img>
			</div>
		</div>
	);
};

export default SearchBar;
