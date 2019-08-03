<template>
  <div class="main">

    <div v-if="battles && battles[0]">
      <div style="margin-left: 5vw; margin-right: 5vw;">
        <h1 class="mt-4" style="font-size:2.5vw;">{{title}}</h1>
        <p style="font-size:1vw;">{{comment}}</p>
      </div>

      <transition-group name="slideLeft">
        <b-row class="justify-content-center" v-for="(battle, index) in battles" v-bind:key="battle">
          <VersusCard :first="battle.first" :second="battle.second" :animals="battle.animals"/>
        </b-row>
      </transition-group>
    </div>

    <b-row v-else class="justify-content-center" style="margin-top: 20vw;">
      <h1 style="color: lightgrey; font-size: 9vw;">No Scheduled Battle</h1>
    </b-row>

  </div>
</template>

<script>
  import {client, notifications} from "../mixins"
  import {VersusCard} from '../components/index'
  import 'vue2-animate/dist/vue2-animate.min.css'

  export default {
    name: 'home',

    mixins: [client, notifications],

    components: {
      VersusCard
    },

    async beforeMount() {
      const self = this
      self.battles = await self.getBattles()

      this.subscriptionNewBattle().subscribe({
        async next({data}) {
          self.battles.splice(0, 0, data.newBattle);
        },
        error(error) {
          console.error(error)
        },
      })
    },

    data() {
      return {
        battles: null,
        show: true,

        title: `Welcome to the Arena`,
        comment: `There is the scheduled battles chosen by the Ludus and the Emperor`,
      }
    },
  }
</script>