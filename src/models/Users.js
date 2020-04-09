const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// run this function before saving a user in the db
// use the function keyword to declare this function
// the value of 'this' needs to retain the context of
// the calling function
userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    // if the password has not been changed give up and carry on
    return next();
  }
  // generate the salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, err => {
      if (err) {
        return next(err);
      }
      user.password = hash;
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  // return a promise so the async await syntax can be used
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword);
  });
};

mongoose.model("User", userSchema);
