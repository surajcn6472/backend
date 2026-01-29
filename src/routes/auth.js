const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Auth Route Trigger Time: ", Date.now());
  next();
};
router.use(timeLog);

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
