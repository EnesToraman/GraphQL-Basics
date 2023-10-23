const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

// Replace with your Mongo Atlas URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('You must provide a Mongo Atlas URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error)
  );

app.use(bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
