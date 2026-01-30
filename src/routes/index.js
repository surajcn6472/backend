const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const publicRouter = require("./public");
const { authenticationMiddleware, guestMiddleware } = require("../middlewares");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to project management system." });
});

router.use("/auth", guestMiddleware, authRouter);
router.use("/user", authenticationMiddleware, userRouter);
router.use("/", publicRouter);

module.exports = router;
