import React, { useContext } from "react";

import styles from "./Admin.module.css";

import AuthContext from "../../contexts/AuthContexts";

import WelcomeCard from "../../components/welcomecard/WelcomeCard";

const Admin = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <WelcomeCard
        username={authCtx.userData.username}
        message="Selamat Datang di Dashboard Admin"
      />
      <div>
        <div>
          <div>
            <h2>List Stase</h2>
          </div>
          <form>
            <h2>Tambah Stase</h2>
          </form>
        </div>
        <div>
          <div>
            <h2>List Penyakit</h2>
          </div>
          <form>
            <h2>Tambah Penyakit</h2>
          </form>
        </div>
        <div>
          <div>
            <h2>List Keterampilan</h2>
          </div>
          <form>
            <h2>Tambah Keterampilan</h2>
          </form>
        </div>
        <div>
          <div>
            <h2>List Metode Pembelajaran</h2>
          </div>
          <form>
            <h2>Tambah Metode Pembelajaran</h2>
          </form>
        </div>
        <div>
          <div>
            <h2>List Rumah Sakit</h2>
          </div>
          <form>
            <h2>Tambah Rumah Sakit</h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
