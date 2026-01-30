const { Skill } = require("../").models;


const skills = [
  { name: "JavaScript" },
  { name: "Node.js" },
  { name: "MongoDB" },
  { name: "React" },
  { name: "Python" },
];

const seed = async () => {
  await Skill.deleteMany({});
  await Skill.insertMany(skills);
  console.log("Skill Seeding completed successfully");
};

module.exports = seed;
