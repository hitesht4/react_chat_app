import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import styles from "./styles/avatar.module.css";

const Avatar = ({ src, index, setLgShow }) => {
  const { imageUrl } = useContext(ChatContext);
  const { selected, setSelected, setForm, form } = useContext(AuthContext);

  return (
    <div
      className={`${styles.avatardiv} ${
        selected === index ? `${styles.selected}` : ""
      }`}
    >
      <img
        src={`${imageUrl}${src}`}
        alt="Avatar"
        onClick={() => {
          setSelected(index);
          setForm({ ...form, avatar: src });
          setLgShow(false);
        }}
      />
    </div>
  );
};

export default Avatar;
