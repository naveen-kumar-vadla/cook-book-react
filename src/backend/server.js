const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(7000, () => console.log('listening on 7000 ....'));
