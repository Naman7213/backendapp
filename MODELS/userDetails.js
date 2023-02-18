const mongoose = require("mongoose");
const { use } = require("../app");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: mongoose.Schema.Types.String,
  mobile: mongoose.Schema.Types.Number,
  fullname: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
});

const user = mongoose.model("users", userSchema);
module.exports = user;
