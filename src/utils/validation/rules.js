const { validations } = require('indicative');

const countModels = async (data, field, message, args, get, determinant) => {
  const fieldValue = get(data, field);
  const model = args[0];
  const columnName = args[1] || field;
  if (!fieldValue) return Promise.resolve();
  try {
    const count = await model.countDocuments({ [columnName]: fieldValue });

    return determinant(count) ? Promise.resolve() : Promise.reject(message);
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * Adds a unique validation rule to available validation rules
 * @param  {Object} data
 * @param  {String} field
 * @param  {String} message
 * @param  {Array} args
 * @param  {Function} get
 * @return {Promise}
 */
validations.unique = (data, field, message, args, get) =>
  countModels(data, field, message, args, get, count => count === 0);

validations.exists = (data, field, message, args, get) =>
  countModels(data, field, message, args, get, count => count > 0);
