import React from "react";
import Button from "../../components/ui/button/Button";

import styles from "./ScientificActivities.module.css";

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

const ScientificActivities = () => {
	return (
		<div className={styles.page}>
			<div className={styles.title}>
				<h1>Kegiatan Ilmiah</h1>
			</div>
			<form action="" className={styles.form}>
				<div>
					<label htmlFor="dateOfBirth">Tanggal</label>
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
					<label htmlFor="stase">Stase</label>
					<select name="stase" id="stase">
						<option value="bedah">Bedah</option>
						<option value="anestesi">Anestesi</option>
						<option value="kesehatan anak">Kesehatan Anak</option>
					</select>
				</div>
				<div>
					<label htmlFor="activities">Jenis Kegiatan</label>
					<div className={styles.radio} id="activities">
						<div>
							<input
								type="radio"
								name="activities"
								id="Tinjauan Pustaka"
								value={"Tinjauan Pustaka"}
							/>
							<label htmlFor="Tinjauan Pustaka">
								Tinjauan Pustaka
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="activities"
								id="Journal Reading"
								value={"Journal Reading"}
							/>
							<label htmlFor="Journal Reading">
								Journal Reading
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="activities"
								id="Laporan Kampus"
								value={"Laporan Kampus"}
							/>
							<label htmlFor="Laporan Kampus">
								Laporan Kampus
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="activities"
								id="Penelitian Sederhana"
								value={"Penelitian Sederhana"}
							/>
							<label htmlFor="Penelitian Sederhana">
								Penelitian Sederhana
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="activities"
								id="Lain-lain"
								value={"Lain-lain"}
							/>
							<label htmlFor="Lain-lain">Lain-lain</label>
						</div>
					</div>
				</div>
				<Button className="primary">Save</Button>
			</form>
		</div>
	);
};

export default ScientificActivities;
