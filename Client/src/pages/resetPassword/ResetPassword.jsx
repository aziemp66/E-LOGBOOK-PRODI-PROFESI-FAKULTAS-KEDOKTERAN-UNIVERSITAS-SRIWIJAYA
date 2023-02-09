import React, { useEffect } from "react";
import axios from "axios";
import Button from "../../components/ui/button/Button";

import { useSearchParams } from "react-router-dom";

import { useState } from "react";

const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(null);
  const [isError, setIsError] = useState(null);
  const token = searchParams.get("token");
  const BASE_URL =
    (import.meta.env &&
      `${
        import.meta.env.VITE_API_URL
      }/api/auth/reset-password?token=${token}`) ||
    "http://localhost:5000/api/auth/reset-password?token=${token}";

  resetPasswordHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setResponseMessage("Password tidak sama");
      return;
    }

    try {
      const response = await axios.post(BASE_URL, {
        password,
      });

      setIsMessage(response.data.message);
    } catch (error) {
      setIsError(error.response.data.message);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.background}>
      <section className={styles.title}>
        <h1>
          E-LOGBOOK PRODI PROFESI FAKULTAS KEDOKTERAN UNIVERSITAS SIRIWIJAYA
        </h1>
      </section>
      <Fade top>
        <form className={styles.form} onSubmit={resetPasswordHandler}>
          <div>
            <h3>Reset Password</h3>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" />
          </div>
          {!isLoading ? (
            <div>
              <Button type="submit">Reset Password</Button>
            </div>
          ) : (
            <div>Loading...</div>
          )}
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

export default ResetPassword;
