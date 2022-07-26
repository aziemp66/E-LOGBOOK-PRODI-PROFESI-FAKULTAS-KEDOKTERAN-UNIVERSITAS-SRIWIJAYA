import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountTables from "../../../components/accounttable/AccountTables";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";

import styles from "./StudentAdmin.module.css";

const studentAdmin = () => {
  const [isLoading, setIsLoading] = useState();
  const [presentions, setPresentions] = useState([]);

  const { watch, register, handleSubmit, setValue, getValues } = useForm();

  const requestType = watch("requestType");

  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/admin`) ||
    "http://localhost:5000/api/admin";

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${baseUrl}/presentions`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setPresentions(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const request = (data) => {
    setIsLoading(true);

    axios[requestType](`${baseUrl}/presentions`, data, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return axios.get(`${baseUrl}/presentions`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
      })
      .then((res) => {
        console.log(res);
        setPresentions(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Administration</h2>

      <form className={styles.form} id="form" onSubmit={handleSubmit(request)}>
        {requestType === "patch" && (
          <>
            <h2>Update User {getValues("username")}</h2>

            <div className={styles["form-input"]}>
              <label htmlFor="role">Role</label>
              <input type="number" />
            </div>
          </>
        )}
      </form>
      {isLoading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default studentAdmin;
