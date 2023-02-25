require("dotenv").config();
const url = process.env.url;
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(url);
};

module.exports = connect;
