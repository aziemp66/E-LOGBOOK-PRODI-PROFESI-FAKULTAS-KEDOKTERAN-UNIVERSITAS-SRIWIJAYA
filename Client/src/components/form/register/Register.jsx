import React from "react";
import { Flip } from "react-reveal";

import styles from "./Register.module.css";
import Button from "../../ui/button/Button";

const Register = (props) => {
	return (
		<Flip left>
			<form className={styles.form}>
				<div>
					<h3>Sign Up</h3>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" />
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
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input type="password" id="confirmPassword" />
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
