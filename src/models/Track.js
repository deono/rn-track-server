const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  // uniq timestamp - millisecs since 1 Jan 1970
  timestamp: Number,
  coords: {
    latitide: Number,
    longitide: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const trackSchema = new mongoose.Schema({
  // userId is a reference to some other object
  //stored insde MongoDB. The ref property points
  // at an instance of a 'User' model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    default: ""
  },
  locations: [pointSchema]
});

mongoose.model("Track", trackSchema);
