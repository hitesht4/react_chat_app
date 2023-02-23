import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import { BiPowerOff } from "react-icons/bi";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import styles from "./styles/Message.module.css";
import { Card } from "react-bootstrap";

const Message = () => {
  const { imageUrl } = useContext(ChatContext);
  const { handleLogout } = useContext(AuthContext);
  const { reciever } = useContext(ChatContext);

  return (
    <div className={styles.chat_section}>
      <div className={styles.chat_header}>
        <Card
          className={`d-flex flex-row justify-contents-center align-items-center h-100 w-25 ${styles.reciever_card}`}
        >
          <Card.Img
            src={`${imageUrl}${reciever.avatar}`}
            alt=""
            className="w-25 h-50"
          />
          <Card.Body>{reciever.username}</Card.Body>
        </Card>
        <button className={styles.power} onClick={handleLogout}>
          <BiPowerOff />
        </button>
      </div>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Message;
