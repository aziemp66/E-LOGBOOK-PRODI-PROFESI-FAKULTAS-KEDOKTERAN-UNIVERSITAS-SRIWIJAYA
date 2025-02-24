import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

import Auth from "./pages/auth/Auth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Admin from "./pages/admin/Admin";
import DashBoard from "./pages/dashboard/DashBoard";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Competences from "./pages/competences/Competences";
import ScientificActivities from "./pages/scientificactivites/ScientificActivities";
import ElogbookAdmin from "./pages/admin/elogbookadmin/ElogbookAdmin";
import AccountAdmin from "./pages/admin/accountadmin/AccountAdmin";
import StudentAdmin from "./pages/admin/studentAdmin/StudentAdmin";
import LecturerVerification from "./pages/lecturer/LecturerVerification";
import Supervisor from "./pages/supervisor/Supervisor";
import SupervisorElogbook from "./pages/supervisor/elogbookadmin/ElogbookAdmin";
import SupervisorAccount from "./pages/supervisor/accountadmin/AccountAdmin";
import SupervisorStudent from "./pages/supervisor/studentAdmin/StudentAdmin";
import SupervisorCompetence from "./pages/supervisor/competence/Competence";

import Sidebar from "./components/sidebar/Sidebar";
import AuthContext from "./contexts/AuthContexts";

import RequireAuth from "./helpers/RequireAuth";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";

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
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          element={<RequireAuth role={"student admin lecturer supervisor"} />}
        >
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
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
        <Route element={<RequireAuth role="lecturer" />}>
          <Route path="/lecturer" element={<LecturerVerification />} />
        </Route>
        <Route element={<RequireAuth role="supervisor" />}>
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/supervisor/elogbook" element={<SupervisorElogbook />} />
          <Route path="/supervisor/accounts" element={<SupervisorAccount />} />
          <Route path="/supervisor/students" element={<SupervisorStudent />} />
          <Route
            path="/supervisor/competence"
            element={<SupervisorCompetence />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
