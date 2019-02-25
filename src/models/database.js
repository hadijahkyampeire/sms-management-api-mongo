const mongoose = require('mongoose');
const { env } = require('../utils/helpers');
const dsn = env('NODE_ENV') === 'test' ? env('TEST_DATABASE_URL') : env('MONGO_URI');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

// connect to mongoose
mongoose.connect(dsn, { useNewUrlParser: true });

// database object
module.exports = mongoose.connection;
