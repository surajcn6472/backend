import express from "express";
import apiRoutes from "./api.js";
import Admin from "./admin.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to project management system." });
});

router.use("/api/v1", apiRoutes);
router.use("/admin", Admin);

export default router;
