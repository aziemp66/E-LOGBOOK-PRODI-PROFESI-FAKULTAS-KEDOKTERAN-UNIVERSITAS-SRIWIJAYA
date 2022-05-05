import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContexts";

const RequireAuth = (props) => {
	const authCtx = useContext(AuthContext);

	const isAuthenticated =
		authCtx.userData &&
		authCtx.userData.roles === props.roles &&
		authCtx.userData.exp * 1000 > Date.now();

	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
