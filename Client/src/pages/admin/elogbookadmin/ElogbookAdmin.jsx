import React, { useState, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import styles from "./ElogbookAdmin.module.css";

import axios from "axios";
import InfoTable from "../../../components/tabels/InfoTable";

const ElogbookAdmin = () => {
  const [stations, setStations] = useState();
  const [diseases, setDiseases] = useState();
  const [skills, setSkills] = useState();
  const [hospitals, setHospitals] = useState();
  const [guidances, setGuidances] = useState();

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

  const objectType = watch("objectType");
  const requestType = watch("requestType");

  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/admin`) ||
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
        setHospitals(res.data.hospitals);
        setGuidances(res.data.guidances);
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
            setHospitals(res.data.hospitals);
            setGuidances(res.data.guidances);
          });
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
      {objectType && (
        <div>
          <form></form>
          <InfoTable
            stations={stations}
            objectType={objectType}
            objectData={
              (objectType === "station" && stations) ||
              (objectType === "disease" && diseases) ||
              (objectType === "skill" && skills) ||
              (objectType === "guidance" && guidances) ||
              (objectType === "hospital" && hospitals)
            }
          />
        </div>
      )}
      {/* 
      TODO: https://stackoverflow.com/questions/34407495/how-do-i-pass-data-upwards-in-reactjs
       */}
    </div>
  );
};

export default ElogbookAdmin;
