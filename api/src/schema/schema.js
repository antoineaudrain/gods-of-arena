const {gql} = require('apollo-server')

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
        NONE
        ONE
        TWO
    }
    
    input battle {
        typeId: Type!
        gladiatorId: Gladiator!
        option: Option!
    }
    
    input animal {
        animalId: Animal!
        animalQuantity: Int!
    }

    type ScheduledBattle {
        id: String!
        first: Type!
        second: Type!
        withAnimal: Boolean!
    }
    
    type GladiatorMetadata {
        sword: String!
    }
    
    type GladiatorData {
        gladiator: Gladiator!
        metadata: GladiatorMetadata!
    }
    
    type Battle {
        id: String!
        first: GladiatorData!
        second: GladiatorData!
        animals: [Int]!
    }
    
    type Subscription {
      scheduledBattleCount: Int!
      newBattle: Battle!
    }
    
    type Query {
        oldestScheduledBattle: ScheduledBattle
        battles(page: Int, amount: Int): [Battle]
    }

    type Mutation {
        scheduleBattle(first: Type!, second: Type!, withAnimal: Boolean!): Boolean
        battle(id: String!, first: battle!, second: battle!, animals: [animal]!): Boolean
    }
`

module.exports = typeDefs