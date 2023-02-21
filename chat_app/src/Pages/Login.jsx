import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login, toastOptions, chatter, setChatter } = useContext(AuthContext);
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
      localStorage.setItem("chat_app_user", JSON.stringify(sign.user));
      setChatter({ ...sign.user });
      navigate("/");
    }
  };
  useEffect(() => {
    if (chatter) {
      navigate("/");
    }
  }, []);
  return (
    <div className="Page_div">
      <div className="form">
        <Form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>SNAPPY</h1>
          </div>
          <Form.Group className="mb-4 " controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 p-3">
            Submit
          </Button>
          <p>
            Dont Have An Account
            <span
              onClick={() => {
                navigate("/register");
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
