import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContexts";

const RequireAuth = ({ role }) => {
  const authCtx = useContext(AuthContext);
  let user;
  if (authCtx.userData) {
    user = authCtx.userData;
  }

  const isAuthenticated =
    user && user.role === role && user.exp * 1000 > Date.now();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
