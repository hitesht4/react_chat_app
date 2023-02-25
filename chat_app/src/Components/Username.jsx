import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";

const Username = ({ Class }) => {
  const { chatter } = useContext(AuthContext);
  const { imageUrl } = useContext(ChatContext);
  return (
    <Card
      className={`d-flex flex-row align-items-center w-100 justify-contents-center p-3 ${Class}`}
    >
      <Card.Img
        src={`${imageUrl}${chatter.avatar}`}
        alt=""
        className="w-25 h-80"
      />
      <Card.Body>{chatter.username}</Card.Body>
    </Card>
  );
};

export default Username;
