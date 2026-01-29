const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Public Route Trigger Time: ", Date.now());
  next();
};

router.use(timeLog);

router.get("/projects", projectController.getAllProjects);

module.exports = router;
