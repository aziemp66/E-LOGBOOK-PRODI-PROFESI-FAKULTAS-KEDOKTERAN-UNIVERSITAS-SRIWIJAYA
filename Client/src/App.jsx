import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
import Sidebar from "./components/ui/sidebar/Sidebar";
import AuthContext from "./contexts/AuthContexts";

import RequireAuth from "./helpers/RequireAuth";

const App = () => {
	const authCtx = useContext(AuthContext);
	console.log("Is Auth : " + authCtx.isAuth);
	return (
		<div className="container">
			{authCtx.isAuth && <Sidebar />}
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<DashBoard />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
