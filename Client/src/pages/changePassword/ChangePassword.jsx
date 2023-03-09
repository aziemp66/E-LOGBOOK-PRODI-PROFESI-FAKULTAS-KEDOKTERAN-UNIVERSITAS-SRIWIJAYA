import axios from "axios";
import Button from "../../components/ui/button/Button";

import styles from "./ChangePassword.module.css";
import React, { useState } from "react";

const ChangePassword = () => {
  const BASE_URL =
    (import.meta.env &&
      `${import.meta.env.VITE_API_URL}/api/auth/change-password`) ||
    "http://localhost:5000/api/auth/change-password";
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(null);
  const [isError, setIsError] = useState(null);
  const changePasswordHandler = async (e) => {
    e.preventDefault();

    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (oldPassword === newPassword) {
      setIsError("Password baru tidak boleh sama dengan password lama");
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsError("Password baru tidak sama dengan konfirmasi password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        BASE_URL,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      setIsMessage(response.data.message);
    } catch (error) {
      setIsError(error.response.data.message);
    }

    setIsLoading(false);
  };
  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={changePasswordHandler}>
        <div>
          <h3>Ubah Password</h3>
        </div>
        <div>
          <label htmlFor="oldPassword">Password Lama</label>
          <input type="password" id="oldPassword" />
        </div>
        <div>
          <label htmlFor="newPassword">Password Baru</label>
          <input type="password" id="newPassword" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Konfirmasi Password Baru</label>
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
    </div>
  );
};

export default ChangePassword;
