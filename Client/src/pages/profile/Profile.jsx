import React, { useRef, useEffect, useState } from "react";
import Button from "../../components/ui/button/Button";
import Select from "react-select";

import axios from "axios";

import dummyProfile from "../../assets/dummy/profile.png";

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

const daysOptions = days.map((day) => ({
  value: day,
  label: day,
}));
const monthsOptions = months.map((month, index) => ({
  value: index + 1,
  label: month,
}));
const yearsOptions = years.map((year) => ({
  value: year,
  label: year,
}));

const Profile = () => {
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phone = useRef();
  const address = useRef();
  const studentNumber = useRef();
  const entryPeriod = useRef();
  const academicCounselor = useRef();
  const daysRef = useRef();
  const monthsRef = useRef();
  const yearsRef = useRef();

  const baseUrl = "http://localhost:5000/api/student";

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${baseUrl}/profile`,
        {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          email: email.current.value,
          phone: phone.current.value,
          address: address.current.value,
          studentNumber: studentNumber.current.value,
          entryPeriod: entryPeriod.current.value,
          academicCounselor: academicCounselor.current.value,
          days: daysRef.current.value,
          months: monthsRef.current.value,
          years: yearsRef.current.value,
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

  useEffect(() => {
    axios
      .get(`${baseUrl}/profile`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        firstName.current.value = res.data.firstName;
        lastName.current.value = res.data.lastName;
        email.current.value = res.data.email;
        phone.current.value = res.data.phone;
        address.current.value = res.data.address;
        studentNumber.current.value = res.data.studentNumber;
        entryPeriod.current.value = res.data.entryPeriod;
        academicCounselor.current.value = res.data.academicCounselor;
        const dateOfBirth = res.data.dateOfBirth.split("T")[0].split("-");
        setYear(+dateOfBirth[0]);
        setMonth(+dateOfBirth[1]);
        setDay(+dateOfBirth[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    firstName,
    lastName,
    email,
    phone,
    address,
    studentNumber,
    entryPeriod,
    academicCounselor,
    daysRef,
    monthsRef,
    yearsRef,
  ]);

  return (
    <div className={styles.page}>
      <section className={styles.profileSection}>
        <div className={styles.profilePhoto}>
          <img src={dummyProfile} alt="profile" />
        </div>
        <div className={styles.profileButton}>
          <form action="" encType="multipart/form-data">
            <Button type="submit" className="primary">
              Change
            </Button>
            <Button type="reset" className="secondary">
              Remove
            </Button>
          </form>
        </div>
      </section>
      <section className={styles.formSection}>
        <form onSubmit={onSubmitHandler}>
          <div className={styles.studentData}>
            <h2>Mahasiswa</h2>
            <div className={styles.names}>
              <div>
                <label htmlFor="firstName">Nama Depan</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Azie"
                  ref={firstName}
                />
              </div>
              <div>
                <label htmlFor="lastName">Nama Belakang</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Melza Pratama"
                  ref={lastName}
                />
              </div>
            </div>
            <div>
              <label htmlFor="studentNumber">NIM</label>
              <input
                type="text"
                id="studentNumber"
                name="studentNumber"
                placeholder="09XXXXXXXXXXXX"
                ref={studentNumber}
              />
            </div>
            <div>
              <label htmlFor="address">Alamat</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Desa Seriguna, Kecamatan Teluk Gelam"
                ref={address}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth">Tanggal Lahir</label>
              <div
                id="dateOfBirth"
                className={`${styles.dropdown} ${styles.dates}`}
              >
                <Select
                  defaultValue={daysOptions[day - 1]}
                  options={daysOptions}
                  onChange={(e) => setDay(e.value)}
                />
                <Select
                  defaultValue={monthsOptions[month - 1]}
                  options={monthsOptions}
                  onChange={(e) => setMonth(e.value)}
                />
                <Select
                  defaultValue={yearsOptions.find(
                    (yearOption) => yearOption.value === year
                  )}
                  options={yearsOptions}
                  onChange={(e) => setYear(e.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="hisammula69@gmail.com"
                ref={email}
              />
            </div>
            <div>
              <label htmlFor="phone">Nomor Telepon</label>
              <input type="number" name="phone" id="phone" ref={phone} />
            </div>
            <div className={styles.dropdown}>
              <label htmlFor="entryPeriod">Periode Masuk</label>
              <select name="entryPeriod" id="entryPeriod" ref={entryPeriod}>
                <option value="2022">Periode Masuk 2022 (Angkatan 2019)</option>
                <option value="2021">Periode Masuk 2021 (Angkatan 2017)</option>
                <option value="2020">Periode Masuk 2020 (Angkatan 2016)</option>
                <option value="2019">Periode Masuk 2019 (Angkatan 2015)</option>
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
                ref={academicCounselor}
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
