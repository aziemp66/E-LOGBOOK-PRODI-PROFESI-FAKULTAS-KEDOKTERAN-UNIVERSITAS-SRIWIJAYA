import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContexts";

import styles from "./Register.module.css";
import Button from "../../components/ui/button/Button";

import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

const Register = () => {
  const authCtx = useContext(AuthContext);
  const [isError, setIsError] = useState(null);
  const [isMessage, setIsMessage] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const response = authCtx.register(
      e.target.email.value,
      e.target.username.value,
      e.target.password.value,
      e.target.confirmPassword.value
    );
    if (response.error) return setIsError(response.error);

    setIsMessage(response.message);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className={styles.background}>
      <section className={styles.title}>
        <h1>
          E-LOGBOOK PRODI PROFESI FAKULTAS KEDOKTERAN UNIVERSITAS SIRIWIJAYA
        </h1>
      </section>
      <Fade bottom>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div>
            <h3>Sign Up</h3>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
          <div>
            <Button type="submit" className="auth">
              Sign Up
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
          <div className={styles.switch}>
            <p>
              Already have an account? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
        </form>
      </Fade>
    </div>
  );
};

export default React.memo(Register);
