import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

let p = JSON.parse(localStorage.getItem("chat_app_user")) || {};
const AuthProvider = ({ children }) => {
  const [chatter, setChatter] = useState(p);
  const signup = async (user) => {
    let { data } = await axios.post("http://localhost:5000/users/signup", user);
    console.log(data);
    return data;
  };

  const login = async (form) => {
    let { data } = await axios.post("http://localhost:5000/users/login", form);
    console.log(data);
    return data;
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    theme: "dark",
  };

  return (
    <AuthContext.Provider
      value={{ signup, login, toastOptions, chatter, setChatter }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
