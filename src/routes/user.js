const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const { createProjectValidation, updateProfileValidation, updateProjectValidation, validationErr } = require("../validators");

// const { authenticationMiddleware } = require("../middlewares");
// router.use(authenticationMiddleware);

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("User Route Trigger Time: : ", Date.now());
  next();
};
router.use(timeLog);

router.get("/profile", userController.getProfile);
router.put("/profile", updateProfileValidation, validationErr, userController.updateProfile);

// user project routes
router.get("/projects", projectController.getProjects);
router.post("/projects", createProjectValidation, validationErr, projectController.createProject);
router.get("/projects/:project_id", projectController.showProject);
router.put("/projects/:project_id/update", updateProjectValidation, validationErr, projectController.updateProject);
router.delete("/projects/:project_id/delete", projectController.deleteProject);

module.exports = router;
