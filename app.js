const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { mongoose } = require("./src/database");
const app = express();
const routes = require("./src/routes");
const path = require("path");

// handlebars setup
const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "admin",
    layoutsDir: path.join(__dirname, "src", "views", "layouts"),
    partialsDir: [
      path.join(__dirname, "src", "views", "partials"),
      path.join(__dirname, "src", "views", "components"),
    ],
    helpers: {
      uppercase: (str) => str.toUpperCase(),
      formatDate: (date) => new Date(date).toLocaleDateString(),
    },
  }),
);
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "hbs");

// middlewares setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/v1", routes);

// Connect to MongoDB and start the server
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
