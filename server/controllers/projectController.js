const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user._id,
      members: [
        {
          user: req.user._id,
          role: "Admin",
        },
      ],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user._id,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Task
exports.addTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    project.tasks.push({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      assignedTo: req.body.assignedTo,
    });

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle Task
exports.toggleTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    const task = project.tasks.id(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only Admin OR assigned user can update (basic rule)
    const isAdmin = req.user.role === "Admin";
    const isAssigned =
      task.assignedTo &&
      task.assignedTo.toString() === req.user._id.toString();

    if (!isAdmin && !isAssigned) {
      return res.status(403).json({
        message: "Not allowed to update this task",
      });
    }

    task.completed = !task.completed;

    if (task.completed) {
      task.status = "Completed";
    } else {
      task.status = "Pending";
    }

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    project.tasks = project.tasks.filter(
      (t) => t._id.toString() !== req.params.taskId
    );

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};