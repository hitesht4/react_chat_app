import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import Avatar from "../Components/Avatar";
import Logo from "../assets/loader.gif";
import styles from "./styles/avatar.module.css";

const SetAvator = () => {
  const navigate = useNavigate();
  const { chatter, setChatter } = useContext(AuthContext);
  const [avatars, setAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { toastOptions } = useContext(AuthContext);

  const setSelectedAvatar = async () => {
    if (!selected) {
      toast.error("Please Select an Avatar First", toastOptions);
      return;
    }
    let { data } = await axios.post(
      `http://localhost:5000/users/avatar/${chatter._id}`,
      {
        image: avatars[selected],
      }
    );

    if (data.isSet) {
      setChatter({
        ...chatter,
        isAvatarSet: true,
        avatar: data.image.src,
      });
      console.log(chatter);
      localStorage.setItem("chat_app_user", JSON.stringify(chatter));
      navigate("/");
    } else {
      toast.error("Error Setting Avatar.Please Try Again", toastOptions);
    }
  };
  const getData = async () => {
    let { data } = await axios.get(`http://localhost:5000/avatars`);
    setAvatar(data);
    setLoading(false);
  };

  useEffect(() => {
    if (chatter) {
      getData();
    } else {
      navigate("/login");
    }
  }, []);

  if (loading === true) {
    return (
      <div className={styles.avatar_container}>
        <div>
          <img src={Logo} alt="" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.avatar_container}>
          <h1>Set Your Avatar</h1>
          <div className={styles.avatars}>
            {avatars &&
              avatars.map((item, index) => {
                return (
                  <Avatar
                    key={item._id}
                    src={item.src}
                    selected={selected}
                    setSelected={setSelected}
                    index={index}
                  />
                );
              })}
          </div>
          <Button
            variant="primary"
            onClick={setSelectedAvatar}
            className={styles.buttton}
          >
            Select Avatar Image
          </Button>
        </div>
        <ToastContainer />
      </>
    );
  }
};

export default SetAvator;
