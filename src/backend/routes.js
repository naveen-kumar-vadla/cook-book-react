const express = require('express');
const app = express();

const handlers = require('./handlers');

app.use(handlers.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/recipies', handlers.serveRecipies);
app.get('/api/recipe/:id', handlers.serveRecipe);

module.exports = app;
