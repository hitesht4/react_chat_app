const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: { type: String, required: true, Unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAvatarSet: { type: Boolean, default: false },
  avatar: { type: String, default: "" },
});

const userModel = model("user", userSchema);

module.exports = userModel;
