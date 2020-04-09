const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");
const router = express.Router();
// all routes in this router require the user to be signed in
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  // get all the tracks related to the user
  // will be added in the tracks identifier in an array
  const tracks = await Track.find({ userId: req.user._id });

  // return the tracks array
  res.status(200).json({ payload: tracks });
});

module.exports = router;
