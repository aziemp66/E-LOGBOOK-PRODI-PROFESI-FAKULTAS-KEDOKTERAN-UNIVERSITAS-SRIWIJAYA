import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

const Auth = () => {
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
          <li>
            <h2>Sudah Mempunyai Akun ?</h2>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <h2>Belum Mempunyai Akun ?</h2>
            <Link to={"/register"}>Daftar</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Auth;
