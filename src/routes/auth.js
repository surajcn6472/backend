import express from "express";
import authController from "../controllers/authController.js";
import {
  registerValidation,
  validationErr,
  loginValidation,
} from "../validators/index.js";
import { authenticationMiddleware } from "../middlewares/index.js";

const router = express.Router();

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
  authController.register
);
router.get("/me", authenticationMiddleware, authController.me);

export default router;
