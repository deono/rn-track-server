const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");
const router = express.Router();
// all routes in this router require the user to be signed in
router.use(requireAuth);

/**
 * LIST TRACKS ROUTE
 * METHOD: GET
 */
router.get("/tracks", async (req, res) => {
  // get all the tracks related to the user
  // will be added in the tracks identifier in an array
  const tracks = await Track.find({ userId: req.user._id });

  // return the tracks array
  res.status(200).json({ payload: tracks });
});

/**
 * ADD NEW TRACK ROUTE
 * METHOD: POST
 */
router.post("/tracks", async (req, res) => {
  // assume the mobile device is going to send the data in the
  // same object shape as the tracks model
  const { name, locations } = req.body;

  // validation
  if (!name || !locations) {
    return res
      .status(422)
      .json({ message: "You must provide a name and locations" });
  }

  try {
    // create a new instance of a Track
    const track = new Track({ name, locations, userId: req.user._id });
    // save the new track to the database
    await track.save();

    // send a response
    res.status(200).json({ payload: track });
  } catch (error) {
    // if something went wrong during the save process
    // send back an error message
    res.status(422).json({ message: err.message });
  }
});

module.exports = router;
