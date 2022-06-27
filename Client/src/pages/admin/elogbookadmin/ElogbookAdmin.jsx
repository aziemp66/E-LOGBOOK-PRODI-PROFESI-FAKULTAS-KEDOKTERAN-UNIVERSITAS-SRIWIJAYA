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

  const { watch, register, handleSubmit, control, setValue, getValues } =
    useForm({
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

  const ObjectRequestHandler = (restRequest, objectType, data) => {
    console.log(restRequest);
    console.log(objectType);
    console.log(data);
    if (objectType === "" || !objectType) return;

    const submittedData =
      (restRequest === "post" &&
      (objectType === "disease" || objectType !== "skill")
        ? { name: data.name, stationId: data.stationId }
        : { name: data.name }) ||
      (restRequest === "patch" && {
        id: data.id,
        name: data.name,
        station: data.station,
      }) ||
      (restRequest === "delete" && { id: data.id });

    console.log("here");
    axios[restRequest](`${baseUrl}/${type}`, submittedData, {
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
        <div className={styles["form-container"]}>
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
            id="form"
            className={styles.form}
          >
            <input hidden type="text" {...register("id")} />

            {(objectType === "disease" || objectType === "skill") &&
              (requestType === "post" || requestType === "patch") && (
                <>
                  <div className={styles["input-container"]}>
                    <label htmlFor="name">Nama</label>
                    <input type="text" id="name" {...register("name")} />
                  </div>
                  <div className={styles["input-container"]}>
                    <label htmlFor="stationId">Stase</label>
                    <select id="stationId" {...register("station")}>
                      {!dirtyFields.stationId && (
                        <option value={""}>Pilih Stase</option>
                      )}
                      {stations &&
                        stations.map((station) => (
                          <option key={station.id} value={station.id}>
                            {station.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}
            {requestType === "delete" ? (
              <div className={styles["form-button"]}>
                <p>Apakah Anda Yakin Ingin Menghapus {getValues("name")}</p>
                <input hidden type="text" {...register("id")} />
                <div className={styles["button-container"]}>
                  <button className={styles["button-green"]}>Ya</button>
                  <button
                    className={styles["button-red"]}
                    onClick={() => setValue("requestType", "post")}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles["button-container"]}>
                <button className={styles["button-green"]}>Submit</button>
              </div>
            )}
          </form>
        </div>
      )}
      {objectType && (
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
      )}
      {/* 
      TODO: Download as excel file
       */}
    </div>
  );
};

export default ElogbookAdmin;
