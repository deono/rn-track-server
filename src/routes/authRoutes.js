const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  // handle signup process
  console.log("/signup", req.body);
  res.send("you made a post request to /signup");
});

// export the router
module.exports = router;
