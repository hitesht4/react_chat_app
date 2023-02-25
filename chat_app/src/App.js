import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
