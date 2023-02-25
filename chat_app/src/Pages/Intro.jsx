import React, { useContext, useEffect, useState } from "react";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import Username from "../Components/Username";
import styles from "./styles/Intro.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const Intro = () => {
  const [contacts, setContacts] = useState([]);
  const { chatter } = useContext(AuthContext);
  const navigate = useNavigate();
  const getUsers = async (id) => {
    let r = await axios.get(`https://chat-app-four.onrender.com/users/${id}`);
    setContacts(r.data);
  };
  useEffect(() => {
    if (!chatter) {
      navigate("/login");
    } else {
      getUsers(chatter._id);
    }
  }, []);
  return (
    <div className={styles.Wlx_container}>
      <div className={styles.Intro}>
        <Username Class={styles.header} />
        <Contacts contacts={contacts} />
      </div>
      <div className={styles.wlc}>
        <Welcome />
      </div>
    </div>
  );
};

export default Intro;
