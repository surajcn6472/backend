import { models } from "../index.js";
import bcrypt from "bcrypt";

const { User } = models;

const seed = async () => {
  await User.deleteMany({});
  await User.insertMany([
    {
      name: "Suraj Kumar",
      email: "surajcn6472@gmail.com",
      password: await bcrypt.hash(
        "password",
        parseInt(process.env.BCRYPT_SALT_ROUNDS),
      ),
    },
  ]);
  console.log("User Seeding completed successfully");
};

export default seed;
