require("dotenv").config();
const mongodb = process.env.url;
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(mongodb);
};

module.exports = connect;
