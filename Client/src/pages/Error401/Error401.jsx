import React from "react";
import styles from "./Error401.module.css";
import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <div className={styles.container}>
      <h1>Error 401</h1>
      <p>You're Not Authorized</p>
      <span>
        Click <Link to={"/login"}>Here</Link> To Log In
      </span>
    </div>
  );
};

export default Error401;
