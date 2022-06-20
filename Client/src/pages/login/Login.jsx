import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../../components/ui/button/Button";

import { Fade } from "react-reveal";

import AuthContext from "../../contexts/AuthContexts";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMessage, setIsMessage] = useState(null);
  const [isError, setIsError] = useState(null);

  const loginHandler = (e) => {
    e.preventDefault();
    authCtx
      .login(e.target.username.value, e.target.password.value)
      .then((response) => {
        if (response.error) {
          setIsMessage(null);
          return setIsError(response.error);
        }

        setIsMessage(response.message);
        setIsError(null);
        setTimeout(() => {
          switch (response.role) {
            case "student":
              navigate("/dashboard");
              break;
            case "admin":
              navigate("/admin");
              break;
            case "lecturer":
              navigate("/lecturer");
              break;
            case "supervisor":
              navigate("/supervisor");
              break;

            default:
              break;
          }
        }, 1000);
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
        <form className={styles.form} onSubmit={loginHandler}>
          <div>
            <h3>Log in</h3>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div>
            <p className={styles.forgotPassword}>Forgot your password?</p>
          </div>
          <div>
            <Button type="submit" className="auth">
              Log in
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
          <div>
            <p className={styles.switch}>
              Don't have an account? <Link to={"/register"}>Sign up</Link>
            </p>
          </div>
        </form>
      </Fade>
    </div>
  );
};

export default Login;
