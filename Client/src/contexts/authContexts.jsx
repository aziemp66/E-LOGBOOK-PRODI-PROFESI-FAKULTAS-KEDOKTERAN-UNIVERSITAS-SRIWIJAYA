import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isAuth: false,
	register: (email, username, password) => {},
	login: (username, password) => {},
	logout: () => {},
});

export const AuthProvider = (props) => {
	const [isAuth, setIsAuth] = useState(false);

	const register = (email, username, password) => {
		setIsAuth(true);
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
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
