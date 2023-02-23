import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatProvider";
import { Card } from "react-bootstrap";
import styles from "./styles/contacts.module.css";

const Contacts = ({ contacts }) => {
  const { imageUrl, setReciever } = useContext(ChatContext);
  const [chat, setChat] = useState(null);

  const changeCurrentChat = (index, contact) => {
    setChat(index);
    setReciever(contact);
  };

  return (
    <div className={styles.contacts_div}>
      {contacts.map((contact, index) => {
        return (
          <Card
            key={contact._id}
            className={`${styles.contact} d-flex flex-row align-items-center ${
              index === chat ? `${styles.selected_contact}` : ""
            }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <Card.Img src={`${imageUrl}${contact.avatar}`} className="w-25" />
            <Card.Body>{contact.username}</Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Contacts;
