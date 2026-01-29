const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    registeredAt: { type: Date, index: true },
  }),
);

module.exports = User;
