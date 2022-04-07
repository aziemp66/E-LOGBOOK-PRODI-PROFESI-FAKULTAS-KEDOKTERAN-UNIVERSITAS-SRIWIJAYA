import styles from "./Login.module.css";
import Button from "../../../components/ui/button/Button";

const Login = (props) => {
	return (
		<form className={styles.form}>
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
			<Button>Log in</Button>
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
