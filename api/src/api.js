const {ApolloServer, gql} = require('apollo-server');
const client = require("./db/postgres");

const typeDefs = gql`
    enum Type {
        BOWMAN
        HORSEMAN
        SWORDMAN
        SPEARMAN
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
        inProgress(page: Int, amount: Int): [InProgress]
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
         * @param page {Number}
         * @param amount {Number}
         */
        inProgress: (_, {page, amount}) => {

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