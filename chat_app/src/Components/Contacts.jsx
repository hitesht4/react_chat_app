import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import { BsFillChatFill } from "react-icons/bs";
import { AuthContext } from "../context/AuthProvider";

const Contacts = ({ contacts, handleChatChange }) => {
  const { chatter } = useContext(AuthContext);
  const [chat, setChat] = useState(null);

  const changeCurrentChat = (index, contact) => {
    setChat(index);
    handleChatChange(contact);
  };

  return (
    <div className="contacts_container">
      <div className="contacts_brand">
        <img src={Logo} alt="" />
        <h3>snappy</h3>
      </div>
      <div className="contacts_div">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`contact ${index === chat ? "selected_contact" : ""}`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="contact_avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatar}`}
                  alt=""
                />
              </div>
              <div className="contact_username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="current_user">
        <div>
          <img
            src={`data:image/svg+xml;base64,${chatter.avatar}`}
            alt="avatar"
          />
        </div>
        <div>
          <h2>{chatter.username}</h2>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
