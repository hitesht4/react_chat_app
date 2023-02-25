import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../context/ChatProvider";
import { AuthContext } from "../context/AuthProvider";
import styles from "./styles/chat.module.css";

const ChatMessages = () => {
  const { reciever, messages, setMessages, getChatMsg, socket } =
    useContext(ChatContext);
  const { chatter } = useContext(AuthContext);
  const [arrivalMessage, setArrivalMessage] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    if (reciever) {
      getChatMsg({
        from: chatter._id,
        to: reciever._id,
      });
    }
  }, [reciever]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieved", (msg) => {
        console.log(msg);
        setArrivalMessage({ formSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chat_messages}>
      {messages.map((item, index) => (
        <div key={index} ref={scrollRef}>
          <div
            className={`${styles.message} ${
              item.fromSelf ? `${styles.sended}` : `${styles.recieved}`
            }`}
          >
            <div className={styles.content}>{item.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
