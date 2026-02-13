import express from "express";
import masterController from "../controllers/masterController.js";

const router = express.Router();

// user project routes
router.get("/skills", masterController.skills);
router.get("/departments", masterController.departments);

export default router;
