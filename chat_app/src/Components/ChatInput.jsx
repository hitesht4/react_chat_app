import React, { useContext, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import styles from "./styles/Input.module.css";

const ChatInput = () => {
  const [show, setShow] = useState(false);
  const [sms, setSms] = useState("");
  const { chatter } = useContext(AuthContext);
  const { reciever, postMessage } = useContext(ChatContext);

  const handleShow = () => {
    setShow(!show);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = sms;
    message += emojiObject.emoji;
    setSms(message);
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sms !== "") {
      let item = {
        message: sms,
        to: reciever._id,
        from: chatter._id,
      };
      postMessage(item);
      setSms("");
    }
  };

  return (
    <div className={styles.chat_Input}>
      <div className={styles.button_container}>
        <div className={styles.emoji}>
          <BsEmojiSmileFill onClick={handleShow} />
          {show && (
            <Picker
              onEmojiClick={handleEmojiClick}
              width={300}
              style={{ border: "2px solid red" }}
            />
          )}
        </div>
      </div>

      <form className={styles.input_container} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => {
            setSms(e.target.value);
          }}
          value={sms}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
