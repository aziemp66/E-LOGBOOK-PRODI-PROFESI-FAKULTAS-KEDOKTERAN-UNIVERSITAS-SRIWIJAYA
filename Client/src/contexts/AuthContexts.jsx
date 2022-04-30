import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AuthContext = React.createContext({
	userData: null,
	userDataHandler: (token) => {},
	isError: false,
	register: (email, username, password, confirmPassword) => {},
	login: (username, password) => {},
	logout: () => {},
});

const BASE_URL = "http://localhost:5000/api";

export const AuthProvider = (props) => {
	const [error, setError] = useState(false);
	const [userData, setUserData] = useState(null);

	const register = async (email, username, password, confirmPassword) => {
		console.log("register", email, username, password, confirmPassword);

		if (password !== confirmPassword) {
			return setError("Password and Confirm Password must be same");
		}

		const response = await axios.post(`${BASE_URL}/register`, {
			email,
			username,
			password,
			confirmPassword,
		});

		if (response.data.error) {
			console.log(response.data.error);
			setError(response.data.error);
			return;
		}
	};

	const login = async (username, password) => {
		const response = await axios.post(`${BASE_URL}/login`, {
			username,
			password,
		});

		if (response.data.error) {
			console.log(response.data.error);
			setError(response.data.error);
			return;
		}

		localStorage.setItem("token", response.data.accessToken);
		setUserData(jwtDecode(response.data.accessToken));
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUserData(null);
	};

	const userDataHandler = (token) => {
		const user = jwtDecode(token);
		if (user.exp * 1000 < Date.now()) {
			logout();
			return;
		}
		setUserData(user);
	};

	return (
		<AuthContext.Provider
			value={{
				register,
				login,
				logout,
				error,
				userData,
				userDataHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
