import React from "react";

import styles from "./Competences.module.css";

const Competences = () => {
	return (
		<div className={styles.page}>
			<div className={styles.title}>
				<h1>Capaian Kompetensi</h1>
			</div>
			<form action="" method="post">
				<div>
					<label htmlFor="stase">Stase</label>
					<select name="stase" id="stase">
						<option value="bedah">Bedah</option>
						<option value="anestesi">Anestesi</option>
						<option value="kesehatan anak">Kesehatan Anak</option>
					</select>
				</div>
				<div>
					<label htmlFor="date">Tanggal</label>
					<input type="date" name="date" id="date" />
				</div>
				<div>
					<label htmlFor="hospital">Rumah Sakit</label>
					<select name="hospital" id="hospital">
						<option value="rsud kayuagung">RSUD Kayuagung</option>
						<option value="rsud sobirin lubuk linggau">
							RSUD sobirin lubuk linggau
						</option>
						<option value="puskesmas">Puskesmas</option>
					</select>
				</div>
				<div>
					<label htmlFor="name">Inisial Nama Pasien</label>
					<input
						type="text"
						placeholder={`Tuliskan "Pasien Simulasi" jika pasien tidak ada`}
					/>
				</div>
				<div>
					<label htmlFor="medicalRecordNumber">
						Nomor Rekam Medis Pasien
					</label>
					<input
						type="number"
						placeholder={`Tuliskan 0 jika tidak ada`}
					/>
				</div>
				<div>
					<label htmlFor="competences">
						Level Kompetensi Penyakit
					</label>
					<div>
						<input
							type="radio"
							name="competences"
							id="level1"
							value={1}
						/>
						<label htmlFor="level1">Level 1</label>
					</div>
					<div>
						<input
							type="radio"
							name="competences"
							id="level2"
							value={2}
						/>
						<label htmlFor="level2">Level 2</label>
					</div>
					<div>
						<input
							type="radio"
							name="competences"
							id="level3a"
							value={3}
						/>
						<label htmlFor="level3a">Level 3A</label>
					</div>
					<div>
						<input
							type="radio"
							name="competences"
							id="level3b"
							value={4}
						/>
						<label htmlFor="level3b">Level 3B</label>
					</div>
					<div>
						<input
							type="radio"
							name="competences"
							id="level4"
							value={5}
						/>
						<label htmlFor="level4">Level 4</label>
					</div>
				</div>
				<div>
					<label htmlFor="dosen">Nama Dosen</label>
					<select name="dosen" id="dosen">
						<option value="Dr. Budi">Dr. Budi</option>
						<option value="Dr. Agus">Dr. Agus</option>
						<option value="Dr. Yuli">Dr. Yuli</option>
					</select>
				</div>
				<div>
					<label htmlFor="guidances">Jenis Bimbingan</label>
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
							id="Dan Lain-lain"
							value={"Dan Lain-lain"}
						/>
						<label htmlFor="Dan Lain-lain">Dan Lain-lain</label>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Competences;
