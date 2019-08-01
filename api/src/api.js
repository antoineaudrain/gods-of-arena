const http = require('http');
const express = require('express');
const {ApolloServer} = require('apollo-server')
const typeDefs = require('./schema/schema')
const Subscription = require('./subscriptions')
const Mutation = require('./mutations')
const Query = require('./queries')

const resolvers = {
  Subscription,
  Mutation,
  Query
}

const run = async () => {


  const server = new ApolloServer({typeDefs, resolvers});

  const app = express();
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

run().catch(err => console.log(err))