import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./Sidebar.module.css";
import AuthContext from "../../contexts/AuthContexts";
import unsriLogo from "../../assets/logo/unsri-logo.svg";
import closeIcon from "../../assets/icons/close.svg";

import dashBoard from "../../assets/icons/dashboard.svg";
import capaianKompetensi from "../../assets/icons/capaianKompetensi.svg";
import profile from "../../assets/icons/profile.svg";
import keteranganLevelKompetensi from "../../assets/icons/keteranganLevelKompetensi.svg";
import kegiatanIlmiah from "../../assets/icons/kegiatanIlmiah.svg";
import rekapitulasiPenilaian from "../../assets/icons/rekapitulasiPenilaian.svg";
import dokumenTerkait from "../../assets/icons/dokumenTerkait.svg";
import helpDesk from "../../assets/icons/helpDesk.svg";
import hamburgerIcon from "../../assets/icons/hamburger.svg";
import logout from "../../assets/icons/logout.svg";

const Sidebar = () => {
	const [showNav, setShowNav] = useState(false);
	const showNavHandler = () => {
		setShowNav((prevState) => !prevState);
	};
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const onLogoutHandler = () => {
		authCtx.logout();
		navigate("/");
	};
	return (
		<div>
			{showNav ? (
				<header className={styles.sidebar}>
					<div className={styles["sidebar-header"]}>
						<h3>
							<img src={unsriLogo} />
							<span>Fakultas Kedokteran</span>
						</h3>
						<img
							src={closeIcon}
							alt="close icon"
							onClick={showNavHandler}
						/>
					</div>
					<div className={styles["sidebar-body"]}>
						<ul className={styles["nav-list"]}>
							<li>
								<Link to={"/dashboard"}>
									<img src={dashBoard} alt="dashboard icon" />
									<a href="#">
										<span>Dashboard</span>
									</a>
								</Link>
							</li>
							<li>
								<Link to={"/profile"}>
									<img src={profile} alt="profile icon" />
									<a href="">Profile</a>
								</Link>
							</li>
							<li>
								<Link to={"/capaiankompetensi"}>
									<img
										src={capaianKompetensi}
										alt="capaian-kompetensi icon"
									/>
									<a href="">Capaian Kompetensi</a>
								</Link>
							</li>
							<li>
								<Link to={"/keterangankompetensi"}>
									<img
										src={keteranganLevelKompetensi}
										alt="keterangan-level-kompetensi icon"
									/>
									<a href="">Keterangan Level Kompetensi</a>
								</Link>
							</li>
							<li>
								<Link to={"/kegiatanilmiah"}>
									<img
										src={kegiatanIlmiah}
										alt="kegiatan-ilmiah icon"
									/>
									<a href="">Kegiatan Ilmiah</a>
								</Link>
							</li>
							<li>
								<Link to={"/rekapnilai"}>
									<img
										src={rekapitulasiPenilaian}
										alt="rekapitulasi-penilaian icon"
									/>
									<a href="">Rekapitulasi Penilaian</a>
								</Link>
							</li>
							<li>
								<Link to={"/dokumen"}>
									<img
										src={dokumenTerkait}
										alt="dokumen-terkait icon"
									/>
									<a href="">Dokumen Terkait</a>
								</Link>
							</li>
							<li>
								<Link to={"/help"}>
									<img src={helpDesk} alt="help-desk icon" />
									<a href="">Help Desk</a>
								</Link>
							</li>
							<li>
								<a onClick={onLogoutHandler}>
									<img src={logout} alt="logout icon" />
									<a>Logout</a>
								</a>
							</li>
						</ul>
					</div>
				</header>
			) : (
				<img
					className={styles.hamburger}
					onClick={showNavHandler}
					src={hamburgerIcon}
					alt="Hamburger"
				/>
			)}
		</div>
	);
};

export default Sidebar;
