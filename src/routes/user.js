import express from "express";
import userController from "../controllers/userController.js";
import projectController from "../controllers/projectController.js";
import {
  createProjectValidation,
  updateProfileValidation,
  updateProjectValidation,
  validationErr,
} from "../validators/index.js";
import { multerUpload } from "../lib/index.js";

const router = express.Router();

const timeLog = (req, res, next) => {
  console.log("User Route Trigger Time: : ", Date.now());
  next();
};

router.use(timeLog);

router.get("/profile", userController.getProfile);

router.put(
  "/profile",
  multerUpload.single("image"),
  updateProfileValidation,
  validationErr,
  userController.updateProfile
);

// user project routes
router.get("/projects", projectController.getProjects);

router.post(
  "/projects",
  createProjectValidation,
  validationErr,
  projectController.createProject
);

router.get("/projects/:project_id", projectController.showProject);

router.put(
  "/projects/:project_id/update",
  updateProjectValidation,
  validationErr,
  projectController.updateProject
);

router.delete(
  "/projects/:project_id/delete",
  projectController.deleteProject
);

export default router;
