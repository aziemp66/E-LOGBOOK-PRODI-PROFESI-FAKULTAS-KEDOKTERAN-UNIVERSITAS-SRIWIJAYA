import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "../../../components/supervisorstudenttables/StudentTables";
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
      `${import.meta.env.VITE_API_URL}/api/supervisor`) ||
    "http://localhost:5000/api/supervisor";

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
        setPresentions(res.data.updatedPresention);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Administration</h2>

      {isLoading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <div>
          <StudentTable objectData={presentions} setValue={setValue} />
        </div>
      )}
    </div>
  );
};

export default studentAdmin;
