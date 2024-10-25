const Team = require('../models/Team');
const User = require('../models/User');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const newTeam = new Team({ name, description, members });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
};

// Add member to team
exports.addMember = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const { userId } = req.body;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    team.members.push(userId);
    await team.save();
    res.status(200).json({ message: 'Member added', team });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error });
  }
};
