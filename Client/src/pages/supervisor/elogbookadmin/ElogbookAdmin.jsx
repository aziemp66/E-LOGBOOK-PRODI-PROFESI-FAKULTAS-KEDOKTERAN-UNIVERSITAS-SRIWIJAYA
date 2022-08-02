import React, { useState, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import styles from "./ElogbookAdmin.module.css";

import axios from "axios";
import InfoTable from "../../../components/supervisorinfotables/InfoTables";

const ElogbookAdmin = () => {
  const [stations, setStations] = useState();
  const [diseases, setDiseases] = useState();
  const [skills, setSkills] = useState();
  const [hospitals, setHospitals] = useState();
  const [guidances, setGuidances] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { watch, register, handleSubmit, control, setValue, getValues } =
    useForm({
      defaultValues: {
        requestType: "post",
      },
    });
  const [dirtyFields, setDirtyFields] = useState({});

  const objectType = watch("objectType");
  const requestType = watch("requestType");

  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/supervisor`) ||
    "http://localhost:5000/api/supervisor";

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["object-change-input"]}>
        <label htmlFor="objectType">Pilih Kategori</label>
        <select
          id="objectType"
          onChange={(e) => {
            setDirtyFields((prev) => {
              prev.objectType = true;
              return prev;
            });
            if (e.target.value === "" || !e.target.value) return;
            setIsLoading(true);
            setValue("objectType", e.target.value);
            setValue("requestType", "post");
            setInterval(() => {
              setIsLoading(false);
            }, 1000);
          }}
        >
          {!dirtyFields.objectType && (
            <option value={""}>Pilih Kategori</option>
          )}
          <option value="station">Stase</option>
          <option value="disease">Penyakit</option>
          <option value="skill">Keterampilan</option>
          <option value="guidance">Metode Pembelajaran</option>
          <option value="hospital">Rumah Sakit</option>
        </select>
      </div>

      {objectType ? (
        !isLoading ? (
          <div>
            <InfoTable
              stations={stations}
              objectType={objectType}
              setValue={setValue}
              objectData={
                (objectType === "station" && stations) ||
                (objectType === "disease" && diseases) ||
                (objectType === "skill" && skills) ||
                (objectType === "guidance" && guidances) ||
                (objectType === "hospital" && hospitals)
              }
            />
          </div>
        ) : (
          <>
            <p className={styles.fallback}>Loading ...</p>
          </>
        )
      ) : null}
      {/* 
      TODO: Download as excel file
       */}
    </div>
  );
};

export default ElogbookAdmin;
