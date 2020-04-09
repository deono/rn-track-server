const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // handle signup process
  const { email, password } = req.body;
  try {
    // create a new user
    const user = new User({ email, password });
    // saving the user is an async operation
    await user.save();

    // create a new JSON web token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    // handle errors
    return res.status(422).json({ message: err.message });
  }
});

// export the router
module.exports = router;
