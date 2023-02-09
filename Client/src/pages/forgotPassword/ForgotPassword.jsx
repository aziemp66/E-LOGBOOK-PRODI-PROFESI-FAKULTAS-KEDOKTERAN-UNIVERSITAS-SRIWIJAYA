import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import Button from "../../components/ui/button/Button";

import { Fade } from "react-reveal";
import axios from "axios";

const ForgotPassword = () => {
  const [isMessage, setIsMessage] = useState(null);
  const [isError, setIsError] = useState(null);

  const BASE_URL =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/forgot-password`) ||
    "http://localhost:5000/api/forgot-password";

  const forgotPasswordHandler = (e) => {
    e.preventDefault();

    axios
      .post(BASE_URL, {
        email: e.target.email.value,
      })
      .then((res) => {
        setIsMessage(res.data.message);
      })
      .catch((err) => {
        setIsError(err);
      });
  };

  return (
    <div className={styles.background}>
      <section className={styles.title}>
        <h1>
          E-LOGBOOK PRODI PROFESI FAKULTAS KEDOKTERAN UNIVERSITAS SIRIWIJAYA
        </h1>
      </section>
      <Fade top>
        <form className={styles.form} onSubmit={forgotPasswordHandler}>
          <div>
            <h3>Lupa Password</h3>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
          </div>
          <div>
            <Button type="submit" className="auth">
              Reset Password
            </Button>
          </div>
          {isError && (
            <div className={styles.error}>
              <p>{isError}</p>
            </div>
          )}
          {isMessage && (
            <div className={styles.message}>
              <p>{isMessage}</p>
            </div>
          )}
        </form>
      </Fade>
    </div>
  );
};

export default ForgotPassword;
