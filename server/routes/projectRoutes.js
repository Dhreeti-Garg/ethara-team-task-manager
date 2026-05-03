const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  addTask,
  toggleTask,
  deleteTask,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

// ---------------- PROJECTS ----------------

// Only Admin can create project
router.post("/", protect, authorizeRoles("Admin"), createProject);

// Both Admin + Member can view
router.get("/", protect, getProjects);

// Both can view single project
router.get("/:id", protect, getProjectById);

// Only Admin can delete project
router.delete("/:id", protect, authorizeRoles("Admin"), deleteProject);

// ---------------- TASKS ----------------

// Only Admin can add task
router.post(
  "/:id/tasks",
  protect,
  authorizeRoles("Admin"),
  addTask
);

// Admin + assigned user can update task (basic rule for now)
router.put(
  "/:id/tasks/:taskId",
  protect,
  toggleTask
);

// Only Admin can delete task
router.delete(
  "/:id/tasks/:taskId",
  protect,
  authorizeRoles("Admin"),
  deleteTask
);

module.exports = router;