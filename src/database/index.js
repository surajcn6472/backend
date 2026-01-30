const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.models = {
  Department: require("./models/department"),
  Skill: require("./models/skill"),
  User: require("./models/user"),
  Profile: require("./models/profile"),
  Project: require("./models/project"),
  UserSkill: require("./models/user_skill"),
};

module.exports = db;
