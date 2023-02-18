const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../MODELS/userDetails");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  user
    .find({ email: email })
    .then((result) => {
      if (result.length === 0) {
        return res.status(400).json({ message: "Please check your email" });
      } else {
        const user_id = result[0]._id;
        const email = result[0].email;
        const number = result[0].mobile;
        const token = jwt.sign(
          { user_id, email, number },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res
          .status(201)
          .json({ message: "User Login is successful", token });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: error });p
    });
});

module.exports = router;
