import React, { useContext, useEffect } from "react";
import { Flip } from "react-reveal";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../../ui/button/Button";

import AuthContext from "../../../contexts/AuthContexts";

const Login = (props) => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const loginHandler = (e) => {
		e.preventDefault();
		authCtx.login();
		navigate("/dashboard");
	};

	return (
		<Flip right>
			<form className={styles.form} onSubmit={loginHandler}>
				<div>
					<h3>Log in</h3>
				</div>
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" id="username" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" />
				</div>
				<div>
					<p className={styles.forgotPassword}>
						Forgotten your username or password?
					</p>
				</div>
				<Button type="submit" className="auth">
					Log in
				</Button>
				<div>
					<p className={styles.switch}>
						Don't have an account?{" "}
						<span onClick={props.onSwitch}>Sign up</span>
					</p>
				</div>
			</form>
		</Flip>
	);
};

export default Login;
