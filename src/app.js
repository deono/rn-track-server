require("./models/Users");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

// create the express object instance
const app = express();

// middleware
app.use(bodyParser.json());
app.use(authRoutes);

// connect to the database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log(">>>> MONGO DB Connected");
});
mongoose.connection.on("error", err => {
  console.error("Error connecting to MongoDB", err);
});

// root route
app.get("/", requireAuth, (req, res) => {
  res.json({ message: `Your email is ${req.user.email}` });
});

// listen on port 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`>>>> RN TRACK SERVER listenting on ${PORT}`);
});
