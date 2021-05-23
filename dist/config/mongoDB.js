"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-console */
// import { MongoMemoryServer } from 'mongodb-memory-server';
// async because getConnectionString returns a promise, but
// process.env.MONGODB_URI is just a string
async function getURI() {
  if (process.env.NODE_ENV === 'test') {
    // reference: https://github.com/nodkz/mongodb-memory-server#usage
    // const mongod = new MongoMemoryServer();
    // return mongod.getConnectionString();
    throw new Error('mongodb-memory-server has a security vulnerability');
  }

  return process.env.MONGODB_URI;
}

getURI().then(dbURI => {
  _mongoose.default.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const {
    connection
  } = _mongoose.default;
  connection.on('error', console.error.bind(console, 'MongoDB error:'));

  if (process.env.NODE_ENV !== 'test') {
    connection.once('open', () => console.log('Connected to database'));
  }
}).catch(console.error.bind(console, 'MongoDB connection error:'));