import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import { BiPowerOff } from "react-icons/bi";
import { Card } from "react-bootstrap";
import styles from "./styles/Message.module.css";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const { imageUrl } = useContext(ChatContext);
  const { handleLogout } = useContext(AuthContext);
  const { reciever } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (reciever == null) {
      navigate("/users");
    }
  }, [reciever]);
  return (
    <div className={styles.chat_header}>
      {reciever && (
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
      )}
      <button className={styles.power} onClick={handleLogout}>
        <BiPowerOff />
      </button>
    </div>
  );
};

export default ChatHeader;
