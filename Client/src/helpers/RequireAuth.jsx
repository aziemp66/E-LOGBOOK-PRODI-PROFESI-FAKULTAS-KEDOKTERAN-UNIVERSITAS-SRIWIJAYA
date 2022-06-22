import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContexts";
import Error401 from "../pages/Error401/Error401";

const RequireAuth = ({ role }) => {
  const authCtx = useContext(AuthContext);
  let user;
  if (authCtx.userData) {
    user = authCtx.userData;
  }

  const isAuthenticated =
    user && user.role === role && user.exp * 1000 > Date.now();

  return isAuthenticated ? <Outlet /> : <Error401 />;
};

export default RequireAuth;
