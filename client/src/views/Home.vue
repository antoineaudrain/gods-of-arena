<template>
  <div class="main">

    <div v-if="battles">
      <div style="margin-left: 5vw; margin-right: 5vw;">
        <h1 class="mt-4" style="font-size:2.5vw;">{{title}}</h1>
        <p style="font-size:1vw;">{{comment}}</p>
      </div>

      <b-row class="justify-content-md-center" v-for="(battle, index) in battles">
        <VersusCard :key="index" :first="battle.first" :second="battle.second"/>
      </b-row>
    </div>

    <b-row v-else class="justify-content-md-center" style="margin-top: 20vw;">
      <h1 style="color: lightgrey; font-size: 9vw;">No Scheduled Battle</h1>
    </b-row>

  </div>
</template>

<script>
  import {client, notifications} from "../mixins"
  import {VersusCard} from '../components/index'

  export default {
    name: 'home',

    mixins: [client, notifications],

    components: {
      VersusCard
    },

    async beforeMount() {
      const self = this
      self.battles = await self.getBattles()

      this.subscriptionScheduledBattleCount().subscribe({
        async next(_) {
          self.battles = await self.getBattles()
        },
        error(error) {
          console.error(error)
        },
      })
    },

    data() {
      return {
        battles: null,

        title: `Welcome to the Arena`,
        comment: `There will be shown battles chosen by the Ludus and the Emperor`,
      }
    },
  }
</script>