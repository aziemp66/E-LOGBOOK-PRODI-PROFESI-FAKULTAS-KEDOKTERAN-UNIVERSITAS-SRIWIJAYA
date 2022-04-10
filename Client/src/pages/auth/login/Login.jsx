import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../../../components/ui/button/Button";

import AuthContext from "../../../contexts/AuthContexts";

const Login = (props) => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const loginHandler = (e) => {
		e.preventDefault();
		authCtx.login();
		console.log(authCtx.isAuth);
		navigate("/dashboard");
	};

	return (
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
			<p className={styles.forgotPassword}>
				Forgotten your username or password?
			</p>
			<Button type={"submit"}>Log in</Button>
			<div>
				<p className={styles.switch}>
					Don't have an account?{" "}
					<span onClick={props.onSwitch}>Sign up</span>
				</p>
			</div>
		</form>
	);
};

export default Login;
