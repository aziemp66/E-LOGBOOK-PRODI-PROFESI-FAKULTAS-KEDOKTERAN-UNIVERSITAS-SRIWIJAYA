import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
import Profile from "./pages/profile/Profile";
import Competences from "./pages/competences/Competences";
import ScientificActivities from "./pages/scientificactivites/ScientificActivities";

import Sidebar from "./components/sidebar/Sidebar";
import AuthContext from "./contexts/AuthContexts";

import RequireAuth from "./helpers/RequireAuth";

const App = () => {
	const authCtx = useContext(AuthContext);
	console.log("Is Auth : " + authCtx.isAuth);
	return (
		<div className={styles.container}>
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
				<Route
					path="/profile"
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route
					path="/competences-achievement"
					element={
						<RequireAuth>
							<Competences />
						</RequireAuth>
					}
				/>
				<Route
					path="/scientific-activities"
					element={
						<RequireAuth>
							<ScientificActivities />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
