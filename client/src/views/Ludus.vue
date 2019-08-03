<template>
  <div class="main">

    <div style="margin-left: 5vw; margin-right: 5vw;">
      <h1 class="mt-4" style="font-size:2.5vw;">{{title}}</h1>
      <p style="font-size:1vw;">{{comment}}</p>
    </div>

    <b-row class="justify-content-center">
      <div :class="'m-3 card ' + (selected[type.id] ? 'card-selected' : '')" v-for="(type, index) in getTypes()"
           :key="index">
        <figure>
          <img :src="type.img">
        </figure>
        <div class="container m-2">
          <h4><b>{{type.name}}</b></h4>
          <b-button v-if="selected[type.id]" variant="success" @click="unselectType(type.id)">Selected
          </b-button>
          <b-button v-else-if="numberOfSelected() === 2" disabled>Select</b-button>
          <b-button v-else variant="primary" @click="selectType(type.id)">Select</b-button>
        </div>
      </div>
    </b-row>

    <div class="separator"/>

    <b-row class="justify-content-center">
      <div
          :class="'m-3 card ' + (withAnimal ? 'card-selected' : '') + (numberOfSelected() !== 2 ? 'cancel-shadow' : '')">
        <figure>
          <img src="https://i.ibb.co/5K0bHRf/Animal.jpg">
        </figure>
        <div class="container m-2">
          <h4><b>Animals</b></h4>
          <b-button v-if="numberOfSelected() !== 2" disabled>Select</b-button>
          <b-button v-else-if="withAnimal" variant="success" @click="unselectWithAnimal()">Selected
          </b-button>
          <b-button v-else variant="primary" @click="selectWithAnimal()">Select</b-button>
        </div>
      </div>
    </b-row>

    <div class="separator"/>

    <b-row class="justify-content-center mt-4">
      <b-button v-if="numberOfSelected() === 2" variant="success" @click="onScheduledBattleConfirmed(withAnimal)">
        Confirm Selection
      </b-button>
    </b-row>

  </div>
</template>

<script>
  import {Types} from "../types"
  import {client, notifications} from "../mixins"

  export default {
    name: 'ludus',

    mixins: [client, notifications],

    data() {
      return {
        selected: {},
        withAnimal: false,

        title: `Select 2 types of gladiators`,
        comment: `The Ludus have to choose two classes of opponents out of the 4 made available, Animals are optionals.`,
      }
    },

    methods: {
      getTypes() {
        return Object.entries(Types).map(([_, type]) => type)
      },

      selectType(type) {
        if (this.numberOfSelected() < 2) {
          this.$set(this.selected, type, true)
        }
      },

      unselectType(type) {
        this.$set(this.selected, type, false)
      },

      selectWithAnimal() {
        this.withAnimal = true
      },

      unselectWithAnimal() {
        this.withAnimal = false
      },

      numberOfSelected() {
        return Object.entries(this.selected).reduce((acc, [_, value]) => value ? acc + 1 : acc, 0)
      },

      async onScheduledBattleConfirmed(withAnimal = false) {
        try {
          await this.insertScheduledBattle(this.selected, withAnimal)
          this.notifications().success('Your selection has been send to the Emperor')
          this.selected = {}
          this.withAnimal = false
        } catch (e) {
          this.notifications().failure('Something went wrong.')
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    width: 20rem;
    height: 15rem;
    border-radius: 5px;
  }

  .card:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
  }

  .card-selected {
    box-shadow: 0 0 0 0.1rem rgba(94, 242, 16, 0.24) !important;
  }

  .cancel-shadow {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  }

  #with-animal {
    box-shadow: 0 0 0 0.1rem rgba(94, 242, 16, 0.24);
  }

  figure {
    height: 10rem;
    overflow: hidden;
    margin: 0;
  }

  figure img {
    display: block;
    border-radius: 5px 5px 0 0;
    width: 100%;
  }

  .separator {
    border-top: 1px solid lightgrey;
    margin: 2rem 8rem;
  }

  .container {
    padding: 2px 16px;
    text-align: center;
  }
</style>
