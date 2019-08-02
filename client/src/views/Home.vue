<template>
  <div class="main">

    <div v-if="battles">
      <div style="margin-left: 8rem; margin-right: 8rem;">
        <h1 class="mt-4">{{title}}</h1>
        <p>{{comment}}</p>
      </div>

      <b-row class="justify-content-md-center">
        <VersusCard :first="battles[0].first" :second="battles[0].second"/>
<!--        <VersusCard/>-->
      </b-row>
<!--      {{battles}}-->
    </div>

    <b-row v-else class="justify-content-md-center" style="margin-top: 20rem;">
      <h1 style="color: lightgrey; font-size: 9rem;">No Scheduled Battle</h1>
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