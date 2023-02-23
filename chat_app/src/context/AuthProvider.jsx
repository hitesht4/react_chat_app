import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

let p = JSON.parse(localStorage.getItem("chat_app_user")) || null;

const AuthProvider = ({ children }) => {
  const [chatter, setChatter] = useState(p);
  const navigate = useNavigate();
  const signup = async (user) => {
    let { data } = await axios.post("http://localhost:5000/users/signup", user);
    console.log(data);
    return data;
  };

  const login = async (form) => {
    let { data } = await axios.post("http://localhost:5000/users/login", form);
    if (data.status) {
      localStorage.setItem("chat_app_user", JSON.stringify(data.user));
      setChatter({ ...data.user });
    }

    return data;
  };

  const handleLogout = () => {
    localStorage.removeItem("chat_app_user");
    setChatter({});
    navigate("/login");
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    theme: "dark",
  };

  return (
    <AuthContext.Provider
      value={{ signup, login, toastOptions, chatter, setChatter, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;