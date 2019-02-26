const get = require('lodash/get');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contact');
const { env } = require('../utils/helpers');

const WhiteListedRoutes = ['/api/v1/authentication', '/api/v1/contacts/create'];

const shouldByPassRequest = req => WhiteListedRoutes.includes(req.path) || req.method === 'OPTIONS';

/**
 * Adds a filter to determine if a user is authenticated
 * @param  {Express.req}   req
 * @param  {Express.res}   res
 * @param  {Function} next
 * @return {Promise|null}
 */
module.exports = (req, res, next) => {
  if (shouldByPassRequest(req)) {
    return next();
  }
  const token = req.headers['authorization'];
 
  if (!token) return res.status(403).json({ error: 'No token provided.' });
  jwt.verify(token, env('SECRET'), async (err, decoded) => {
    if (req.headersSent) {
      return next(err);
    }
    if (err) return res.status(403).json({ error: 'Failed to authenticate token.' });
    // if everything is good, save to request for use in other routes
    const payload = get(jwt.decode(token), 'payload', {});

    const result = await Contact.findById(payload.contact_id);
    if (!result) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.currentContact = payload;
    return next();
  });
};
