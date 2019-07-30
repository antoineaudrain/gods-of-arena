<template>
    <div class="main">

        <div style="margin-left: 8rem; margin-right: 8rem;">
            <h1 class="mt-4">{{title}}</h1>
            <p>{{comment}}</p>
        </div>

        <div class="row" v-if="oldestScheduledBattle">

            <b-container class="col-8">
                <b-row align-h="center">
                    <GladiatorCard :type="types[oldestScheduledBattle.first]" @cardToParent="onCardClick"/>
                    <GladiatorCard :type="types[oldestScheduledBattle.second]" @cardToParent="onCardClick"/>
                    <GladiatorCard v-if="oldestScheduledBattle.withAnimal" :type="animalType"/>
                </b-row>
            </b-container>

        </div>

        <div v-else style="margin-left: 8rem; margin-right: 8rem; margin-top: 15rem;">
            <h1 style="color: lightgrey; font-size: 9rem;">No Scheduled Battle</h1>
        </div>

        <div class="separator"/>
    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import {Types, AnimalType} from '../types'
  import {GladiatorCard} from '../components/index'

  export default {
    name: 'emperor',
    components: {
      GladiatorCard
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
      onCardClick (value) {
        this.battle = [...this.battle, value]
        console.log(this.battle)
      }
    }
  }
</script>
