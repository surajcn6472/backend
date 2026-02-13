import mongoose from "mongoose";

const Skill = mongoose.model(
  "Skill",
  new mongoose.Schema({
    name: { type: String, required: true },
  }),
);

export default Skill;
