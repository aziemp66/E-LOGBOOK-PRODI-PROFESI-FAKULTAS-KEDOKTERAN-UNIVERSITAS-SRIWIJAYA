import React from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import CompetenceTable from "../../components/competencetables/CompetencesTable";

import { useEffect, useState } from "react";

const Competence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [competences, setCompetences] = useState();

  const { register, handleSubmit, errors, setValue } = useForm();

  const baseUrl =
    (import.meta.env.API_URL && `${import.meta.env.API_URL}/api/lecturer`) ||
    "http://localhost:5000/api/lecturer";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/competence`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCompetences(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!isLoading && competences ? (
        <CompetenceTable objectData={competences} setValue={setValue} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Competence;
