const departmentSeeder = require("./departmentSeeder");
const skillSeeder = require("./skillSeeder");
const userSeeder = require("./userSeeder");
const profileSeeder = require("./profileSeeder");
const projectSeeder = require("./projectSeeder");
const mongoose = require("mongoose");
require("dotenv").config();
const executeSeeder = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async (result) => {
      console.log("Seeding started...");
      await departmentSeeder();
      await skillSeeder();
      await userSeeder();
      await profileSeeder();
      await projectSeeder();
      console.log("Seeding completed...");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error executing seeder:", err);
      process.exit(1);
    });
};

executeSeeder();
