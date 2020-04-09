const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  // authenticate the request
  // get the authorization token from the header
  // Express downcases any header names, so use lowercase
  const { authorization } = req.headers;
  // handle no auth header present
  if (!authorization) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  // extract the JSOn web token from the auth header
  const token = authorization.replace("Bearer ", "");
  // verify jwt
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    // handle any errors
    if (err) {
      return res
        .status(401)
        .json({ message: "You must be logged in to access this resource." });
    }

    // extract user id from the jwt payload
    const { userId } = payload;
    // lookup the user from mongodb with the extracted userId
    const user = await User.findById(userId);

    // attach the user to the request object
    req.user = user;
    next();
  });
};
