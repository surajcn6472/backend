const { User, Project } = require("../").models;

const seed = async () => {
  const firstUser = await User.findOne();

  if (!firstUser) {
    throw new Error("No users found in database. Seed users first.");
  }

  const statuses = ["pending", "in progress", "finished"];

  const projects = Array.from({ length: 100 }, (_, i) => ({
    user_id: firstUser._id,
    name: `Project ${i + 1}`,
    startDate: new Date(2025, 0, (i % 28) + 1), // Jan dates
    endDate: i % 3 === 0 ? null : new Date(2025, 2, (i % 28) + 1),
    rate: 1000 + (i % 10) * 500,
    status: statuses[i % statuses.length],
  }));

  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log("Project Seeding completed successfully");
};

module.exports = seed;
