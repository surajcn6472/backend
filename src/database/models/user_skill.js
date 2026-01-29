const mongoose = require("mongoose");

const UserSkillSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate user-skill pairs
UserSkillSchema.index({ user_id: 1, skill_id: 1 }, { unique: true });

const UserSkill = mongoose.model("UserSkill", UserSkillSchema);

module.exports = UserSkill;
