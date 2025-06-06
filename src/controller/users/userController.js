const userService = require('../../services/userService');

exports.getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

exports.getUserById = (req, res) => {
  const user = userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.createUser = (req, res) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json(newUser);
};
