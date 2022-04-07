import styles from "./Register.module.css";
import Button from "../../../components/ui/button/Button";

const Register = (props) => {
	return (
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
			<Button>Sign Up</Button>
			<div>
				<p className={styles.switch}>
					Already have an account?{" "}
					<span onClick={props.onSwitch}>Log in</span>
				</p>
			</div>
		</form>
	);
};

export default Register;
