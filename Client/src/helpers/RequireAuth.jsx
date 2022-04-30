import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContexts";

const RequireAuth = (props) => {
	const authCtx = useContext(AuthContext);

	const isAuthenticated = authCtx.userData ? true : false;

	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
