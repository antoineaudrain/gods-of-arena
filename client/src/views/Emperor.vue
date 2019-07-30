<template>
    <div class="main">

        <div v-if="oldestScheduledBattle">

            <div class="row">
                <div style="margin-left: 8rem; margin-right: 8rem;">
                    <h1 class="mt-4">{{title}}</h1>
                    <p>{{comment}}</p>
                </div>

                <b-container class="col-8">
                    <b-row align-h="center">
                        <GladiatorSelectionCard :type="types[oldestScheduledBattle.first]" @cardToParent="onCardConfirmed"/>
                        <GladiatorSelectionCard :type="types[oldestScheduledBattle.second]" @cardToParent="onCardConfirmed"/>
                        <GladiatorSelectionCard v-if="oldestScheduledBattle.withAnimal" :type="animalType" @cardToParent="onCardConfirmed"/>
                    </b-row>
                </b-container>
            </div>

            <div class="separator"/>

            <b-row align-h="center mt-4">
                <b-button v-if="battle.length === (oldestScheduledBattle.withAnimal ? 5 : 3)" variant="success" @click="onBattleConfirmed">Confirm Selection</b-button>
            </b-row>

        </div>

        <div v-else style="margin-left: 8rem; margin-right: 8rem; margin-top: 20rem;">
            <h1 style="color: lightgrey; font-size: 9rem;">No Scheduled Battle</h1>
        </div>
    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import {Types, AnimalType} from '../types'
  import {GladiatorSelectionCard} from '../components/index'

  export default {
    name: 'emperor',
    components: {
      GladiatorSelectionCard
    },
    apollo: {
      oldestScheduledBattle: {
        query: gql`query {
          oldestScheduledBattle{
            withAnimal
            first
            second
          }
        }`,
        update: data => data.oldestScheduledBattle
      }
    },
    data() {
      return {
        oldestScheduledBattle: undefined,
        types: Types,
        animalType: AnimalType,

        battle: [],

        title: `Select 2 characters`,
        comment: `The Emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by
                the Ludus.`,
      }
    },
    methods: {
      onCardConfirmed (value) {
        this.battle = [...this.battle, value]
      },
      insertBattle(types, withAnimal) {
        let [first, second] = Object.keys(types).filter((k) => types[k])

        return this.$apollo.mutate({
          mutation: gql`mutation($first: Type!, $second: Type!, $withAnimal: Boolean!) {
                                 scheduleBattle(first: $first, second: $second, withAnimal: $withAnimal)
                                }`,
          variables: {
            first,
            second,
            withAnimal
          },
        });
      },
      onBattleConfirmed () {
        console.log('QUERY HERE')
      }
    }
  }
</script>

<style scoped>
    .separator {
        border-top: 1px solid lightgrey;
        margin-left: 8rem;
        margin-right: 8rem;
        margin-top: 2rem;
        margin-bottom: 2rem
    }
</style>
