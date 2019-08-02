<template>
  <div class="m-3 card">
    <b-row>

      <b-col style="padding: 0 !important;"><img :src="getTypes(first.gladiator).img" style="width:100%"></b-col>
      <b-col style="padding: 0 !important;"><img :src="getTypes(second.gladiator).img" style="width:100%"></b-col>
      <b-col v-if="isAnimal()" style="padding: 0 !important;"><img :src="animalType.img" style="width:100%"></b-col>

      <div style="display: flex; flex-direction: row">
        <img :class="isAnimal() ? 'centered-left' : 'centered'" src="../../public/versusIcon.png" style="height: 50%; z-index: 1000">
        <img class="centered-right" v-if="isAnimal()" src="../../public/versusIcon.png" style="height: 50%; z-index: 1000">
      </div>

    </b-row>

    <div class="overlay">
      <div class="text-content">

        <div :class="isAnimal() ? 'text-with-animals' : 'text'" style="margin-top: 2vw">
          <b>{{getTypes(first.gladiator).characters.find(e => e.id === first.gladiator).name}}</b><br>
          <b style="font-size: 1vw" v-if="first.metadata.sword === 'ONE'">Option: One Handed Sword</b>
          <b style="font-size: 1vw" v-else-if="first.metadata.sword === 'TWO'">Option: Two Handed Sword</b>
        </div>
        <div :class="isAnimal() ? 'text-with-animals' : 'text'" style="margin-top: 2vw">
          <b>{{getTypes(second.gladiator).characters.find(e => e.id === second.gladiator).name}}</b><br>
          <b style="font-size: 1vw" v-if="second.metadata.sword === 'ONE'">Option: One Handed Sword</b>
          <b style="font-size: 1vw" v-else-if="second.metadata.sword === 'TWO'">Option: Two Handed Sword</b>
        </div>
        <div v-if="isAnimal()" class="text-with-animals">
          <b style="font-size: 1vw" v-if="animals[0] !== '0'">Black Sheep: {{animals[0]}}</b><br>
          <b style="font-size: 1vw" v-if="animals[1] !== '0'">Tiger: {{animals[1]}}</b><br>
          <b style="font-size: 1vw" v-if="animals[2] !== '0'">Lion: {{animals[2]}}</b><br>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
  import {AnimalType, Types} from "../types"

  export default {
    name: 'AnimalCard',

    props: ['first', 'second', 'animals'],

    data() {
      return {
        animalType: AnimalType
      }
    },

    methods: {
      getTypes(character) {
        const [_, gladiator] = Object.entries(Types).find(([_, g]) => {
          return g.characters.some(e => e.id === character)
        })
        return gladiator
      },

      isAnimal() {
        return this.animals.some(animalCount => animalCount > 0)
      }
    }
  }
</script>

<style scoped>
  .card {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    width: 50%;
    height: 9vw;
    overflow: hidden;
    border: none !important;
    border-radius: 5px;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: #000;
  }

  .card:hover .overlay {
    opacity: 0.75;
  }

  .text-content {
    display: flex;
    justify-content: space-around;
  }

  .text {
    width: 50%;
    text-align: center;
    color: white;
    font-size: 2vw;
  }

  .text-with-animals {
    width: 33.33%;
    text-align: center;
    color: white;
    font-size: 2vw;
  }

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .centered-left {
    position: absolute;
    top: 50%;
    left: 32.90%;
    transform: translate(-50%, -50%);
  }

  .centered-right {
    position: absolute;
    top: 50%;
    right: 26.80%;
    transform: translate(-50%, -50%);
  }

</style>
