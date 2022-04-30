import React, { useState, useEffect } from "react";
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
			setError("Password and Confirm Password must be same");
			return;
		}

		const response = await axios.post(`${BASE_URL}/register`, {
			email,
			username,
			password,
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
		}

		localStorage.setItem("token", response.data.accessToken);
		setUserData(localStorage.getItem("token"));
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUserData(null);
	};

	const userDataHandler = (token) => {
		setUserData(token);
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
