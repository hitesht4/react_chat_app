import React, { useContext } from "react";
import Robot from "../assets/robot.gif";
import { AuthContext } from "../context/AuthProvider";

const Welcome = () => {
  const { chatter } = useContext(AuthContext);
  return (
    <div className="welcome_container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{chatter.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
