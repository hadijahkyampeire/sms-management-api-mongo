const asyncHandler = require('express-async-handler');
const MessageController = require('../controllers/messages');
const Router = require('./base');

Router.get('/messages', asyncHandler(MessageController.index));
Router.get('/messages/:id', asyncHandler(MessageController.show));
Router.put('/messages/:id', asyncHandler(MessageController.update));
Router.post('/messages', asyncHandler(MessageController.store));
Router.delete('/messages/:id', asyncHandler(MessageController.destroy));

