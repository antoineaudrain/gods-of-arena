<template>
  <div class="main">

    <div v-if="oldestScheduledBattle">
      <div style="margin-left: 5vw; margin-right: 5vw;">
        <h1 class="mt-4" style="font-size:2.5vw;">{{title}}</h1>
        <p style="font-size:1vw;">{{comment}}</p>
      </div>

      <b-row class="justify-content-md-center">
        <GladiatorSelectionCard :type="gladiatorTypes[oldestScheduledBattle.first]" :selected="selected"
                                @cardToParent="onCardConfirmed"/>
        <GladiatorSelectionCard :type="gladiatorTypes[oldestScheduledBattle.second]" :selected="selected"
                                @cardToParent="onCardConfirmed"/>
        <AnimalSelectionCard v-if="oldestScheduledBattle.withAnimal" :type="animalType" :selected="selected"
                             @cardToParent="onCardConfirmed"/>
      </b-row>

      <div class="separator"/>

      <b-row class="justify-content-md-center">
        <b-button v-if="selected.length === (oldestScheduledBattle.withAnimal ? 3 : 2)" variant="success"
                  @click="onBattleConfirmed">Confirm Selection
        </b-button>
      </b-row>
    </div>

    <b-row v-else class="justify-content-md-center" style="margin-top: 20vw;">
      <h1 style="color: lightgrey; font-size: 9vw;">No Scheduled Battle</h1>
    </b-row>

  </div>
</template>

<script>
  import {Types, AnimalType} from '../types'
  import {GladiatorSelectionCard, AnimalSelectionCard} from '../components/index'
  import {client, notifications} from "../mixins"

  export default {
    name: 'emperor',

    components: {
      GladiatorSelectionCard,
      AnimalSelectionCard
    },

    mixins: [client, notifications],

    async beforeMount() {
      this.oldestScheduledBattle = await this.getOldestScheduledBattle()
      const dataFromStorage = JSON.parse(localStorage.getItem('selected'))
      if (dataFromStorage) {
        this.selected = dataFromStorage
      }
    },

    async beforeUpdate() {
      localStorage.setItem('selected', JSON.stringify(this.selected))
    },

    data() {
      return {
        oldestScheduledBattle: undefined,
        gladiatorTypes: Types,
        animalType: AnimalType,

        selected: [],

        title: `Select 2 characters`,
        comment: `The Emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by
                the Ludus.`,
      }
    },

    methods: {
      onCardConfirmed(value) {
        delete value.confirmed
        this.selected = [...this.selected, value]
      },

      async onBattleConfirmed() {
        try {
          localStorage.clear()

          const animals = this.oldestScheduledBattle.withAnimal
            ? this.selected.find(obj => obj.typeId === this.animalType.id).animals
            : AnimalType.characters.map(e => ({animalId: e.id, animalQuantity: 0}))

          const gladiators = this.selected.filter(obj => obj.typeId !== this.animalType.id)

          await this.insertBattle(this.oldestScheduledBattle.id, gladiators[0], gladiators[1], animals)

          this.oldestScheduledBattle = await this.getOldestScheduledBattle()
          this.notifications().success("Battle successfully set")

          this.selected = []

          this.$root.$emit('resetSelectionsCards', {})

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
