import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";
import styles from "./styles/form.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { signup, toastOptions } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    setForm({ ...form, [inputName]: e.target.value });
  };
  const handleValidation = () => {
    const { password, confirm_password, username } = form;
    if (password !== confirm_password) {
      toast.error("Password and Confirm Password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 ", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be greater than 3 ", toastOptions);
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = handleValidation();

    if (result) {
      const { email, password, username } = form;
      const sign = await signup({ email, password, username });
      console.log(sign);
      if (!sign.status) {
        toast.error(sign.message, toastOptions);
      } else {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("chat_app_user")) {
      navigate("/");
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
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4 " controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <button type="submit" className="w-100 btn">
            Submit
          </button>
          <p>
            Already Have An Account{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
