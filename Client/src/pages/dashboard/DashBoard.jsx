import React from "react";

import styles from "./DashBoard.module.css";

import searchIcon from "../../assets/icons/search.svg";

const DashBoard = () => {
	return (
		<div className={styles.container}>
			<div className={styles.searchBar}>
				<table>
					<tr>
						<td>
							<input
								type="text"
								placeholder="Search"
								className={styles.search}
							/>
						</td>
						<td>
							<button className={styles.searchButton}>
								<img src={searchIcon}></img>
							</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
	);
};

export default DashBoard;
