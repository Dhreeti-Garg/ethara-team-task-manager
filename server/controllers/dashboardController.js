const Project = require("../models/Project");

// Helper: check overdue tasks
const isOverdue = (task) => {
  return (
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Completed"
  );
};

exports.getDashboardStats = async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user._id,
    });

    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;
    let inProgressTasks = 0;
    let overdueTasks = 0;

    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        totalTasks++;

        if (task.status === "Completed") completedTasks++;
        else if (task.status === "In Progress") inProgressTasks++;
        else pendingTasks++;

        if (isOverdue(task)) overdueTasks++;
      });
    });

    res.status(200).json({
      totalProjects: projects.length,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};