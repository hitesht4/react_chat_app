import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../context/AuthProvider";
import styles from "./styles/chat.module.css";

const Chat = () => {
  const { chatter } = useContext(AuthContext);
  const navigate = useNavigate();

  const validation = () => {
    if (!chatter) {
      navigate("/login");
    }
  };

  useEffect(() => {
    validation();
  }, []);

  return (
    <div className={styles.body_container}>
      <Navbar />
      <div className={styles.chat_container}>
        <Message />
      </div>
    </div>
  );
};

export default Chat;
