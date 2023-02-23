import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../context/ChatProvider";
import { AuthContext } from "../context/AuthProvider";
import "./styles/chat.css";

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
    <div className="chat-messages">
      {messages.map((item, index) => (
        <div key={index} ref={scrollRef}>
          <div className={`message ${item.fromSelf ? "sended" : "recieved"}`}>
            <div className="content ">{item.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
