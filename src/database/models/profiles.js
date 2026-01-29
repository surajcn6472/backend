const mongoose = require("mongoose");

const Profile = mongoose.model(
  "Profile",
  new mongoose.Schema({
    gender: String,
    image: { type: String, default: "default.png" },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    bio: String,
  }),
);

module.exports = Profile;
