import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AccountAdmin.module.css";
import AccountTables from "../../../components/accounttable/AccountTables";
import { useForm } from "react-hook-form";

import jwtDecode from "jwt-decode";

const AccountAdmin = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState();

  const { watch, register, handleSubmit, setValue, getValues } = useForm();

  const requestType = watch("requestType");

  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/admin`) ||
    "http://localhost:5000/api/admin";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/user`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (
          localStorage.getItem("token") &&
          !jwtDecode(localStorage.getItem("token")).role.includes("master")
        ) {
          filteredUser = res.data.filter(
            (user) =>
              !user.role.includes("master") && user.role.includes("admin")
          );
          setUsers(filteredUser);
        } else {
          setUsers(res.data);
        }
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
      <h2 className={styles.title}>User Administration</h2>

      <form className={styles.form} id="form" onSubmit={handleSubmit(request)}>
        {requestType === "patch" && (
          <>
            <h2>Update User {getValues("username")}</h2>

            <div className={styles["form-input"]}>
              <label htmlFor="role">Role</label>
              <select id="role" {...register("role")}>
                <option value="admin">Admin</option>
                <option value="student">Mahasiswa</option>
                <option value="lecturer">Dosen</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>

            <button type="submit" className={styles["button-green"]}>
              Update
            </button>
          </>
        )}
      </form>
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
