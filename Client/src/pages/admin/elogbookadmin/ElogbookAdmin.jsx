import React, { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import styles from "./ElogbookAdmin.module.css";

import { DISEASE_COLUMNS } from "../../../components/tabels/Columns";

import axios from "axios";
import InfoTable from "../../../components/tabels/InfoTable";

const ElogbookAdmin = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      requestType: "post",
    },
  });
  const { dirtyFields } = useFormState({ control });

  const [stations, setStations] = useState(null);
  const [diseases, setDiseases] = useState(null);
  const [skills, setSkills] = useState(null);
  const [guidances, setGuidances] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  const objectType = watch("objectType");
  const requestType = watch("requestType");

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
    console.log(restRequest);
    console.log(type);
    console.log(data);
    if (objectType === "" || !objectType) return;
    console.log("here");
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
      <a href="#test">Test</a>
      <label htmlFor="objectType">Pilih Kategori</label>
      <select id="objectType" {...register("objectType")}>
        {!dirtyFields.objectType && <option value={""}>Pilih Kategori</option>}
        <option value="station">Stase</option>
        <option value="disease">Penyakit</option>
        <option value="skill">Keterampilan</option>
        <option value="guidance">Metode Pembelajaran</option>
        <option value="hospital">Rumah Sakit</option>
      </select>

      {objectType && (
        <div>
          <h2>
            {(requestType === "post" && "Tambah") ||
              (requestType === "patch" && "Edit") ||
              (requestType === "delete" && "Hapus")}{" "}
            {(objectType === "station" && "Stase") ||
              (objectType === "disease" && "Penyakit") ||
              (objectType === "skill" && "Keterampilan") ||
              (objectType === "guidance" && "Metode Pembelajaran") ||
              (objectType === "hospital" && "Rumah Sakit")}
          </h2>
          <form
            onSubmit={handleSubmit(
              ObjectRequestHandler.bind(null, requestType, objectType)
            )}
          >
            <button>submit</button>
          </form>
        </div>
      )}
      {/* 
      TODO: https://stackoverflow.com/questions/34407495/how-do-i-pass-data-upwards-in-reactjs
       */}
    </div>
  );
};

export default ElogbookAdmin;
