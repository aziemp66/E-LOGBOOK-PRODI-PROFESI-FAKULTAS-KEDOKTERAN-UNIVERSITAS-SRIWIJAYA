import React from "react";

import axios from "axios";

import { useEffect, useState } from "react";

const Competence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [competences, setCompetences] = useState();

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

  return <div>Presention</div>;
};

export default Competence;
