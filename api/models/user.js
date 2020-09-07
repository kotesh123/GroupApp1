const mongoose = require("mongoose");

var Users = mongoose.model(
  "users",
  {
    group: { type: String },
    user: { type: String },
    color: { type: String },
  },
  "users"
);

module.exports = { Users };
