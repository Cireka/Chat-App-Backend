const users = [];

// Join user to chat
const userJoin = function (id, userName, room) {
  const user = { id, userName, room };
  users.push(user);
  return user;
};

// Get Current user

const getCurrentUser = function (id) {
  return users.find((user) => user.id === id);
};

module.exports = { getCurrentUser, userJoin };
