const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const argon = require("argon2");

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, avatar } = req.body;
    const check = await user.findOne({ email: email });
    if (check) {
      return res.send({ message: "User Already Registerd", status: false });
    }
    const check2 = await user.findOne({ username: username });
    if (check2) {
      return res.send({ message: "Username Already taken", status: false });
    }
    if (avatar !== "") {
      const hash = await argon.hash(password);
      const newUser = await new user({
        email,
        username,
        password: hash,
        avatar,
      });
      newUser.save();
      return res.send({
        message: "User Registered Successfully",
        data: newUser,
        status: true,
      });
    } else {
      return res.send({ message: "Avatar", status: false });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: e.message, status: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await user.findOne({ email });
    if (!person) {
      return res.send({
        message: "User not found, please register first",
        status: false,
      });
    }
    let result = await argon.verify(person.password, password);

    if (result) {
      return res.send({
        message: "Logged In Successfully",
        user: person,
        status: true,
      });
    }

    res.send({ message: "please enter correct details" });
  } catch (e) {
    console.log(e);
    res.send({
      message: "Something Went wrong ,Please Try Again later",
      status: false,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await user
      .find({ _id: { $ne: req.params.id } })
      .select(["email", "username", "avatar", "_id"]);
    return res.send(users);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let users = await user.find();
    return res.send(users);
  } catch (e) {
    res.send(e.message);
  }
});
module.exports = router;
