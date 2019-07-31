const {ApolloServer} = require('apollo-server');
const client = require("./db/postgres");
const typeDefs = require('./schema/schema')
const Mutation = require('./mutations')

const resolvers = {
  Mutation,

  Query: {
    /**
     *
     * @param _
     * @returns {{withAnimal: boolean, first: *, second: *}[]}
     */
    oldestScheduledBattle: async (_, {}) => {
      // check if lenght = 0
      let result = (await client.query(`SELECT first_type, second_type, with_animal FROM scheduled_battles ORDER BY date LIMIT 1;`)).rows[0]

      return {
        withAnimal: result['with_animal'],
        first: result['first_type'],
        second: result['second_type']
      }
    },

    /**
     *
     * @param _
     * @returns {Promise<{count: *}>}
     */
    scheduledBattleQuantity: async (_, {}) => {
      let result = (await client.query(`SELECT COUNT(*) FROM scheduled_battles;`)).rows[0]

      return result['count'] || null
    },

    /**
     *
     * @param _
     * @param page {Number}
     * @param amount {Number}
     */
    battles: (_, {page, amount}) => {

    }
  }
}


const run = async () => {
  const server = new ApolloServer({typeDefs, resolvers});

  server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}


run().catch(err => console.log(err))