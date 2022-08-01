import React, { useContext } from "react";

import styles from "./Supervisor.module.css";

import AuthContext from "../../contexts/AuthContexts";

import WelcomeCard from "../../components/welcomecard/WelcomeCard";
import { Link } from "react-router-dom";

const Admin = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeCard}>
        <WelcomeCard
          username={authCtx.userData.username}
          message="Selamat Datang di Dashboard Admin"
        />
      </div>
      <div className={styles["card-grid"]}>
        <div className={styles.card}>
          <h2>Supervisi E-Logbook</h2>
          <Link to={"/supervisor/elogbook"}>Click Here</Link>
        </div>
        <div className={styles.card}>
          <h2>Presensi Mahasiswa</h2>
          <Link to={"/supervisor/students"}>Click Here</Link>
        </div>
        <div className={styles.card}>
          <h2>Supervisi Akun</h2>
          <Link to={"/supervisor/accounts"}>Click Here</Link>
        </div>
        <div>
          <h2>Supervisi Kompetensi</h2>
          <Link to={"/supervisor/competence"}>Click Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
