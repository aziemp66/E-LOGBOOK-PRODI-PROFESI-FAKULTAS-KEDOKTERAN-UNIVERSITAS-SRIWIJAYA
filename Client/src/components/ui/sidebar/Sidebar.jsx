import React from "react";
import styles from "./Sidebar.module.css";

import unsriLogo from "../../../assets/logo/logo unsri.svg";

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles["sidebar-header"]}>
				<h3>
					<img src={unsriLogo} />
					<span>Fakultas Kedokteran</span>
				</h3>
			</div>
			<div className={styles["sidebar-body"]}>
				<ul className={styles["nav-list"]}>
					<li>
						<a href="#">
							<span>Profile</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span>Logout</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
