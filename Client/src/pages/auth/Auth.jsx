import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

import AuthContext from "../../contexts/AuthContexts";

const Auth = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles.background}>
      <section className={styles.title}>
        <h1>
          E-LOGBOOK PRODI PROFESI FAKULTAS KEDOKTERAN UNIVERSITAS SIRIWIJAYA
        </h1>
      </section>
      <section className={styles.card}>
        <div className={styles.welcome}>
          <h2>
            Selamat Datang di E-logbook Fakultas Kedokteran Universitas
            Sriwijaya
          </h2>
        </div>
        <ul className={styles.auth}>
          {authCtx.userData ? (
            (authCtx.userData.role.includes("student") && (
              <>
                <li>
                  <h2>Masuk ke Dashboard</h2>
                  <Link to={"/Dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <h2>Ubah Profil</h2>
                  <Link to={"/Profile"}>Profile</Link>
                </li>
              </>
            )) ||
            (authCtx.userData.role.includes("admin") && (
              <>
                <li>
                  <h2>Masuk ke Dashboard Admin</h2>
                  <Link to={"/admin"}>Admin Dashboard</Link>
                </li>
              </>
            )) ||
            (authCtx.userData.role.includes("lecturer") && (
              <>
                <li>
                  <h2>Masuk ke Dashboard Dosen</h2>
                  <Link to={"/lecturer"}>Student Administration</Link>
                </li>
              </>
            )) ||
            (authCtx.userData.role.includes("supervisor") && (
              <>
                <li>
                  <h2>Masuk ke Dashboard Supervisor</h2>
                  <Link to={"/supervisor"}>Supervisor Dashboard</Link>
                </li>
              </>
            ))
          ) : (
            <>
              <li>
                <h2>Sudah Mempunyai Akun ?</h2>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <h2>Belum Mempunyai Akun ?</h2>
                <Link to={"/register"}>Daftar</Link>
              </li>
            </>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Auth;
