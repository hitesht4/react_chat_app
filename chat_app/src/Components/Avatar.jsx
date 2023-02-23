import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import styles from "../Pages/styles/avatar.module.css";

const Avatar = ({ src, selected, setSelected, index }) => {
  const { imageUrl } = useContext(ChatContext);
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
        }}
      />
    </div>
  );
};

export default Avatar;
