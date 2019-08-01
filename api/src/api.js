const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema/schema')
const Mutation = require('./mutations')
const Query = require('./queries')

const resolvers = {
  Mutation,
  Query
}

const run = async () => {
  const server = new ApolloServer({typeDefs, resolvers});

  server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

run().catch(err => console.log(err))