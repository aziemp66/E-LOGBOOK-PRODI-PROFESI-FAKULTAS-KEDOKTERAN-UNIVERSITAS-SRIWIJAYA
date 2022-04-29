import React from "react";
import Button from "../../components/ui/button/Button";

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
//create an array of year from date.getFullYear() to date.getFullYear() - 150
const years = Array.from(Array(150), (x, i) => year - i);

const Profile = () => {
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
				<form action="" method="POST">
					<div className={styles.studentData}>
						<h2>Mahasiswa</h2>
						<div className={styles.names}>
							<div>
								<label htmlFor="firstName">Nama Depan</label>
								<input
									type="text"
									id="firstName"
									placeholder="Azie"
								/>
							</div>
							<div>
								<label htmlFor="lastName">Nama Belakang</label>
								<input
									type="text"
									id="lastName"
									placeholder="Melza Pratama"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="nim">NIM</label>
							<input
								type="text"
								id="nim"
								placeholder="09XXXXXXXXXXXX"
							/>
						</div>
						<div>
							<label htmlFor="address">Alamat</label>
							<input
								type="text"
								id="address"
								placeholder="Desa Seriguna, Kecamatan Teluk Gelam"
							/>
						</div>
						<div>
							<label htmlFor="dateOfBirth">Tanggal Lahir</label>
							<div
								id="dateOfBirth"
								className={`${styles.dropdown} ${styles.dates}`}
							>
								<select name="days" id="days">
									{days.map((day) => (
										<option key={day} value={day}>
											{day}
										</option>
									))}
								</select>
								<select name="months" id="months">
									{months.map((month) => (
										<option key={month} value={month}>
											{month}
										</option>
									))}
								</select>
								<select name="years" id="years">
									{years.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
							</div>
						</div>
						<div>
							<label htmlFor="phoneNumber">Nomor Telepon</label>
							<input type="number" id="phoneNumber" />
						</div>
						<div className={styles.dropdown}>
							<label htmlFor="period">Periode Masuk</label>
							<select name="period" id="period">
								<option value="20222">
									Periode Masuk 2022 (Angkatan 2019)
								</option>
								<option value="2021">
									Periode Masuk 2021 (Angkatan 2018)
								</option>
								<option value="2020">
									Periode Masuk 2020 (Angkatan 2017)
								</option>
								<option value="2019">
									Periode Masuk 2019 (Angkatan 2016)
								</option>
							</select>
						</div>
					</div>
					<div className={styles.counselors}>
						<h2>Pembimbing Akademik</h2>
						<div>
							<label htmlFor="counselor">Nama</label>
							<input
								type="text"
								name="counselor"
								id="counselor"
							/>
						</div>
					</div>
					<div>
						<h2>Konfirmasi Perubahan</h2>
						<div>
							<label htmlFor="password">Password</label>
							<input type="password" id="password" />
						</div>
					</div>
					<Button className="primary">Save</Button>
				</form>
			</section>
		</div>
	);
};

export default Profile;
