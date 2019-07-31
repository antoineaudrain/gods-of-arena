<template>
    <div class="main">

        <div v-if="oldestScheduledBattle">

            <div style="margin-left: 8rem; margin-right: 8rem;">
                <h1 class="mt-4">{{title}}</h1>
                <p>{{animalType}}</p>
                <p>{{selected}}</p>
            </div>

            <b-row class="justify-content-md-center">
                <GladiatorSelectionCard :type="types[oldestScheduledBattle.first], selected" @cardToParent="onCardConfirmed"/>
                <GladiatorSelectionCard :type="types[oldestScheduledBattle.second], selected" @cardToParent="onCardConfirmed"/>
                <AnimalSelectionCard v-if="oldestScheduledBattle.withAnimal" :type="animalType, selected" @cardToParent="onCardConfirmed"/>
            </b-row>

            <div class="separator"/>

            <b-row class="justify-content-md-center">
                <b-button v-if="selected.length === (oldestScheduledBattle.withAnimal ? 3 : 2)" variant="success"
                          @click="onBattleConfirmed">Confirm Selection
                </b-button>
            </b-row>

        </div>

        <b-row v-else style="margin-left: 8rem; margin-right: 8rem; margin-top: 20rem;">
            <h1 style="color: lightgrey; font-size: 9rem;">No Scheduled Battle</h1>
        </b-row>
    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import {Types, AnimalType} from '../types'
  import {GladiatorSelectionCard, AnimalSelectionCard} from '../components/index'

  export default {
    name: 'emperor',
    components: {
      GladiatorSelectionCard,
      AnimalSelectionCard
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

        selected: [],

        title: `Select 2 characters`,
        comment: `The Emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by
                the Ludus.`,
      }
    },
    methods: {
      onCardConfirmed(value) {
        this.selected = [...this.selected, value]
      },
      insertBattle(first, second, animals) {
        return this.$apollo.mutate({
          mutation: gql`mutation($first: battle!, $second: battle!, $animals: [animal]!) {
                                 battle(first: $first, second: $second, animals: $animals)
                                }`,
          variables: {
            first,
            second,
            animals
          },
        });
      },
      onBattleConfirmed() {
        const animals = this.selected.find(obj => obj.typeId == this.animalType.id).animalsArray
        const gladiators = this.selected.filter(obj => obj.typeId !== this.animalType.id);
        this.insertBattle(gladiators[0], gladiators[1], animals)
        this.selected = []
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
