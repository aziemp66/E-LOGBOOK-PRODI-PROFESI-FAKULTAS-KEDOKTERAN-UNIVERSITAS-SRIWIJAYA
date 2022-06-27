import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AccountAdmin.module.css";
import AccountTables from "../../../components/accounttable/AccountTables";
const AccountAdmin = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState();

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
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2>All User</h2>
      {!isLoading && users && <AccountTables accountData={users} />}
    </div>
  );
};

export default AccountAdmin;
