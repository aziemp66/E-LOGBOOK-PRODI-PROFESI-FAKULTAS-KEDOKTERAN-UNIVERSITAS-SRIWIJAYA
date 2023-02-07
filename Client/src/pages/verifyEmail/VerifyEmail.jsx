import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const token = searchParams.get("token");
  const BASE_URL =
    (import.meta.env &&
      `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`) ||
    "http://localhost:5000/api/auth/verify-email?token=${token}";

  useEffect(() => {
    axios
      .post(BASE_URL, {
        token,
      })
      .then((res) => {
        setIsLoading(false);
        setResponseMessage(res.data.message);
      });
  }, []);

  return (
    <div>
      <h1>Your Email Verification</h1>
      <p> {isLoading ? <p>{responseMessage}</p> : <p>Loading...</p>} </p>
    </div>
  );
};

export default VerifyEmail;
