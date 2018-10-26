import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

// setup Express app
const app = express(cors());
const port = process.env.PORT || 5000;
app.get('/', function(req, res){
  res.send('Chatfinity server running!');
});

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, (err, db) => {
  if(err) {
    throw err;
  }
  console.log('MongoDB connected.');
});


// setup GraphQL server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {};
    } else {
      const token = req.headers.authorization || '';
      return { token };
    }
  },
});
server.applyMiddleware({ app, path: '/graphql' });


// launch server
app.listen(port, () => {
  console.log('Starting server on port: ' + port);
});