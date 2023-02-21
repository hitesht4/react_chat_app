import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from "buffer";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Avatar from "../Components/Avatar";
import Logo from "../assets/loader.gif";

const SetAvator = () => {
  const api = "https://api.multiavatar.com/13243546";
  const navigate = useNavigate();
  const [avatars, setAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { toastOptions } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("chat_app_user")) {
      navigate("/login");
    }
  }, []);

  const setSelectedAvatar = async () => {
    if (!selected) {
      toast.error("Please Select an Avatar First", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat_app_user"));
      try {
        var { data } = await axios.post(
          `http://localhost:5000/users/avatar/${user._id}`,
          {
            image: avatars[selected],
          }
        );
      } catch (e) {
        console.log(e);
      }

      if (data.isSet) {
        user.isAvatarSet = true;
        user.avatar = data.image;
        localStorage.setItem("chat_app_user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error Setting Avatar.Please Try Again", toastOptions);
      }
    }
  };
  const getData = async () => {
    let data = [];
    for (let i = 0; i < 4; i++) {
      try {
        let r = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        var buffer = new Buffer(r.data);
        data.push(buffer.toString("base64"));
      } catch (e) {
        console.log(e.message);
      }
    }
    setAvatar(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <div className="avatar_container">
        <div>
          <img src={Logo} alt="" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="avatar_container">
          <h1>Set Your Avatar</h1>
          <div className="avatars">
            {avatars &&
              avatars.map((item, index) => {
                return (
                  <Avatar
                    key={index}
                    item={item}
                    selected={selected}
                    setSelected={setSelected}
                    index={index}
                  />
                );
              })}
          </div>
          <button className="btn" onClick={setSelectedAvatar}>
            Select Avatar Image
          </button>
        </div>
        <ToastContainer />
      </>
    );
  }
};

export default React.memo(SetAvator);
