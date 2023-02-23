import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Contacts from "../Components/Contacts";
import Message from "../Components/Message";
import Welcome from "../Components/Welcome";
import { AuthContext } from "../context/AuthProvider";
import data from "../Components/data.json";
import { ChatContext } from "../context/ChatProvider";
import ChatHeading from "../Components/ChatHeading";
import ContactCard from "../Components/ContactCard";
import styles from "./styles/chat.module.css";
import { io } from "socket.io-client";

const Chat = () => {
  const { chatter } = useContext(AuthContext);
  const { reciever, socket } = useContext(ChatContext);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const getUsers = async (id) => {
    let r = await axios.get(`http://localhost:5000/users/${id}`);
    setContacts(r.data);
  };

  useEffect(() => {
    if (!chatter) {
      navigate("/login");
      return;
    }
    if (chatter.isAvatarSet === false) {
      navigate("/avatar");
    } else {
      getUsers(chatter._id);
    }
  }, []);

  // useEffect(() => {
  //   if (chatter.isAvatarSet) {
  //   } else {
  //     navigate("/avatar");
  //   }
  //   console.log("two");
  // }, []);

  useEffect(() => {
    if (chatter) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", chatter._id);
    }
  }, [chatter]);

  return (
    <div className={styles.chat_container}>
      <Row className={styles.chat}>
        <Col
          className={`col-lg-3 col-md-4 col-sm-6 ${styles.contacts_container}`}
        >
          <ChatHeading text={"Snappy"} Class={styles.header} />
          <Contacts contacts={contacts} />
          <ContactCard
            text={"snappy"}
            image={data[0].src}
            Class={styles.User}
          />
        </Col>
        <Col
          className={`col-lg-9 col-md-8 col-sm-10 ${styles.contacts_container2}`}
        >
          {reciever ? <Message socket={socket} /> : <Welcome />}
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
