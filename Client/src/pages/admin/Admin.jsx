import React, { useContext } from "react";

import styles from "./Admin.module.css";

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
          <h2>Administrasi E-Logbook</h2>
          <Link to={"/admin/elogbook"}>Click Here</Link>
        </div>
        <div className={styles.card}>
          <h2>Presensi Mahasiswa</h2>
          <Link to={"/admin/students"}>Click Here</Link>
        </div>
        <div className={styles.card}>
          <h2>Administrasi Akun</h2>
          <Link to={"/admin/accounts"}>Click Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
