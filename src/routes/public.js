import express from "express";
import projectController from "../controllers/projectController.js";

const router = express.Router();

const timeLog = (req, res, next) => {
  console.log("Public Route Trigger Time: ", Date.now());
  next();
};

router.use(timeLog);

router.get("/projects", projectController.getAllProjects);

export default router;
