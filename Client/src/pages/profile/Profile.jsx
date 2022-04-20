import React from "react";
import Button from "../../components/ui/button/Button";

import dummyProfile from "../../assets/dummy/profile.png";

import styles from "./Profile.module.css";

const Profile = () => {
	return (
		<div className={styles.page}>
			<section className={styles.profileSection}>
				<div className={styles.profilePhoto}>
					<img src={dummyProfile} alt="profile" />
				</div>
				<div className={styles.profileButton}>
					<Button type="submit" className="primary">
						Change
					</Button>
					<Button type="reset" className="secondary">
						Remove
					</Button>
				</div>
			</section>
			<section className={styles.formSection}>
				<form action="" method="POST">
					<div className={styles.studentData}>
						<h2>Mahasiswa</h2>
						<div className={styles.names}>
							<div>
								<label htmlFor="firstName">Nama Depan</label>
								<input type="text" id="firstName" />
							</div>
							<div>
								<label htmlFor="lastName">Nama Belakang</label>
								<input type="text" id="lastName" />
							</div>
						</div>
						<div>
							<label htmlFor="nim">NIM</label>
							<input type="text" id="nim" />
						</div>
						<div>
							<label htmlFor="address">Alamat</label>
							<input type="text" id="address" />
						</div>
						<div>
							<label htmlFor="dateOfBirth">Tanggal Lahir</label>
							<input type="date" id="dateOfBirth" />
						</div>
						<div>
							<label htmlFor="phoneNumber">Nomor Telepon</label>
							<input type="number" id="phoneNumber" />
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input type="email" id="email" />
						</div>
					</div>
					<div className={styles.counselors}>
						<h2>Pembimbing Akademik</h2>
						<div>
							<div className={styles.names}>
								<div>
									<label htmlFor="firstName">
										Nama Depan
									</label>
									<input type="text" id="firstName" />
								</div>
								<div>
									<label htmlFor="lastName">
										Nama Belakang
									</label>
									<input type="text" id="lastName" />
								</div>
							</div>
						</div>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Profile;
