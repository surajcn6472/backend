import express from "express";
import authRouter from "./auth.js";
import masterRouter from "./master.js";
import userRouter from "./user.js";
import publicRouter from "./public.js";
import { authenticationMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.use("/", publicRouter);
router.use("/", masterRouter);
router.use("/auth", authRouter);
router.use("/user", authenticationMiddleware, userRouter);

export default router;
