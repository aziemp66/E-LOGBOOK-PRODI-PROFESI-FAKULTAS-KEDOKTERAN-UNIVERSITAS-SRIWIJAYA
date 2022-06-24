import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/button/Button";

import axios from "axios";

import dummyProfile from "../../assets/dummy/default_profile.png";

import styles from "./Profile.module.css";

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
const years = Array.from(Array(100), (x, i) => year - i);

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/student`) ||
    "http://localhost:5000/api/student";
  const profileUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/profile-pictures`) ||
    "http://localhost:5000/profile-pictures";

  const profilePictureChangeHandler = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("profilePicture", e.target.files[0]);

    axios
      .patch(`${baseUrl}/profile/picture`, formData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.error) return console.log(res.data.error);
        console.log(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const profilePictureResetHandler = () => {
    axios
      .delete(`${baseUrl}/profile/picture`, null, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) return console.log(res.data.error);
        console.log(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitHandler = async (data) => {
    //trim data
    for (const key in data) {
      if (data[key] instanceof String) {
        data[key] = data[key].trim();
      }
    }

    let response;
    try {
      response = await axios.patch(
        `${baseUrl}/profile`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          studentNumber: data.studentNumber,
          entryPeriod: data.entryPeriod,
          academicCounselor: data.academicCounselor,
          days: data.days,
          months: data.months,
          years: data.years,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    if (!response) console.log("Something is Wrong");
    if (response.error) console.log(response.error);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/profile`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setValue("firstName", res.data.firstName);
        setValue("lastName", res.data.lastName);
        setValue("studentNumber", res.data.studentNumber);
        setValue("address", res.data.address);
        let date = res.data.dateOfBirth;
        date = date.split("T")[0].split("-");
        setValue("days", +date[2]);
        setValue("months", +date[1]);
        setValue("years", +date[0]);
        setValue("email", res.data.email);
        setValue("phone", res.data.phone);
        setValue("entryPeriod", res.data.entryPeriod);
        setValue("academicCounselor", res.data.academicCounselor);
        setProfilePicture(res.data.profilePicture);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.profileSection}>
        <div className={styles.profilePhoto}>
          <img
            src={
              profilePicture ? `${profileUrl}/${profilePicture}` : dummyProfile
            }
            alt="profile"
          />
        </div>
        <div className={styles.profileButton}>
          <div>
            <Button
              onClick={() => {
                document.getElementById("profilePicture").click();
              }}
              className="primary"
            >
              Change
            </Button>
            <Button onClick={profilePictureResetHandler} className="secondary">
              Remove
            </Button>
            <input
              type="file"
              id="profilePicture"
              onChange={profilePictureChangeHandler}
              hidden
            />
          </div>
        </div>
      </section>
      <section className={styles.formSection}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={styles.studentData}>
            <h2>Mahasiswa</h2>
            <div className={styles.names}>
              <div>
                <label htmlFor="firstName">Nama Depan</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Azie"
                  {...register("firstName", {
                    required: "Your First Name Is Required",
                    maxLength: 255,
                  })}
                />
                {errors.firstName && (
                  <p className={styles.error}>{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Nama Belakang</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Melza Pratama"
                  {...register("lastName", {
                    required: "Your Last Name Is Required",
                    maxLength: 255,
                  })}
                />
                {errors.lastName && (
                  <p className={styles.error}>{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="studentNumber">NIM</label>
              <input
                type="text"
                id="studentNumber"
                name="studentNumber"
                placeholder="09XXXXXXXXXXXX"
                {...register("studentNumber", {
                  required: "Your Student Number is Required",
                })}
              />
              {errors.studentNumber && (
                <p className={styles.error}>{errors.studentNumber.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="address">Alamat</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Desa Seriguna, Kecamatan Teluk Gelam"
                {...register("address")}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth">Tanggal Lahir</label>
              <div
                id="dateOfBirth"
                className={`${styles.dropdown} ${styles.dates}`}
              >
                <select
                  name="days"
                  id="days"
                  {...register("days", {
                    min: 1,
                    max: 31,
                    valueAsNumber: true,
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
                    min: 1,
                    max: 12,
                    valueAsNumber: true,
                  })}
                >
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="years"
                  id="years"
                  {...register("years", {
                    valueAsNumber: true,
                    min: year - 100,
                    max: year,
                  })}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="hisammula69@gmail.com"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="phone">Nomor Telepon</label>
              <input
                type="number"
                name="phone"
                id="phone"
                {...register("phone")}
              />
            </div>
            <div className={styles.dropdown}>
              <label htmlFor="entryPeriod">Periode Masuk</label>
              <select
                name="entryPeriod"
                id="entryPeriod"
                {...register("entryPeriod", {
                  required: "Entry Period is Required",
                  valueAsNumber: true,
                  min: 1962,
                  max: year,
                })}
              >
                {years.map((year) => {
                  if (year < 1962) return;
                  return (
                    <option key={year} value={year}>
                      {`Periode Masuk ${year} (Angkatan ${year - 3})`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.counselors}>
            <h2>Pembimbing Akademik</h2>
            <div>
              <label htmlFor="academicCounselor">
                Nama Pembimbing Akademik
              </label>
              <input
                type="text"
                name="academicCounselor"
                id="academicCounselor"
                {...register("academicCounselor")}
              />
            </div>
          </div>
          <Button className="primary">Save</Button>
        </form>
      </section>
    </div>
  );
};

export default Profile;
