const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roles: [{ userId: mongoose.Schema.Types.ObjectId, role: { type: String, enum: ['Owner', 'Admin', 'Member'] } }]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
