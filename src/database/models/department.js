import mongoose from "mongoose";

const Department = mongoose.model(
  "Department",
  new mongoose.Schema({
    name: { type: String, required: true },
  }),
);

export default Department;
