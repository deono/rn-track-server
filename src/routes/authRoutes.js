const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // handle signup process
  const { email, password } = req.body;
  // create a new user
  const user = new User({ email, password });
  // saving the user is an async operation
  await user.save();

  res.send("you made a post request to /signup");
});

// export the router
module.exports = router;
