import gql from 'graphql-tag'

const client = {
  methods: {
    async getOldestScheduledBattle() {
      try {
        return (await this.$apollo.query({
          query: gql`
              query {
                  oldestScheduledBattle{
                      id
                      withAnimal
                      first
                      second
                  }
              }`,
          variables: {},
        })).data.oldestScheduledBattle
      } catch (e) {
        console.log(`[error] graphql query oldestScheduledBattle ${e}`)
        return undefined
      }
    },

    async getBattles() {
      try {
        return (await this.$apollo.query({
          query: gql`
              query {
                  battles {
                      id
                      first {
                          gladiator
                          metadata {
                              sword
                          }
                      }
                      second {
                          gladiator
                          metadata {
                              sword
                          }
                      }
                      animals
                  }
              }
          `,
          variables: {},
        })).data.battles
      } catch (e) {
        console.log(`[error] graphql query getBattles ${e}`)
        return undefined
      }
    },

    async insertScheduledBattle(types, withAnimal) {
      let [first, second] = Object.keys(types).filter((k) => types[k])

      try {
        await this.$apollo.mutate({
          mutation: gql`mutation($first: Type!, $second: Type!, $withAnimal: Boolean!) {
              scheduleBattle(first: $first, second: $second, withAnimal: $withAnimal)
          }`,
          variables: {
            first,
            second,
            withAnimal
          },
        })
      } catch (e) {
        console.log(`[error] graphql query insertScheduledBattle ${e}`)
      }
    },

    async insertBattle(id, first, second, animals) {
      try {
        return this.$apollo.mutate({
          mutation: gql`mutation($id: String! $first: battle!, $second: battle!, $animals: [animal]!) {
              battle(id: $id, first: $first, second: $second, animals: $animals)
          }`,
          variables: {
            id,
            first,
            second,
            animals
          },
        })
      } catch (e) {
        console.log(`[error] graphql query insertBattle ${e}`)
      }
    },

    subscriptionScheduledBattleCount() {
      return this.$apollo.subscribe({
        query: gql`
            subscription{
                scheduledBattleCount
            }`
      })
    }
  }
}

export default client