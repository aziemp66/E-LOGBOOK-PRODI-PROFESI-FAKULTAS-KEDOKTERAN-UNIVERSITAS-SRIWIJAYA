import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AuthContext = React.createContext({
  userData: null,
  userDataHandler: () => {},
  register: (email, username, password, confirmPassword) => {},
  login: (username, password) => {},
  logout: () => {},
});

const BASE_URL = "http://localhost:5000/api/auth";

export const AuthProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const register = async (email, username, password, confirmPassword) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        email,
        username,
        password,
        confirmPassword,
      });
      if (response.data.error) {
        console.log(response.data.error);
        setError(response.data.error);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const login = async (username, password) => {
    let response;
    try {
      response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      if (response.data.error) {
        console.log(response.data.error);
        setError(response.data.error);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }

    localStorage.setItem("token", response.data.accessToken);
    setUserData(jwtDecode(response.data.accessToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  const userDataHandler = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return logout();
      }
      setUserData(decoded);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        userData,
        userDataHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
