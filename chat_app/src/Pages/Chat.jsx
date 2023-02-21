import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../Components/Contacts";
import Message from "../Components/Message";
import Welcome from "../Components/Welcome";
import { AuthContext } from "../context/AuthProvider";

const Chat = () => {
  const { chatter } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const navigate = useNavigate();

  const getUsers = async (id) => {
    let r = await axios.get(`http://localhost:5000/users/${id}`);
    setContacts(r.data);
  };

  const handleChatChange = (contact) => {
    setCurrentChat(contact);
  };

  useEffect(() => {
    if (!chatter) {
      navigate("/login");
      return;
    } else {
      if (chatter.isAvatarSet) {
        getUsers(chatter._id);
      } else {
        navigate("/avatar");
      }
    }
  }, []);

  return (
    <div className="chat_container">
      <div className="chat">
        <Contacts contacts={contacts} handleChatChange={handleChatChange} />
        {currentChat ? <Message chat={currentChat} /> : <Welcome />}
      </div>
    </div>
  );
};

export default Chat;
