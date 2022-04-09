import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./pages/auth/Auth";
import { AuthProvider } from "./contexts/authContexts";

const App = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Auth />} />
			</Routes>
		</AuthProvider>
	);
};

export default App;
