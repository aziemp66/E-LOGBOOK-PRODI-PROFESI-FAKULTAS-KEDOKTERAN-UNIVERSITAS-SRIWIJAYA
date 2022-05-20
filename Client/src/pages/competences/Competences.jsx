import React from "react";
import Button from "../../components/ui/button/Button";

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
	return (
		<div className={styles.page}>
			<div className={styles.title}>
				<h1>Capaian Kompetensi</h1>
			</div>
			<form className={styles.form} action="" method="post">
				<div>
					<label htmlFor="stase">Stase</label>
					<select name="stase" id="station">
						<option value="bedah">Bedah</option>
						<option value="anestesi">Anestesi</option>
						<option value="kesehatan anak">Kesehatan Anak</option>
					</select>
				</div>
				<div>
					<label htmlFor="dateOfBirth">Tanggal</label>
					<div
						id="date"
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
					<label htmlFor="hospital">Nama Rumah Sakit/Puskesmas</label>
					<select name="hospital" id="hospital">
						<option value="rsud kayuagung">RSUD Kayuagung</option>
						<option value="rsud sobirin lubuk linggau">
							RSUD sobirin lubuk linggau
						</option>
						<option value="puskesmas">Puskesmas</option>
					</select>
				</div>
				<div>
					<label htmlFor="patientInitials">Inisial Nama Pasien</label>
					<input
						type="text"
						placeholder={`Tuliskan "Pasien Simulasi" jika tidak ada`}
						id="patientInitials"
						name="patientInitials"
					/>
				</div>
				<div>
					<label htmlFor="medicalRecordNumber">
						Nomor Rekam Medis Pasien
					</label>
					<input
						type="text"
						placeholder={`Tuliskan 0 jika tidak ada`}
					/>
				</div>
				<div>
					<label htmlFor="diseases">Nama Penyakit</label>
					<select name="diseases" id="diseases">
						<option value="Leukimia">Leukimia</option>
						<option value="Osteoporosis">Osteoporosis</option>
						<option value="Pnuemonia">Pneumonia</option>
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
							/>
							<label htmlFor="disease-1">Level 1</label>
						</div>
						<div>
							<input
								type="radio"
								name="disease-competences"
								id="disease-2"
								value={`2`}
							/>
							<label htmlFor="disease-2">Level 2</label>
						</div>
						<div>
							<input
								type="radio"
								name="disease-competences"
								id="disease-3a"
								value={`3A`}
							/>
							<label htmlFor="disease-3a">Level 3A</label>
						</div>
						<div>
							<input
								type="radio"
								name="disease-competences"
								id="disease-3b"
								value={`3B`}
							/>
							<label htmlFor="disease-3b">Level 3B</label>
						</div>
						<div>
							<input
								type="radio"
								name="disease-competences"
								id="disease-4"
								value={`4`}
							/>
							<label htmlFor="disease-4">Level 4</label>
						</div>
					</div>
				</div>
				<div>
					<label htmlFor="skill">Nama Keterampilan</label>
					<select name="skill" id="skill">
						<option value="Universal Precaution">
							Universal Precaution
						</option>
						<option value="Permintaan & interpretasi pemeriksaan X-ray: foto polos">
							Permintaan & interpretasi pemeriksaan X-ray: foto
							polos
						</option>
						<option value="Ultrasound FAST abdomen">
							Ultrasound FAST abdomen
						</option>
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
							/>
							<label htmlFor="skill-1">Level 1</label>
						</div>
						<div>
							<input
								type="radio"
								name="skill-competences"
								id="skill-2"
								value={`2`}
							/>
							<label htmlFor="skill-2">Level 2</label>
						</div>
						<div>
							<input
								type="radio"
								name="skill-competences"
								id="skill-3"
								value={`3`}
							/>
							<label htmlFor="skill-3">Level 3</label>
						</div>
						<div>
							<input
								type="radio"
								name="skill-competences"
								id="skill-4"
								value={`4`}
							/>
							<label htmlFor="skill-4">Level 4</label>
						</div>
					</div>
				</div>
				<div>
					<label htmlFor="lecturer">Nama Dosen</label>
					<select name="lecturer" id="lecturer">
						<option value="dr. Budi">dr. Budi</option>
						<option value="dr. Agus">dr. Agus</option>
						<option value="dr. Yuli">dr. Yuli</option>
					</select>
				</div>
				<div>
					<label htmlFor="guidances">Jenis Bimbingan</label>
					<div className={styles.radio} id="guidances">
						<div>
							<input
								type="radio"
								name="guidances"
								id="Bedside Teaching"
								value={"Bedside Teaching"}
							/>
							<label htmlFor="Bedside Teaching">
								Bedside Teaching
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="guidances"
								id="Mini - CEX"
								value={"Mini - CEX"}
							/>
							<label htmlFor="Mini - CEX">Mini - CEX</label>
						</div>
						<div>
							<input
								type="radio"
								name="guidances"
								id="Procedural Skill"
								value={"Procedural Skill"}
							/>
							<label htmlFor="Procedural Skill">
								Procedural Skill
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="guidances"
								id="Case Based Discussion"
								value={"Case Based Discussion"}
							/>
							<label htmlFor="Case Based Discussion">
								Case Based Discussion
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="guidances"
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

export default Competences;
