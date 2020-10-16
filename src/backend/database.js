const fs = require('fs');

const fetchRecipies = () => require('./data.json');
const storeRecipies = recipies =>
  fs.writeFileSync('./data.json', JSON.stringify(recipies));

const fetchUsers = () => require('./users.json');
const storeUsers = users =>
  fs.writeFileSync('./users.json', JSON.stringify(users));

const fetchRecipe = id => fetchRecipies().find(recipe => recipe.id === id);

const fetchUser = (fieldToMatch, value) => {
  const users = fetchUsers();
  const user = users.find(user => user[fieldToMatch] === value);
  return user ? user : {};
};

const saveUser = ({ name, login: username, avatar_url: imageUrl }) => {
  const id = new Date().getTime() * Math.round(Math.random() + 1);
  const user = { username, name, imageUrl, id, collection: [] };
  const users = fetchUsers();
  users.push(user);
  storeUsers(users);
  return user;
};

const fetchUserRecipies = userId => {
  const recipies = fetchRecipies();
  return recipies.filter(recipe => recipe.userId === userId);
};

module.exports = {
  fetchRecipies,
  fetchUser,
  fetchRecipe,
  fetchUsers,
  saveUser,
  fetchUserRecipies,
};
