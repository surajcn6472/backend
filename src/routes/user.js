const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("User Route Trigger Time: : ", Date.now());
  next();
};
router.use(timeLog);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);

// user project routes
router.get("/projects", userController.getProjects);
router.post("/projects", userController.createProject);
router.get("/projects/:project_id", userController.showProject);
router.put("/projects/:project_id/update", userController.updateProject);
router.delete("/projects/:project_id/delete", userController.deleteProject);

module.exports = router;
