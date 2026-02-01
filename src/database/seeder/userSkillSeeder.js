const { User, UserSkill, Skill } = require("../").models;

const seed = async () => {
  const user = await User.findOne();
  if (!user) throw new Error("No users found");

  const count = await Skill.countDocuments();
  const size = Math.floor(Math.random() * count) + 1;

  const skills = await Skill.aggregate([
    { $sample: { size } }
  ]);

  const userSkills = skills.map(skill => ({
    user_id: user._id,
    skill_id: skill._id,
  }));

  await UserSkill.deleteMany({ user_id: user._id });
  await UserSkill.insertMany(userSkills);

  console.log("User Skill Seeding completed successfully");
};

module.exports = seed;
