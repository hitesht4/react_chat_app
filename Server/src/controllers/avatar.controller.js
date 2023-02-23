const express = require("express");
const router = express.Router();
const avatar = require("../models/avatar.model");

router.get("/", async (req, res) => {
  try {
    const data = await avatar.find();
    res.send(data);
  } catch (e) {
    res.send({ message: e.msg });
  }
});

module.exports = router;
