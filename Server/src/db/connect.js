require("dotenv").config();
const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(url);
};

module.exports = connect;
