const { User, Project } = require("../").models;

const seed = async () => {
  const firstUser = await User.findOne();

  if (!firstUser) {
    throw new Error("No users found in database. Seed users first.");
  }

  const projects = [
    {
      user_id: firstUser._id,
      name: "Website Redesign",
      startDate: new Date("2025-01-10"),
      endDate: new Date("2025-03-15"),
      rate: 5000,
      status: "in progress",
    },
    {
      user_id: firstUser._id,
      name: "Mobile App Development",
      startDate: new Date("2025-02-01"),
      endDate: null,
      rate: 8000,
      status: "pending",
    },
    {
      user_id: firstUser._id,
      name: "Database Migration",
      startDate: new Date("2024-11-05"),
      endDate: new Date("2025-01-20"),
      rate: 3000,
      status: "finished",
    },
  ];

  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log("Project Seeding completed successfully");
};

module.exports = seed;
