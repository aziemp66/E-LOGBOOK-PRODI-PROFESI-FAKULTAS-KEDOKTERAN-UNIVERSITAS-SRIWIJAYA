import { useState, useCallback, useContext, useEffect } from "react";

import Register from "./register/Register";
import Login from "./login/Login";
import styles from "./Auth.module.css";

import AuthContext from "../../contexts/authContexts";

const Auth = () => {
	const [authSwitch, setAuthSwitch] = useState(false);
	const authCtx = useContext(AuthContext);

	const authSwitchHandler = useCallback(() => {
		setAuthSwitch((prevAuthSwitch) => !prevAuthSwitch);
	}, []);

	useEffect(() => {
		authCtx.logout();
		console.log();
	}, []);

	return (
		<div className={styles.background}>
			<section className={styles.title}>
				<h1>
					E-LOGBOOK PRODI PROFESI FAKULTAS KEDOKTERAN UNIVERSITAS
					SIRIWIJAYA
				</h1>
			</section>
			{authSwitch ? (
				<Register onSwitch={authSwitchHandler} />
			) : (
				<Login onSwitch={authSwitchHandler} />
			)}
		</div>
	);
};

export default Auth;
