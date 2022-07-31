import React from "react";

import styles from "./LecturerVerification.module.css";

import { useForm } from "react-hook-form";

import axios from "axios";

import CompetenceTable from "../../components/competencetables/CompetencesTable";

import { useEffect, useState } from "react";

const Competence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [competences, setCompetences] = useState();

  const { register, handleSubmit, setValue, watch } = useForm();

  //watch requestType
  const requestType = watch("requestType");

  const baseUrl =
    (import.meta.env.API_URL && `${import.meta.env.API_URL}/api/lecturer`) ||
    "http://localhost:5000/api/lecturer";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/competence`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCompetences(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitHandler = (data) => {
    setIsLoading(true);
    axios
      .post(
        `${baseUrl}/verify`,
        {
          competencesId: data.id,
          isVerified: data.isVerified,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        return axios.get(`${baseUrl}/competence`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      <form
        className={styles.form}
        id="form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {requestType === "post" && (
          <>
            <h2>Verifikasi Kompetensi Rotasi</h2>

            <input type="text" hidden {...register("id")} />

            <div className={styles["form-input"]}>
              <label htmlFor="role">Status Verifikasi</label>
              <select
                name="isVerified"
                id="isVerified"
                {...register("isVerified")}
              >
                <option value={true}>Terverifikasi</option>
                <option value={false}>Tidak Terverifikasi</option>
              </select>
            </div>

            <div className={styles["button-container"]}>
              <button className={styles["button-green"]}>Submit</button>
            </div>
          </>
        )}
      </form>
      {!isLoading && competences ? (
        <CompetenceTable objectData={competences} setValue={setValue} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Competence;
