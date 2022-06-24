import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

import Auth from "./pages/auth/Auth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import DashBoard from "./pages/dashboard/DashBoard";
import Profile from "./pages/profile/Profile";
import Competences from "./pages/competences/Competences";
import ScientificActivities from "./pages/scientificactivites/ScientificActivities";
import ElogbookAdmin from "./pages/admin/elogbookadmin/elogbookAdmin";
import AccountAdmin from "./pages/admin/accountadmin/accountAdmin";
import StudentAdmin from "./pages/admin/studentAdmin/studentAdmin";

import Sidebar from "./components/sidebar/Sidebar";
import AuthContext from "./contexts/AuthContexts";

import RequireAuth from "./helpers/RequireAuth";

const App = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.userDataHandler();
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
        <Route element={<RequireAuth role="admin" />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/elogbook" element={<ElogbookAdmin />} />
          <Route path="/admin/accounts" element={<AccountAdmin />} />
          <Route path="/admin/students" element={<StudentAdmin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
