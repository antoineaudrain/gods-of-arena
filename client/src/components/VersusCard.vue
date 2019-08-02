<template>
  <div class="m-3 card">
    <b-row>
        <b-col style="padding: 0 !important;"><img :src="getTypes(first.gladiator).img" style="width:100%"></b-col>
        <b-col style="padding: 0 !important;"><img :src="getTypes(second.gladiator).img" style="width:100%"></b-col>
      <img class="centered" src="../../public/versusIcon.png" style="height: 50%; z-index: 1000">
    </b-row>
    <div class="overlay">
      <div class="text-content">
        <div class="text">
          <b>{{getTypes(first.gladiator).characters.find(e => e.id === first.gladiator).name}}</b><br>
          <b style="font-size: 1vw" v-if="first.metadata.sword === 'ONE'">Option: One Handed Sword</b>
          <b style="font-size: 1vw" v-else-if="first.metadata.sword === 'TWO'">Option: Two Handed Sword</b>
        </div>
        <div class="text">
          <b>{{getTypes(second.gladiator).characters.find(e => e.id === second.gladiator).name}}</b><br>
          <b style="font-size: 1vw" v-if="second.metadata.sword === 'ONE'">Option: One Handed Sword</b>
          <b style="font-size: 1vw" v-else-if="second.metadata.sword === 'TWO'">Option: Two Handed Sword</b>
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

    methods: {
      getTypes(character) {
        const [_,gladiator] = Object.entries(Types).find(([_, g]) => {
          return g.characters.some(e => e.id === character)
        })
        return gladiator
      },
    }
  }
</script>

<style scoped>
  .card {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    width: 50%;
    height: 100%;
    overflow: hidden;
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
    opacity: 0.5;
  }

  .text-content {
    margin: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    color: white;
    font-size: 2vw;
    z-index: auto;
  }

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
