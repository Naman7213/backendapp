const express = require("express");
const { mongo, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../MODELS/userDetails");

router.post("/signup", async (req, res) => {
  //   const { email, mobile, fullname, password } = req.body;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const fullname = req.body.fullname;
  const password = req.body.password;
  try {
    const userExists = await user.findOne({ email: email });
    if (userExists) {
      return res
        .status(422)
        .json({ message: "Email already exists, try with different email" });
    } else {
      const saltRounds = 10;
      bcrypt
        .hash(password, saltRounds)
        .then((result) => {
          const newUser = new user({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            mobile: mobile,
            fullname: fullname,
            password: result,
          });
          newUser
            .save()
            .then(() => {
              return res.status(201).json({ message: "New User created" });
            })
            .catch(() => {
              return res
                .status(500)
                .json({ message: "Server error, please try again" });
            });
        })
        .catch((error) => {
          return res.status(500).json({ message: error });
        });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
