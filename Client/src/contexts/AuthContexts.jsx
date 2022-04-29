import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
	isAuth: false,
	register: (email, username, password, confirmPassword) => {},
	login: (username, password) => {},
	logout: () => {},
	error: null,
});

const BASE_URL = "http://localhost:5000/api";

export const AuthProvider = (props) => {
	const [isAuth, setIsAuth] = useState(false);
	const [error, setError] = useState(null);

	const register = (email, username, password, confirmPassword) => {
		axios
			.post(`${BASE_URL}/register`, {
				email,
				username,
				password,
				confirmPassword,
			})
			.then((res) => {
				if (res.data.error) {
					setError(res.data.error);
					return;
				}
				console.log(res.data);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	const login = () => {
		setIsAuth(true);
	};

	const logout = () => {
		setIsAuth(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("user");
		if (token) {
			setIsAuth(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				register,
				login,
				logout,
				error,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
