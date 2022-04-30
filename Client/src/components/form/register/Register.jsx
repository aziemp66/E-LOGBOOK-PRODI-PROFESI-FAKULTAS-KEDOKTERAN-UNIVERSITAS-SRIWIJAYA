import React, { useContext } from "react";
import AuthContext from "../../../contexts/AuthContexts";
import { Flip } from "react-reveal";

import styles from "./Register.module.css";
import Button from "../../ui/button/Button";

const Register = (props) => {
	const authCtx = useContext(AuthContext);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		authCtx.register(
			e.target.email.value,
			e.target.username.value,
			e.target.password.value,
			e.target.confirmPassword.value
		);
	};

	return (
		<Flip left>
			<form className={styles.form} onSubmit={onSubmitHandler}>
				<div>
					<h3>Sign Up</h3>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" />
				</div>
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" id="username" name="username" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" />
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
					/>
				</div>
				<Button type="submit" className="auth">
					Sign Up
				</Button>
				<div className={styles.switch}>
					<p>
						Already have an account?{" "}
						<span onClick={props.onSwitch}>Log in</span>
					</p>
				</div>
			</form>
		</Flip>
	);
};

export default Register;
