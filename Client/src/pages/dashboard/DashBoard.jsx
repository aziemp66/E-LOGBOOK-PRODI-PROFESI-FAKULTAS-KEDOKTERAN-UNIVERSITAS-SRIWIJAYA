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
import axios from "axios";

const present = 26;
const sick = 2;
const excused = 1;
const absent = 2;

const DashBoard = () => {
  const authCtx = useContext(AuthContext);
  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/student`) ||
    "http://localhost:5000/api/student";

  const [isLoading, setIsLoading] = useState(true);
  const [competences, setCompetences] = useState();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${baseUrl}/competence`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCompetences(res.data.existingCompetences);
        setInterval(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              competences &&
              competences.map((competence, index) => {
                return (
                  <Fade
                    left={index % 2 == 0}
                    right={index % 2 == 1}
                    key={index}
                  >
                    <ProgressCard
                      title={competence.diseaseName}
                      stase={competence.stationName}
                      skillCompetences={competence.skillCompetence}
                      diseasesCompetences={competence.diseaseCompetence}
                      isVerified={competence.verified}
                      className={styles.progressCard}
                    />
                  </Fade>
                );
              })
            )}
          </ul>
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
