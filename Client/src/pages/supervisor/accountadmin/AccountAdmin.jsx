import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AccountAdmin.module.css";
import AccountTables from "../../../components/supervisoraccounttable/AccountTables";
import { useForm } from "react-hook-form";

import jwtDecode from "jwt-decode";

const AccountAdmin = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState();

  const { watch, register, handleSubmit, setValue, getValues } = useForm();

  const requestType = watch("requestType");

  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/supervisor`) ||
    "http://localhost:5000/api/supervisor";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/user`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);

        setUsers(res.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const request = (data) => {
    setIsLoading(true);
    console.log(getValues("username"));
    axios[requestType](`${baseUrl}/user`, data, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return axios.get(`${baseUrl}/user`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Supervising User</h2>

      {users && !isLoading ? (
        <AccountTables setValue={setValue} accountData={users} />
      ) : (
        <>
          <p className={styles.fallback}>Loading...</p>
        </>
      )}
    </div>
  );
};

export default AccountAdmin;
