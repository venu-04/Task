const express = require('express');
const router = express.Router();

// Example Team Data (Replace with actual database logic)
let teams = [
  { id: 1, name: 'Team Alpha', members: ['user1', 'user2'] },
  { id: 2, name: 'Team Beta', members: ['user3', 'user4'] }
];

// Get all teams
router.get('/', (req, res) => {
  res.json(teams);
});

// Get a specific team by ID
router.get('/:id', (req, res) => {
  const team = teams.find(t => t.id === parseInt(req.params.id));
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

// Create a new team
router.post('/', (req, res) => {
  const { name, members } = req.body;
  const newTeam = { id: teams.length + 1, name, members };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// Update a team
router.put('/:id', (req, res) => {
  const team = teams.find(t => t.id === parseInt(req.params.id));
  if (!team) return res.status(404).json({ message: 'Team not found' });

  const { name, members } = req.body;
  team.name = name || team.name;
  team.members = members || team.members;

  res.json(team);
});

// Delete a team
router.delete('/:id', (req, res) => {
  const teamIndex = teams.findIndex(t => t.id === parseInt(req.params.id));
  if (teamIndex === -1) return res.status(404).json({ message: 'Team not found' });

  teams.splice(teamIndex, 1);
  res.json({ message: 'Team deleted' });
});

module.exports = router;
