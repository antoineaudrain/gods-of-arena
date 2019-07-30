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
    
    input battle {
        type: Type!
        character: Character!
    }

    type ScheduledBattle {
        first: Type!
        second: Type!
        withAnimal: Boolean!
    }
    
    type Battle {
        first: Character!
        second: Character!
        animals: [Animal]!
    }
    
    type Query {
        oldestScheduledBattle: ScheduledBattle
        battles(page: Int, amount: Int): [Battle]
    }

    type Mutation {
        scheduleBattle(first: Type!, second: Type!, withAnimal: Boolean!): Boolean
        battle(first: battle!, second: battle!, animals: [Animal]!): Boolean
    }
`