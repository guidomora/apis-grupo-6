let users = [1,2,3,4]; // temporal

exports.getAllUsers = () => {
  return users;
};

exports.getUserById = (id) => {
  return users.find(user => user.id === id);
};

exports.createUser = (userData) => {
  const newUser = { id: String(Date.now()), ...userData };
  users.push(newUser);
  return newUser;
};
