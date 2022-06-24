import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ElogbookAdmin.module.css";

import axios from "axios";

const ElogbookAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [stations, setStations] = useState(null);
  const [diseases, setDiseases] = useState(null);
  const [skills, setSkills] = useState(null);
  const [guidances, setGuidances] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  const [objectType, setObjectType] = useState(null);

  const baseUrl =
    (import.meta.env.API_URL && `${import.meta.env.API_URL}/api/admin`) ||
    "http://localhost:5000/api/admin";
  useEffect(() => {
    axios
      .get(`${baseUrl}/elogbook`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setStations(res.data.stations);
        setDiseases(res.data.diseases);
        setSkills(res.data.skills);
        setGuidances(res.data.guidances);
        setHospitals(res.data.hospitals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addObject = (type, data) => {
    axios
      .post(`${baseUrl}/elogbook/${type}`, data, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div className={styles.container}></div>;
};

export default ElogbookAdmin;
