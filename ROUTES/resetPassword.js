const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../MODELS/userDetails");

router.patch("/changepassword", (req, res) => {
  const { email, password, newPassword } = req.body;
  user
    .find({ email: email })
    .then((result) => {
      if (result.length === 0) {
        return res.status(400).json({ message: "Registered email not found" });
      } else {
        const saltRounds = 10;
        bcrypt
          .hash(newPassword, saltRounds)
          .then((hashedPwd) => {
            const updatedUser = {
              _id: result[0]._id,
              email: email,
              password: hashedPwd,
            };
            user
              .findByIdAndUpdate(result[0]._id, updatedUser)
              .then((result) =>
                res
                  .status(200)
                  .json({ message: "Password Changed", updatedUser: result })
              )
              .catch((err) =>
                res
                  .status(500)
                  .json({ message: "Server Encountered an Error", error: err })
              );
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server Encountered an Error in last catch block",
        error: err,
      });
    });
});

module.exports = router;
