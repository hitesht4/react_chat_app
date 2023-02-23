import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { ChatContext } from "../context/ChatProvider";

const ContactCard = ({ image, Class, text }) => {
  const { imageUrl } = useContext(ChatContext);
  return (
    <Card
      className={`d-flex flex-row justify-contents-around align-items-center ${Class}`}
    >
      <Card.Img src={`${imageUrl}${image}`} className="w-25" />
      <Card.Body>{text}</Card.Body>
    </Card>
  );
};

export default ContactCard;
