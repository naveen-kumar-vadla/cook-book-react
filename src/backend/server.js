const axios = require('axios');
const Auth = require('./auth');

const { CLIENT_ID, CLIENT_SECRET, PORT } = require('./config');

const app = require('./routes');

app.locals.auth = new Auth(CLIENT_ID, CLIENT_SECRET, axios);
app.listen(PORT, () => process.stdout.write(`listening on ${PORT}\n`));