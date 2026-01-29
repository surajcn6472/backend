const mongoose = require("mongoose");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    rate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "finished"],
      default: "pending",
    },
  }),
);

module.exports = Project;
