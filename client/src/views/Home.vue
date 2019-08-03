<template>
  <div class="main">

    <div v-if="battles && battles[0]">
      <div style="margin-left: 5vw; margin-right: 5vw;">
        <h1 class="mt-4" style="font-size:2.5vw;">{{title}}</h1>
        <p style="font-size:1vw;">{{comment}}</p>
      </div>

      <b-row class="justify-content-center" v-for="(battle, index) in battles">
        <transition name="slide-fade" appear>
          <VersusCard :key="index" :first="battle.first" :second="battle.second" :animals="battle.animals"/>
        </transition>
      </b-row>
    </div>

    <b-row v-else class="justify-content-center" style="margin-top: 20vw;">
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
        show: true,

        title: `Welcome to the Arena`,
        comment: `There is the scheduled battles chosen by the Ludus and the Emperor`,
      }
    },
  }
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(-10vw);
    opacity: 0;
  }
</style>