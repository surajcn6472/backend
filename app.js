const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { mongoose } = require("./src/database");
const app = express();
const routes = require("./src/routes");

// middlewares setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", routes);
// end middlewares setup

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
