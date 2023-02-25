require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const connect = require("./src/db/connect");
const cors = require("cors");
const users = require("./src/controllers/user.controller");
const avatars = require("./src/controllers/avatar.controller");
const message = require("./src/controllers/message.controller");
const socket = require("socket.io");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
app.get("/", (req, res) => {
  res.send("Welcome to chat Api");
});

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/avatars", avatars);
app.use("/messages", message);

const server = app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listening to port ${port}`);
  } catch (e) {
    console.log(e);
  }
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.OnlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    OnlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = OnlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data.message);
    }
  });
});
