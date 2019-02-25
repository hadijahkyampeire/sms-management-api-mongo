require('dotenv').config();
const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

const supertest = require('supertest');
const connection = require('./models/database');
const app = require('./app');

beforeEach(done => {
  jwt.verify.mockImplementation(() => true);
  jwt.decode.mockImplementation(() => {});
  connection.dropDatabase(done);
});

afterEach(() => {
  //clear the logged in user after every test
  jwt.decode.mockRestore();
});

global.authenticate = contact => {
  jwt.decode.mockImplementation(() => contact);
};

global.agent = supertest.agent(app).set({ Accept: 'application/json' });
