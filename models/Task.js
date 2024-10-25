const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['incomplete', 'complete'], default: 'incomplete' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
