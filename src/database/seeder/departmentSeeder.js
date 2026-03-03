import { models } from "../index.js";
const { Department } = models;

const departments = [
  { name: "IT" },
  { name: "HR" },
  { name: "Finance" },
  { name: "Marketing" },
  { name: "Operations" },
];

const seed = async () => {
  await Department.deleteMany({});
  await Department.insertMany(departments);
  console.log("Department Seeding completed successfully");
};

export default seed;

