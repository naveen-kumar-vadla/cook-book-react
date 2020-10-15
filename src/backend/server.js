const express = require('express');

const data = require('./data.json');

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/recipies', (req, res) => res.json(data));
app.get('/api/recipe/:id', (req, res) => {
  const id = Number(req.params.id);
  const recipe = data.find(recipe => recipe.id === id);
  res.json(recipe);
});

app.listen(7000, () => console.log('listening on 7000 ....'));
