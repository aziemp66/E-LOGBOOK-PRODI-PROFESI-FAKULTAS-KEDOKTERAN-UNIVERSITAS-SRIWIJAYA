import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ElogbookAdmin.module.css";

import axios from "axios";

const ElogbookAdmin = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [stations, setStations] = useState(null);
  const [diseases, setDiseases] = useState(null);
  const [skills, setSkills] = useState(null);
  const [guidances, setGuidances] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  const objectType = watch("objectType");

  console.log(objectType);

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

  const ObjectRequestHandler = (restRequest, type, data) => {
    axios[restRequest](`${baseUrl}/${type}`, data, {
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

  return (
    <div className={styles.container}>
      <label htmlFor="objectType">Pilih Kategori</label>
      <select id="objectType" {...register("objectType")}>
        <option value="station">Stase</option>
        <option value="disease">Penyakit</option>
        <option value="skill">Keterampilan</option>
        <option value="guidance">Metode Pembelajaran</option>
        <option value="hospital">Rumah Sakit</option>
      </select>
      <div>
        <h2>
          Tambah, Edit atau Hapus{" "}
          {(objectType === "station" && "Stase") ||
            (objectType === "disease" && "Penyakit") ||
            (objectType === "skill" && "Keterampilan") ||
            (objectType === "guidance" && "Metode Pembelajaran") ||
            (objectType === "hospital" && "Rumah Sakit")}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(
          ObjectRequestHandler.bind(null, "post", objectType)
        )}
      ></form>
    </div>
  );
};

export default ElogbookAdmin;
