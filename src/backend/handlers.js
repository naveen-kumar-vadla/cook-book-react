const data = require('./data.json');
const users = require('./users.json');

const getUser = (fieldToMatch, value) => {
  const user = users.find(user => user[fieldToMatch] === value);
  return user ? user : {};
};

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

const serveRecipies = (req, res) => res.json(data);

const serveUser = (req, res) => {
  const userId = 12345;
  const user = getUser('id', userId);
  res.json(user);
};

const serveRecipe = (req, res) => {
  const id = Number(req.params.id);
  const recipe = data.find(recipe => recipe.id === id);
  res.json(recipe);
};

module.exports = {
  logger,
  serveRecipies,
  serveRecipe,
  serveUser,
};
