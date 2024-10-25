const express = require('express');
const router = express.Router();

// Example Task Data (Replace this with actual database interaction logic)
let tasks = [
  { id: 1, title: 'Task 1', description: 'First task', priority: 'high', completed: false },
  { id: 2, title: 'Task 2', description: 'Second task', priority: 'medium', completed: false }
];

// Get all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// Get a specific task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Create a new task
router.post('/', (req, res) => {
  const { title, description, priority } = req.body;
  const newTask = { id: tasks.length + 1, title, description, priority, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an existing task
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const { title, description, priority, completed } = req.body;
  task.title = title || task.title;
  task.description = description || task.description;
  task.priority = priority || task.priority;
  task.completed = completed !== undefined ? completed : task.completed;

  res.json(task);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
