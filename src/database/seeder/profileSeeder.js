const Profile = require("../models/profiles");
const Department = require("../models/departments");
const User = require("../models/users");

const seed = async () => {
  const department = await Department.findOne();

  if (!department) {
    throw new Error("No departments found. Seed departments first.");
  }

  const firstUser = await User.findOne();

  if (!firstUser) {
    throw new Error("No users found in database. Seed users first.");
  }

  const profiles = [
    {
      gender: "male",
      image: "default.png",
      department_id: department._id,
      user_id: firstUser._id,
      bio: "Backend developer with strong Node.js experience.",
    }
  ];

  await Profile.deleteMany({});
  await Profile.insertMany(profiles);
  console.log("Profile Seeding completed successfully");
};

module.exports = seed;
