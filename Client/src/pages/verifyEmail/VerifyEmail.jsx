import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import style from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const token = searchParams.get("token");
  const BASE_URL =
    (import.meta.env &&
      `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`) ||
    "http://localhost:5000/api/auth/verify-email?token=${token}";

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(BASE_URL, {
        token,
      })
      .then((res) => {
        setResponseMessage(res.data.message);
      })
      .catch((err) => {
        setResponseMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={style.page}>
      <h1>Elogbook Fakultas Kedokteran</h1>
      <div className={style.container}>
        <h2>Your Email Verification</h2>
        <p> {isLoading ? <p>{responseMessage}</p> : <p>Loading...</p>} </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
