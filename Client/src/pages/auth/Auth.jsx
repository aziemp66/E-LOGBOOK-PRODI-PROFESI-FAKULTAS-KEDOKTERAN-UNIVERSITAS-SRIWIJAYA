import { useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../../components/form/register/Register";
import Login from "../../components/form/login/Login";
import styles from "./Auth.module.css";

import AuthContext from "../../contexts/AuthContexts";

const Auth = () => {
	const navigate = useNavigate();
	const [authSwitch, setAuthSwitch] = useState(false);
	const authCtx = useContext(AuthContext);

	const authSwitchHandler = useCallback(() => {
		setAuthSwitch((prevAuthSwitch) => !prevAuthSwitch);
	}, []);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			authCtx.userDataHandler(localStorage.getItem("token"));
		}
		if (authCtx.userData) {
			navigate("/dashboard");
			console.log("authCtx.userData", authCtx.userData);
		}
	}, [localStorage.getItem("token"), authCtx.userData]);

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
