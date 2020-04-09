const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();
/**
 * SIGNUP route
 * METHOD: POST
 */
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

    res.status(200).json({ payload: token });
  } catch (err) {
    // handle errors
    return res.status(422).json({ message: err.message });
  }
});

/**
 * SIGNIN route
 * METHOD: POST
 */
router.post("/signin", async (req, res) => {
  // pull off email and password from request body
  const { email, password } = req.body;
  // if no email and password provided
  if (!email || !password) {
    // return an error message
    return res
      .status(422)
      .json({ message: "You must provide an email and a password" });
  }

  // get the user matching the email
  const user = await User.findOne({ email });
  // if no user was found
  if (!user) {
    // return an error messsage
    return res.status(422).json({ message: "Invalid email and/or password" });
  }

  // password comparison
  try {
    await user.comparePassword(password);
    // generate a JSON web token and sent it back
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ payload: token });
  } catch (err) {
    // something wrong with the request
    return res.status(422).json({ message: "Invalid email and/or password" });
  }
});

// export the router
module.exports = router;
