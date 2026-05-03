const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      dueDate,
      project,
      assignedTo,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      project,
      assignedTo,
      createdBy: req.user._id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status || task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};