const express = require('express');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');

const handlers = require('./handlers');
const { COOKIE_SECRET } = require('./config');

const app = express();

app.use(cookieParser(COOKIE_SECRET));
app.use(cookieEncrypter(COOKIE_SECRET));
app.use(handlers.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/recipies', handlers.serveRecipies);
app.get('/api/recipe/:id', handlers.serveRecipe);
app.get('/api/fetchUser', handlers.serveUser);
app.get('/api/signIn', handlers.authorizeUser);
app.get('/api/oauth-callback', handlers.loginUser);
module.exports = app;
