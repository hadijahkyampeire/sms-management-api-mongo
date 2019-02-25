const { validateAll, configure } = require('indicative');
const asyncHandler = require('express-async-handler');
require('./rules');
const defaultMessages = require('./messages');
const { objectOnly } = require('../../utils/helpers');

class ErrorFormatter {
  /**
   * Creates an instance of the Formatter class
   * @return {ErrorFormatter}
   */
  constructor() {
    this.errors = {};
  }

  /**
   * Adds the g given error to the available errors
   * @param {Error} error
   * @param {String} field
   */
  addError(error, field) {
    let message = error;

    if (error instanceof Error) {
      message = error.message;
    }

    if (!this.errors[field]) {
      this.errors[field] = [];
    }
    this.errors[field].push(message);
  }

  /**
   * Converts this class to a json response
   * @return {Object|null}
   */
  toJSON() {
    return Object.keys(this.errors).length ? this.errors : null;
  }
}
/**
 * Replaces the indicative formatter with our own formatter
 * @type {Function}
 */
configure({ FORMATTER: ErrorFormatter });

module.exports = asyncHandler(async (req, rules, messages = {}) => {
  const data = req.method === 'GET' ? req.query : req.body;
  try {
    const returnedData = await validateAll(data, rules, Object.assign(defaultMessages, messages));
    return objectOnly(returnedData, Object.keys(rules));
  } catch (errors) {
    const error = new Error('Validation failed');
    error.errors = errors;
    error.code = 422;
    throw error;
  }
});
