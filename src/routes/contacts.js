const asyncHandler = require('express-async-handler');
const ContactsController = require('../controllers/contacts');
const Router = require('./base');

Router.post('/contacts/create', asyncHandler(ContactsController.store));
Router.get('/contacts', asyncHandler(ContactsController.index));
Router.delete('/contacts', asyncHandler(ContactsController.destroy));
Router.put('/contacts', asyncHandler(ContactsController.update));
