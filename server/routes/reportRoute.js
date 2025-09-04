const express = require("express");
const {
  createReport,
  updateReport,
  deleteReport,
  getReport,
  getallReport,
} = require("../controller/reportCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createReport);
router.put("/:id", authMiddleware, isAdmin, updateReport);
router.delete("/:id", authMiddleware, isAdmin, deleteReport);
router.get("/", authMiddleware, getallReport);
router.get("/:id", authMiddleware, getReport);

module.exports = router;
