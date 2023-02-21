import React, { useContext } from "react";
import { ChatContext } from "../context/ChatProvider";

const Message = ({ chat }) => {
  //   const { One } = useContext(ChatContext);
  //   console.log(One);
  return (
    <div className="chat_section">
      <div className="chat_header">
        <div className="user_details">
          <div className="user_image">
            <img src={`data:image/svg+xml;base64,${chat.avatar}`} alt="" />
          </div>
          <div className="user_name">
            <h3>{chat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat_messages"></div>
      <div className="chat_input"></div>
    </div>
  );
};

export default Message;
