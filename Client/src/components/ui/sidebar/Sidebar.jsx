import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

import unsriLogo from "../../../assets/logo/logo unsri.svg";
import AuthContext from "../../../contexts/AuthContexts";

const Sidebar = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogoutHandler = () => {
		authCtx.logout();
		navigate("/");
	};

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
						<button onClick={onLogoutHandler}>
							<span>Logout</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
