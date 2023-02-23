require("dotenv").config();
const Mongodb = process.env.Mongodb;
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(Mongodb);
};

module.exports = connect;
