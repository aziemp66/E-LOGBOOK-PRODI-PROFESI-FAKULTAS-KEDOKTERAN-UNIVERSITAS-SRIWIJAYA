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
		fetch(`${BASE_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				username,
				password,
				confirmPassword,
			}),
		})
			.then((res) => {
				console.log("Fetch Success");
				if (res.error) {
					console.log(res.error);
					setError(res.error);
					throw new Error(res.error);
				}
			})
			.catch((err) => {
				console.log(err);
				setError(err);
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
