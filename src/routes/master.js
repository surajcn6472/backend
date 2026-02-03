const express = require("express");
const router = express.Router();
const masterController = require("../controllers/masterController");

// user project routes
router.get("/skills", masterController.skills);
router.get("/departments", masterController.departments);

module.exports = router;
