require('dotenv').config();
require('./models/database');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const authorizationMiddleware = require('./middleware/authorization');

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use(authorizationMiddleware);
app.use('/api/v1', routes);
app.use(errorHandler);

module.exports = app;
