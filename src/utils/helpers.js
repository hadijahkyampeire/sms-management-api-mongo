const get = require('lodash/get');
const pick = require('lodash/pick');
const pickBy = require('lodash/pickBy');
/**
 * Extracts a given environment variable
 * @param  {String} key
 * @param  {Mixed} defaultValue
 * @return {Mixed}
 */
const env = (key, defaultValue) => get(process.env, key, defaultValue);

/**
 * Extracts the given keys from an object
 * @param  {Object} data
 * @param  {Array} keys
 * @return {Object|null}
 */
const objectOnly = (data, keys) => pick(data, keys);

/**
 * Gets all items from the object except the given keys
 * @param  {object} data
 * @param  {Array} keys
 * @return {Object}
 */
const objectExcept = (data, keys) => pickBy(data, (value, key) => !keys.includes(key));

module.exports = { env, objectOnly, objectExcept };
