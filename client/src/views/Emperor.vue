<template>
  <div class="main">

    <div v-if="oldestScheduledBattle">

      <div style="margin-left: 8rem; margin-right: 8rem;">
        <h1 class="mt-4">{{title}}</h1>
        <p>{{comment}}</p>
      </div>

      <b-row class="justify-content-md-center">
        <GladiatorSelectionCard :type="types[oldestScheduledBattle.first], selected"
                                @cardToParent="onCardConfirmed"/>
        <GladiatorSelectionCard :type="types[oldestScheduledBattle.second], selected"
                                @cardToParent="onCardConfirmed"/>
        <AnimalSelectionCard v-if="oldestScheduledBattle.withAnimal" :type="animalType, selected"
                             @cardToParent="onCardConfirmed"/>
      </b-row>

      <div class="separator"/>

      <b-row class="justify-content-md-center">
        <b-button v-if="selected.length === (oldestScheduledBattle.withAnimal ? 3 : 2)" variant="success"
                  @click="onBattleConfirmed">Confirm Selection
        </b-button>
      </b-row>

    </div>

    <b-row v-else class="justify-content-md-center" style="margin-top: 20rem;">
      <h1 style="color: lightgrey; font-size: 9rem;">No Scheduled Battle</h1>
    </b-row>
  </div>
</template>

<script>
  import {Types, AnimalType} from '../types'
  import {GladiatorSelectionCard, AnimalSelectionCard} from '../components/index'
  import {client, notifications} from "../mixins";

  export default {
    name: 'emperor',
    components: {
      GladiatorSelectionCard,
      AnimalSelectionCard
    },

    mixins: [client, notifications],

    async beforeMount() {
      this.oldestScheduledBattle = await this.getOldestScheduledBattle()
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

      async onBattleConfirmed() {

        try {
          const animals = this.oldestScheduledBattle.withAnimal
            ? this.selected.find(obj => obj.typeId === this.animalType.id).animals
            : AnimalType.characters.map(e => ({animalId: e.id, animalQuantity: 0}))

          const gladiators = this.selected.filter(obj => obj.typeId !== this.animalType.id);
          await this.insertBattle(this.oldestScheduledBattle.id, gladiators[0], gladiators[1], animals)
          this.selected = []
          this.oldestScheduledBattle = await this.getOldestScheduledBattle()
          this.notifications().success("Battle successfully set")
        } catch (e) {
          this.notifications().failure("Something wrong while configuring the battle")
        }
      }
    }
  }
</script>

<style scoped>
  .separator {
    border-top: 1px solid lightgrey;
    margin: 2rem 8rem;
  }
</style>
