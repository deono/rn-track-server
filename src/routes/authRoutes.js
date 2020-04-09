const express = require("express");
const mongoose = require("mongoose");
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

    res.status(200).json({ message: "New user added" });
  } catch (err) {
    // handle errors
    return res.status(422).json({ message: err.message });
  }
});

// export the router
module.exports = router;
