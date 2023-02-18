require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./DB/connection");
const userSignup = require("./ROUTES/userSignup");
const userPasswordChange = require("./ROUTES/resetPassword");
const userLogin = require("./ROUTES/login");
const updateUserDetails = require("./ROUTES/updateUser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "You are requesting / route" });
});

app.use("/usersignup", userSignup);
app.use("/userpasswordchange", userPasswordChange);
app.use("/userlogin", userLogin);
app.use("/updateUserDetails", updateUserDetails);

module.exports = app;
