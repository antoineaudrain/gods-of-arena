<template>
  <div :class="'m-3 card ' + (isSelected() ? 'card-selected' : '')">
    <figure>
      <img :src="getAnimalsType().img" style="width:100%">
    </figure>

    <b-row class="justify-content-md-center m-3">
      <h4><b>{{getAnimalsType().name}}</b></h4>
    </b-row>

    <b-row class="card-separator"/>

    <b-col class="character-selection">

      <b-form inline class="justify-content-md-between m-2" v-for="(animal, index) in getAnimalsType().characters" :key="index">
        <label class="mr-sm-2">{{animal.name}}</label>
        <b-form-select :disabled="isSelected()"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       :value="null"
                       v-model="animals[animal.id]"
                       :options="{ '1': 'One', '2': 'Two', '3': 'Three' }"
                       id="inline-form-custom-select-pref"
        >
          <option slot="first" :value="null">Choose...</option>
        </b-form-select>
      </b-form>

    </b-col>

    <b-row style="position: absolute; bottom: 5rem;" class="card-separator"/>

    <b-row style="position: absolute; bottom: 0; margin: 1rem; width: 90%;">
      <b-button v-if="isSelected()" block disabled>Confirmed</b-button>
      <b-button v-else-if="animalHasQuantity()" block variant="success"
                @click="emitToParent()">Confirm
      </b-button>
    </b-row>
  </div>
</template>


<script>

  import {AnimalType} from "../types";

  export default {
    name: 'AnimalCard',
    props: ['selected'],
    data() {
      return {
        animals: AnimalType.characters.reduce((acc, animal) => {
          acc[animal.id] = null
          return acc
        }, {}),
      }
    },

    methods: {
      getAnimalsType() {
        return AnimalType
      },

      isSelected() {
        return this.selected.some(selected => selected.typeId === this.getAnimalsType().id)
      },

      animalHasQuantity() {
        return Object.values(this.animals).some(e => e !== null)
      },

      emitToParent() {
        let animals = Object.entries(this.animals).map(([id, quantity]) => ({
          animalId: id,
          animalQuantity: quantity ? +quantity : 0
        }))

        this.$emit('cardToParent', {typeId: 'ANIMALS', animals})
      }
    }
  }
</script>

<style scoped>
  .card {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    width: 20rem;
    height: 30rem;
    border-radius: 5px;
  }

  .card-separator {
    margin: 0;
    border-top: 1px solid lightgrey;
    width: 90%;
    align-self: center;
  }

  .card:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
  }

  .card-selected {
    box-shadow: 0 0 0 0.1rem rgba(94, 242, 16, 0.24) !important;
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

  p {
    margin: 1rem;
  }
</style>
