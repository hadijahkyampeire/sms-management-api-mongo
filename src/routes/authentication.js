const asyncHandler = require('express-async-handler');
const Router = require('./base');
const AuthenticationController = require('../controllers/authentication');

Router.post('/authentication', asyncHandler(AuthenticationController.login));
