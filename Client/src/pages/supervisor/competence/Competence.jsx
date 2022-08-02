import React from "react";

import styles from "./Competence.module.css";

import { useForm } from "react-hook-form";

import axios from "axios";

import CompetenceTable from "../../../components/supervisorcompetencetables/CompetencesTable";

import { useEffect, useState } from "react";

const Competence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [competences, setCompetences] = useState();

  const { register, handleSubmit, setValue, watch } = useForm();

  //watch requestType
  const requestType = watch("requestType");

  const baseUrl =
    (import.meta.env.API_URL && `${import.meta.env.API_URL}/api/supervisor`) ||
    "http://localhost:5000/api/supervisor";

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
      {!isLoading && competences ? (
        <CompetenceTable objectData={competences} setValue={setValue} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Competence;
