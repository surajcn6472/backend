const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const publicRouter = require("./public");
const { authenticationMiddleware } = require("../middlewares");

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to project management system." });
});

router.use("/auth", authRouter);
router.use("/user", authenticationMiddleware, userRouter);
router.use("/", publicRouter);

module.exports = router;
