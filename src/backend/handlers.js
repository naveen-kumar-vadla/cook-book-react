const database = require('./database');

const { HOMEPAGE_URL } = require('./config');

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

const serveRecipies = (req, res) => res.json(database.fetchRecipies());

const serveUser = (req, res) => {
  const userId = Number(req.cookies.userId);
  const user = database.fetchUser('id', userId);
  res.json(user);
};

const serveRecipe = (req, res) => {
  const id = Number(req.params.id);
  const recipe = database.fetchRecipe(id);
  res.json(recipe);
};

const authorizeUser = (req, res) => {
  const auth = req.app.locals.auth;
  res.redirect(auth.getAuthorizeUrl());
};

const loginUser = async (req, res) => {
  console.log('HOMEPAGE_URL', HOMEPAGE_URL);
  const { code, error } = req.query;
  if (error) return res.redirect(HOMEPAGE_URL);
  const { auth } = req.app.locals;
  const details = await auth.fetchUserDetails(code);
  let user = database.fetchUser('username', details.login);
  if (!user.id) user = database.saveUser(details);
  res.cookie('userId', user.id);
  return res.redirect(HOMEPAGE_URL);
};

module.exports = {
  logger,
  serveRecipies,
  serveRecipe,
  serveUser,
  authorizeUser,
  loginUser,
};
