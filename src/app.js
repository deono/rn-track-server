const express = require("express");
require("dotenv").config();

const app = express();

// root route
app.get("/", (req, res) => {
  res.send("Hello from the Express server");
});

// listen on port 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`>>>> RN TRACK SERVER listenting on ${PORT}`);
});
