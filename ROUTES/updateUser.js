const express = require("express");
const router = express.Router();
const user = require("../MODELS/userDetails");

router.patch("/updateDetails", (req, res) => {
  const { email, mobile, fullname } = req.body;
  user
    .find({ email: email })
    .then((result) => {
      if (result.length === 0) {
        return res.status(400).json({ message: "Please check your email" });
      } else {
        const newUserDetails = {
          email: email,
          mobile: mobile,
          fullname: fullname,
        };
        user
          .findByIdAndUpdate(result[0]._id, newUserDetails)
          .then(() => {
            return res
              .status(204)
              .json({ message: "User details updated successfully" });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ message: "Server error, Please try again" });
          });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
});

module.exports = router;
