import React from "react";
import { Row, Card } from "react-bootstrap";

import Logo from "../assets/logo.svg";

const ChatHeading = ({ Class }) => {
  return (
    <Row>
      <Card className={`d-flex flex-row align-items-center ${Class}`}>
        <Card.Img src={Logo} alt="" className="w-25" />
        <Card.Body>Snappy</Card.Body>
      </Card>
    </Row>
  );
};

export default ChatHeading;
