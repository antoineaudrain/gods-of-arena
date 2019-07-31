const {ApolloServer, gql} = require('apollo-server');
const client = require("./db/postgres");

const typeDefs = gql`
    enum Type {
        BOWMEN
        HORSEMEN
        SWORDSMEN
        SPEARMEN
    }

    enum Gladiator {
        COMMODUS
        FLAMMA

        JEANCLAUDEDUS
        SPICULUS

        MAXIMUS
        SPARTACUS
        PRISCUS
        POLLUX

        GANICUS
        CRIXUS
    }

    enum Animal {
        BLACKSHEEP
        TIGER
        LION
    }
    
    enum Option {
        ONE
        TWO
    }
    
    input battle {
        typeId: Type!
        gladiatorId: Gladiator!
        gladiatorOption: Option!
    }
    
    input animal {
        typeId: String!
        animalId: Animal!
        animalQuantity: Int!
    }

    type ScheduledBattle {
        first: Type!
        second: Type!
        withAnimal: Boolean!
    }
    
    type Battle {
        first: Gladiator!
        second: Gladiator!
        animals: [Animal]!
    }
    
    type Query {
        oldestScheduledBattle: ScheduledBattle
        battles(page: Int, amount: Int): [Battle]
    }

    type Mutation {
        scheduleBattle(first: Type!, second: Type!, withAnimal: Boolean!): Boolean
        battle(first: battle!, second: battle!, animals: [animal]!): Boolean
    }
`

const resolvers = {
  Mutation: {
    /**
     * @param _
     * @param first {Number}
     * @param second {Number}
     * @param withAnimal {Number}
     * @return {Boolean}
     */
    scheduleBattle: (_, {first, second, withAnimal}) => {
      client.query(`
        INSERT INTO scheduled_battles (first_type, second_type, with_animal)
        VALUES($1, $2, $3);`,
        [first, second, withAnimal]).catch((err) => {
        console.log(err)
      })
      return true
    },

    /**
     * @param _
     * @param first {{type: Number, gladiator: Number}}
     * @param second {{type: Number, gladiator: Number}}
     * @param animals {Array}
     * @return {Boolean}
     */
    battle: (_, {first, second, animals}) => {
      client.query(`
        INSERT INTO battles (first_gladiator, second_gladiator, animals)
        VALUES($1, $2, $3::text[]);`,
        [first, second, animals]).catch((err) => {
        console.log(err)
      })
      return true
    },
  },

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