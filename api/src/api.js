const {ApolloServer, gql} = require('apollo-server');
const client = require("./db/postgres");
const {Types} = require("./types")

const typeDefs = gql`
    enum Type {
        BOWMEN
        HORSEMEN
        SWORDSMEN
        SPEARMEN
    }

    enum Character {
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
    
    input EmperorDecision {
        type: Type!
        character: Character!
    }

    type InProgress {
        first: Type!
        second: Type!
        withAnimal: Boolean!
    }
    
    type Arena {
        first: Character!
        second: Character!
        animals: [Animal]!
    }
    
    type Query {
        oldest: InProgress
        arenas(page: Int, amount: Int): [Arena]
    }

    type Mutation {
        ludusSelection(first: Type!, second: Type!, withAnimal: Boolean!): Boolean
        emperorDecision(first: EmperorDecision!, second: EmperorDecision!, animals: [Animal]!): Boolean
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
    ludusSelection: (_, {first, second, withAnimal}) => {
      client.query(`
        INSERT INTO types (first_type, second_type, with_animal)
        VALUES($1, $2, $3);`,
        [first, second, withAnimal]).catch((err) => {console.log(err)})
      return true
    },

    /**
     * @param _
     * @param first {{type: Number, character: Number}}
     * @param second {{type: Number, character: Number}}
     * @param animals {Array}
     * @return {Boolean}
     */
    emperorDecision: (_, {first, second, animals}) => {

    },
  },

  Query: {

    /**
     *
     * @param _
     * @returns {{withAnimal: boolean, first: *, second: *}[]}
     */
    oldest: async (_, {}) => {
      // check if lenght = 0
      let result = (await client.query(`SELECT first_type, second_type, with_animal FROM types ORDER BY date LIMIT 1;`)).rows[0]

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
    arenas: (_, {page, amount}) => {

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