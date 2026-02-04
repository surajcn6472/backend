const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
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
});

projectSchema.virtual("user", {
  ref: "User",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});

projectSchema.set("toJSON", { virtuals: true });
projectSchema.set("toObject", { virtuals: true });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
