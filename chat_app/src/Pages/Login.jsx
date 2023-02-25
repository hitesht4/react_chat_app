import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";
import styles from "./styles/form.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, toastOptions, chatter } = useContext(AuthContext);
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    setform({ ...form, [inputName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sign = await login(form);
    if (!sign.status) {
      toast.error(sign.message, toastOptions);
    } else {
      navigate("/users");
    }
  };

  useEffect(() => {
    let check = chatter && localStorage.getItem("chat_app_user");
    if (check) {
      navigate("/users");
    }
  }, []);

  return (
    <div className={styles.Page_div}>
      <div className={styles.form}>
        <Form onSubmit={handleSubmit}>
          <div className={styles.brand}>
            <img src={Logo} alt="logo" />
            <h1>SNAPPY</h1>
          </div>
          <Form.Group className="mb-4 ">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <button type="submit" className={`${styles.btn} w-100 p-3`}>
            Log In
          </button>
          <p>
            Dont Have An Account
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Register Now
            </span>
          </p>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
