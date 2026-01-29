const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const publicRouter = require("./public");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to project management system." });
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/", publicRouter);

module.exports = router;
