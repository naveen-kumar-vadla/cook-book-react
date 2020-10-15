const data = require('./data.json');

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
}

const serveRecipies = (req, res) => res.json(data);

const serveRecipe = (req, res) => {
  const id = Number(req.params.id);
  const recipe = data.find(recipe => recipe.id === id);
  res.json(recipe);
}

module.exports = {logger,serveRecipies,serveRecipe }