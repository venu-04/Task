const Task = require('../models/Task');
const User = require('../models/User');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, collaborators, dependencies } = req.body;
    const newTask = new Task({ title, description, priority, dueDate, collaborators, dependencies });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks (with filtering and sorting)
exports.getTasks = async (req, res) => {
  try {
    const { priority, dueDate, status, assignedUser } = req.query;
    let query = {};

    if (priority) query.priority = priority;
    if (status) query.status = status;
    if (assignedUser) query.collaborators = assignedUser;

    if (dueDate === 'upcoming') {
      query.dueDate = { $gte: new Date() };
    } else if (dueDate === 'overdue') {
      query.dueDate = { $lt: new Date() };
    }

    const tasks = await Task.find(query).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Mark task as complete
exports.completeTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    
    if (task.dependencies && task.dependencies.length > 0) {
      const incompleteDependencies = await Task.find({ _id: { $in: task.dependencies }, status: 'incomplete' });
      if (incompleteDependencies.length > 0) {
        return res.status(400).json({ message: 'Cannot complete task with incomplete dependencies' });
      }
    }

    task.status = 'complete';
    await task.save();
    res.status(200).json({ message: 'Task completed', task });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task', error });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
