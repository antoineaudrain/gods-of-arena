const {gql} = require('apollo-server');

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
        gladiatorOption: Option!
    }
    
    input animal {
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
        scheduledBattleQuantity: Int
        battles(page: Int, amount: Int): [Battle]
    }

    type Mutation {
        scheduleBattle(first: Type!, second: Type!, withAnimal: Boolean!): Boolean
        battle(first: battle!, second: battle!, animals: [animal]!): Boolean
    }
`

module.exports = typeDefs