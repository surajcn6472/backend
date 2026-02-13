import mongoose from "mongoose";

import Department from "./models/department.js";
import Skill from "./models/skill.js";
import User from "./models/user.js";
import Profile from "./models/profile.js";
import Project from "./models/project.js";
import UserSkill from "./models/user_skill.js";
mongoose.Promise = global.Promise;

// Named export
export { mongoose };

export const models = {
  Department,
  Skill,
  User,
  Profile,
  Project,
  UserSkill,
};
