import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SetAvator from "./Pages/SetAvator";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/avatar" element={<SetAvator />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

export default App;
