const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  registeredAt: { type: Date, index: true },
});

userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
