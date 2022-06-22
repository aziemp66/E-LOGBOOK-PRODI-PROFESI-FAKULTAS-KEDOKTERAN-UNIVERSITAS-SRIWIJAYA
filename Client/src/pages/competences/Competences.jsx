import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/button/Button";

import axios from "axios";

import styles from "./Competences.module.css";

const days = Array.from(Array(31), (x, i) => i + 1);
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const date = new Date();
const year = date.getFullYear();
//create an array of year from date.getFullYear() to date.getFullYear() - 150
const years = Array.from(Array(150), (x, i) => year - i);

const Competences = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [existingCompetences, setExistingCompetences] = useState(null);

  const [stations, setStations] = useState(null);
  const [guidances, setGuidances] = useState(null);
  const [lecturers, setLecturers] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  const [diseases, setDiseases] = useState(null);
  const [skills, setSkills] = useState(null);

  const stationRef = useRef();

  const baseUrl = "http://localhost:5000/api/student";

  useEffect(() => {
    axios
      .get(`${baseUrl}/competence`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setExistingCompetences(res.data.existingCompetences);
        setStations(res.data.stations);
        setGuidances(res.data.guidances);
        setLecturers(res.data.lecturers);
        setHospitals(res.data.hospitals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitHandler = (data) => {
    axios
      .post(
        `${baseUrl}/competence`,
        {
          stationId: data.stationId,
          days: data.days,
          months: data.months,
          years: data.years,
          hospitalId: data.hospital,
          patientInitials: e.target.patientInitials.value,
          patientMedicalNumber: e.target.patientMedicalNumber.value,
          diseaseId: e.target.disease.value,
          diseaseCompetence: e.target["disease-competences"].value,
          skillId: e.target.skill.value,
          skillCompetence: e.target["skill-competences"].value,
          lecturerId: e.target.lecturerId.value,
          guidancesId: e.target.guidanceId.value,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stationChangeHandler = (e) => {
    if (e.target.value === "empty") return;

    existingCompetences.find((competence) => {
      if (competence.stationId === e.target.value) {
        const date = competence.createdAt.split("T")[0].split("-");
        console.log(date);
      }
    });

    axios
      .get(`${baseUrl}/disease-and-skill/${e.target.value}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(stationRef.current.value);
        setDiseases(res.data.diseases);
        setSkills(res.data.skills);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>Capaian Kompetensi</h1>
      </div>
      <form
        className={styles.form}
        action=""
        method="post"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div>
          <label htmlFor="station">Stase</label>
          <select
            ref={stationRef}
            onChange={stationChangeHandler}
            name="stationId"
            id="station"
            {...register("stationId")}
          >
            <option value={"empty"}>Silahkan Pilih Stase</option>
            {stations &&
              stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
          </select>
        </div>
        {stationRef &&
          stationRef.current &&
          stationRef.current.value !== "empty" && (
            <>
              <div>
                <label htmlFor="dateOfBirth">Tanggal</label>
                <div id="date" className={`${styles.dropdown} ${styles.dates}`}>
                  <select
                    name="days"
                    id="days"
                    {...register("days", {
                      valueAsNumber: true,
                      min: 1,
                      max: 31,
                    })}
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="months"
                    id="months"
                    {...register("months", {
                      valueAsNumber: true,
                      min: 1,
                      max: 12,
                    })}
                  >
                    {months.map((month, index) => (
                      <option key={index + 1} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="years"
                    id="years"
                    {...register("years", {
                      valueAsNumber: true,
                      min: 1962,
                      max: year,
                    })}
                  >
                    {years.map((year) => {
                      if (year < 1962) return;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="hospital">Nama Rumah Sakit/Puskesmas</label>
                <select name="hospital" id="hospital" {...register("hospital")}>
                  {hospitals &&
                    hospitals.map((hospital) => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="patientInitials">Inisial Nama Pasien</label>
                <input
                  type="text"
                  placeholder={`Tuliskan "Pasien Simulasi" jika tidak ada`}
                  id="patientInitials"
                  name="patientInitials"
                  {...register("patientInitials")}
                />
              </div>
              <div>
                <label htmlFor="patientMedicalNumber">
                  Nomor Rekam Medis Pasien
                </label>
                <input
                  type="text"
                  name="patientMedicalNumber"
                  placeholder={`Tuliskan 0 jika tidak ada`}
                  {...register("patientMedicalNumber")}
                />
              </div>
              <div>
                <label htmlFor="disease">Nama Penyakit</label>
                <select name="disease" id="disease" {...register("diseaseId")}>
                  {diseases &&
                    diseases.map((disease) => (
                      <option key={disease.id} value={disease.id}>
                        {disease.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="disease-competences">
                  Level Kompetensi Penyakit
                </label>
                <div className={styles.radio} id="disease-competences">
                  <div>
                    <input
                      type="radio"
                      name="disease-competences"
                      id="disease-1"
                      value={`1`}
                      {...register("diseaseCompetence")}
                    />
                    <label htmlFor="disease-1">Level 1</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="disease-competences"
                      id="disease-2"
                      value={`2`}
                      {...register("diseaseCompetence")}
                    />
                    <label htmlFor="disease-2">Level 2</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="disease-competences"
                      id="disease-3a"
                      value={`3A`}
                      {...register("diseaseCompetence")}
                    />
                    <label htmlFor="disease-3a">Level 3A</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="disease-competences"
                      id="disease-3b"
                      value={`3B`}
                      {...register("diseaseCompetence")}
                    />
                    <label htmlFor="disease-3b">Level 3B</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="disease-competences"
                      id="disease-4"
                      value={`4`}
                      {...register("diseaseCompetence")}
                    />
                    <label htmlFor="disease-4">Level 4</label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="skill">Nama Keterampilan</label>
                <select name="skill" id="skill" {...register("skillId")}>
                  {skills &&
                    skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="skill-competences">
                  Level Kompetensi Keterampilan
                </label>
                <div className={styles.radio} id="skill-competences">
                  <div>
                    <input
                      type="radio"
                      name="skill-competences"
                      id="skill-1"
                      value={`1`}
                      {...register("skillCompetence")}
                    />
                    <label htmlFor="skill-1">Level 1</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="skill-competences"
                      id="skill-2"
                      value={`2`}
                      {...register("skillCompetence")}
                    />
                    <label htmlFor="skill-2">Level 2</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="skill-competences"
                      id="skill-3"
                      value={`3`}
                      {...register("skillCompetence")}
                    />
                    <label htmlFor="skill-3">Level 3</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="skill-competences"
                      id="skill-4"
                      value={`4`}
                      {...register("skillCompetence")}
                    />
                    <label htmlFor="skill-4">Level 4</label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="lecturerId">Nama Dosen</label>
                <select
                  name="lecturerId"
                  id="lecturerId"
                  {...register("lecturerId")}
                >
                  {lecturers &&
                    lecturers.map((lecturer) => (
                      <option key={lecturer.userId} value={lecturer.userId}>
                        {lecturer.displayName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="guidanceId">Jenis Bimbingan</label>
                <select
                  name="guidanceId"
                  id="guidanceId"
                  {...register("guidanceId")}
                >
                  {guidances &&
                    guidances.map((guidance) => (
                      <option key={guidance.id} value={guidance.id}>
                        {guidance.name}
                      </option>
                    ))}
                </select>
              </div>
              <Button className="primary">Save</Button>
            </>
          )}
      </form>
    </div>
  );
};

export default Competences;
