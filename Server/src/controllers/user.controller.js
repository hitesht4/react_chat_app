const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const argon = require("argon2");

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const check = await user.findOne({ email: email });
    if (check) {
      return res.send({ message: "User Already Registerd", status: false });
    }
    const check2 = await user.findOne({ username: username });
    if (check2) {
      return res.send({ message: "Username Already taken", status: false });
    }
    const hash = await argon.hash(password);
    const newUser = await new user({
      email,
      username,
      password: hash,
    });
    newUser.save();
    return res.send({
      message: "User Registered Successfully",
      data: newUser,
      status: true,
    });
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

router.post("/avatar/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { image } = req.body;

    await user.findByIdAndUpdate(userId, {
      isAvatarSet: true,
      avatar: image,
    });

    return res.send({
      isSet: true,
      image: image,
      message: "Image successfully updated",
    });
  } catch (e) {
    console.log(e.message);
    return res.send({ message: e.message, isSet: false });
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
