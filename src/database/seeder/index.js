import departmentSeeder from "./departmentSeeder.js";
import skillSeeder from "./skillSeeder.js";
import userSeeder from "./userSeeder.js";
import profileSeeder from "./profileSeeder.js";
import projectSeeder from "./projectSeeder.js";
import userSkillSeeder from "./userSkillSeeder.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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
      await userSkillSeeder();
      console.log("Seeding completed...");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error executing seeder:", err);
      process.exit(1);
    });
};

executeSeeder();
