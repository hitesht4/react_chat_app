import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatProvider";
import { AuthContext } from "../context/AuthProvider";
import { io } from "socket.io-client";
import styles from "./styles/chat.module.css";
import Intro from "./Intro";

const Users = () => {
  const { chatter } = useContext(AuthContext);
  const { socket } = useContext(ChatContext);

  useEffect(() => {
    if (chatter) {
      socket.current = io("https://chat-app-four.onrender.com");
      socket.current.emit("add-user", chatter._id);
    }
  }, [chatter]);

  return (
    <div className={styles.body_container}>
      <div className={styles.chat_container}>
        <Intro />
      </div>
    </div>
  );
};

export default Users;
