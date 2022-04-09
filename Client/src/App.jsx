import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
import Sidebar from "./components/ui/sidebar/Sidebar";
import AuthContext from "./contexts/authContexts";

import { AuthProvider } from "./contexts/authContexts";

const App = () => {
	const authCtx = useContext(AuthContext);
	console.log("Is Auth : " + authCtx.isAuth);
	return (
		<AuthProvider>
			<div className="container">
				{authCtx.isAuth && <Sidebar />}
				<Routes>
					<Route path="/" element={<Auth />} />
					<Route path="/dashboard" element={<DashBoard />} />
				</Routes>
			</div>
		</AuthProvider>
	);
};

export default App;
