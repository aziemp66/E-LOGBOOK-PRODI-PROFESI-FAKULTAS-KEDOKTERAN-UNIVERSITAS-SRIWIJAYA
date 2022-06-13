import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fade } from "react-reveal";

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
        <Fade left>
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
                className={styles["close-icon"]}
              />
            </div>
            <div className={styles["sidebar-body"]}>
              <ul className={styles["nav-list"]}>
                <li>
                  <Link to={"/dashboard"}>
                    <img src={dashBoard} alt="dashboard icon" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"}>
                    <img src={profile} alt="profile icon" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/competences-achievement"}>
                    <img
                      src={capaianKompetensi}
                      alt="capaian-kompetensi icon"
                    />
                    <span>Capaian Kompetensi</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/scientific-activities"}>
                    <img src={kegiatanIlmiah} alt="kegiatan-ilmiah icon" />
                    <span>Kegiatan Ilmiah</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/document"}>
                    <img src={dokumenTerkait} alt="dokumen-terkait icon" />
                    <span>Dokumen Terkait</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/help"}>
                    <img src={helpDesk} alt="help-desk icon" />
                    <span>Help Desk</span>
                  </Link>
                </li>
                <li>
                  <p onClick={onLogoutHandler}>
                    <img src={logout} alt="logout icon" />
                    <span>Logout</span>
                  </p>
                </li>
              </ul>
            </div>
          </header>
        </Fade>
      ) : (
        <Fade left>
          <img
            className={styles.hamburger}
            onClick={showNavHandler}
            src={hamburgerIcon}
            alt="Hamburger"
          />
        </Fade>
      )}
    </div>
  );
};

export default Sidebar;
