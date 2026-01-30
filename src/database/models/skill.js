const mongoose = require("mongoose");

const Skill = mongoose.model(
  "Skill",
  new mongoose.Schema({
    name: { type: String, required: true },
  }),
);

module.exports = Skill;
