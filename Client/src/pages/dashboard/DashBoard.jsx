import React, { useEffect, useContext, useState } from "react";
import { Fade } from "react-reveal";

import styles from "./DashBoard.module.css";

import welcomeHero from "../../assets/hero/welcome-hero.svg";

import SearchBar from "../../components/searchbar/SearchBar";
import AuthContext from "../../contexts/AuthContexts";

import WelcomeCard from "../../components/welcomecard/WelcomeCard";
import PresentionCard from "../../components/presentioncard/PresentionCard";
import ProgressCard from "../../components/progresscard/ProgressCard";
import TotalProgressCard from "../../components/totalprogresscard/TotalProgressCard";

const present = 26;
const sick = 2;
const excused = 1;
const absent = 2;

const DashBoard = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.page}>
      <Fade top>
        <SearchBar />
      </Fade>
      <section className={styles.content}>
        <div>
          <Fade top>
            <WelcomeCard
              username={authCtx.userData.username}
              message="Selamat datang di E-Logbook Program Studi Profesi Fakultas
                  Kedokteran Universitas Sriwijaya"
            />
          </Fade>
          <ul className={styles.progressList}>
            <Fade left>
              <ProgressCard
                title={"Tuberkolosis"}
                stase={"Penyakit Dalam"}
                skillCompetences={"4"}
                diseasesCompetences={"3B"}
                percentage={75}
                className={styles.progressCard}
              />
            </Fade>
            <Fade right>
              <ProgressCard
                title={"Leukimia"}
                stase={"Bedah"}
                skillCompetences={"3"}
                diseasesCompetences={"3A"}
                percentage={75}
                className={styles.progressCard}
              />
            </Fade>
          </ul>
          <Fade bottom>
            <div className={styles.totalProgress}>
              <TotalProgressCard
                title={"Total Capaian Penyakit"}
                percentage={75}
              />
              <TotalProgressCard
                title={"Capaian Keterampilan Klinik"}
                percentage={40}
              />
            </div>
          </Fade>
        </div>
        <Fade right>
          <PresentionCard
            present={present}
            sick={sick}
            excused={excused}
            absent={absent}
          />
        </Fade>
      </section>
    </div>
  );
};

export default DashBoard;
