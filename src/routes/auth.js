const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  registerValidation,
  validationErr,
  loginValidation,
} = require("../validators");
const { authenticationMiddleware } = require("../middlewares");

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Auth Route Trigger Time: ", Date.now());
  next();
};
router.use(timeLog);

router.post("/login", loginValidation, validationErr, authController.login);
router.post(
  "/register",
  registerValidation,
  validationErr,
  authController.register,
);
router.get("/me", authenticationMiddleware, authController.me);

module.exports = router;
