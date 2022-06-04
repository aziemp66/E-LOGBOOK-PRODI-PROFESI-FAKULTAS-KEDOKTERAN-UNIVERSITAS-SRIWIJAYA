import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import styles from "./App.module.css";

import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
import Profile from "./pages/profile/Profile";
import Competences from "./pages/competences/Competences";
import ScientificActivities from "./pages/scientificactivites/ScientificActivities";

import Sidebar from "./components/sidebar/Sidebar";
import AuthContext from "./contexts/AuthContexts";

import RequireAuth from "./helpers/RequireAuth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const App = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx.userData) {
      const role = authCtx.userData.role;
      switch (role) {
        case "student":
          navigate("/dashboard");
          break;

        default:
          navigate("/");
          break;
      }
      return;
    } else {
      if (localStorage.getItem("token")) {
        authCtx.userDataHandler();
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      {authCtx.userData && <Sidebar />}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth role="student" />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/competences-achievement" element={<Competences />} />
          <Route
            path="/scientific-activities"
            element={<ScientificActivities />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
