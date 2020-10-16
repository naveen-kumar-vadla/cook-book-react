const data = require('./data.json');
const users = require('./users.json');

const { HOMEPAGE_URL } = require('./config');

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
  const userId = Number(req.cookies.userId);
  const user = getUser('id', userId);
  res.json(user);
};

const serveRecipe = (req, res) => {
  const id = Number(req.params.id);
  const recipe = data.find(recipe => recipe.id === id);
  res.json(recipe);
};

const authorizeUser = function (request, response) {
  const auth = request.app.locals.auth;
  response.redirect(auth.getAuthorizeUrl());
};

const loginUser = async function (request, response) {
  console.log('HOMEPAGE_URL', HOMEPAGE_URL);
  const { code, error } = request.query;
  if (error) {
    return response.redirect(HOMEPAGE_URL);
  }
  const { auth } = request.app.locals;
  const details = await auth.fetchUserDetails(code);
  let user = getUser('username', details.login);
  if (!user.id) {
    const id = new Date().getTime() * Math.round(Math.random() + 1);
    user = {
      username: details.login,
      name: details.name,
      imageUrl: details.avatar_url,
      id,
    };
    users.push(user);
  }
  response.cookie('userId', user.id);
  return response.redirect(HOMEPAGE_URL);
};

module.exports = {
  logger,
  serveRecipies,
  serveRecipe,
  serveUser,
  authorizeUser,
  loginUser,
};
