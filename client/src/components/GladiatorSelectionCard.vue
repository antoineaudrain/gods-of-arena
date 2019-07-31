<template>
    <div :class="'m-3 card ' + (confirmed ? 'card-selected' : '')">
        <figure>
            <img :src="type.img" style="width:100%">
        </figure>

        <div style="margin: 1rem; align-self: center;">
            <h4><b>{{type.name}}</b></h4>
        </div>

        <div class="card-separator"/>

        <b-card-text v-if="type.id === 'ANIMALS'" class="character-selection">
            <b-form inline style="margin: 0.25rem; justify-content: space-between" v-for="(animal, index) in animals" :key="index">
                <label class="mr-sm-2">{{animal.name}}</label>
                <b-form-select  v-if="confirmed" disabled
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :value="null"
                        v-model="animal.quantity"
                        :options="{ '1': 'One', '2': 'Two', '3': 'Three' }"
                        id="inline-form-custom-select-pref"
                >
                    <option slot="first" :value="null">Choose...</option>
                </b-form-select>
                <b-form-select v-else
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :value="null"
                        v-model="animal.quantity"
                        :options="{ '1': 'One', '2': 'Two', '3': 'Three' }"
                        id="inline-form-custom-select-pref"
                >
                    <option slot="first" :value="null">Choose...</option>
                </b-form-select>
            </b-form>
        </b-card-text>

        <b-card-text v-else class="character-selection" style="padding: 1rem;">

            <b-form-select v-if="confirmed" disabled v-model="gladiator" :options="type.characters"></b-form-select>
            <b-form-select v-else v-model="gladiator" :options="type.characters.map(e => e.name)">
                    <option slot="first" :value="null" disabled>-- Please select a gladiator --</option>
            </b-form-select>

            <div style="margin-top: 1rem; align-self: center;" v-if="gladiator === 'Maximus' || gladiator === 'Spartacus'">
                <b-form-group v-if="confirmed" disabled >
                    <b-form-radio v-model="option" value="ONE">One Handed Sword</b-form-radio>
                    <b-form-radio v-model="option" value="TWO">Two Handed Sword</b-form-radio>
                </b-form-group>
                <b-form-group v-else>
                    <b-form-radio v-model="option" value="ONE">One Handed Sword</b-form-radio>
                    <b-form-radio v-model="option" value="TWO">Two Handed Sword</b-form-radio>
                </b-form-group>
            </div>

        </b-card-text>

        <div style="position: absolute; bottom: 5rem;" class="card-separator"/>

        <div style="position: absolute; bottom: 0; margin: 1rem; width: 90%;">
            <b-button v-if="confirmed" block disabled>Confirmed</b-button>
            <b-button v-else-if="(gladiator === 'Maximus' || gladiator === 'Spartacus') && option" block variant="success" @click="emitGladiatorToParent(option)">Confirm</b-button>
            <b-button v-else-if="gladiator && gladiator !== 'Maximus' && gladiator !== 'Spartacus'" block variant="success" @click="emitGladiatorToParent(null)">Confirm</b-button>
            <b-button v-else-if="type.id === 'ANIMALS' && animals.find(animal => animal.quantity !== null)" block variant="success" @click="emitAnimalsToParent()">Confirm</b-button>
        </div>
    </div>
</template>


<script>
  export default {
    name: 'GladiatorCard',
    props: ['type'],
    data() {
      return {
        gladiator: null,
        animals: [
          {id: 'BLACKSHEEP', name: 'Black Sheep', quantity: null},
          {id: 'TIGER', name: 'Tiger', quantity: null},
          {id: 'LION', name: 'Lion', quantity: null}
        ],
        option: null,
        confirmed: false
      }
    },
    methods: {
      emitGladiatorToParent (gladiatorOption) {
        this.confirmed = true
        const gladiatorId = this.type.characters.find(obj => obj.name == this.gladiator).id
        const typeId = this.type.id
        this.$emit('cardToParent', {typeId, gladiatorId, gladiatorOption})
      },
      emitAnimalsToParent (event) {
        this.confirmed = true
        let animalsArray =  []
        for (let animal of this.animals) {
          animalsArray = [...animalsArray, {typeId: 'ANIMALS', animalId: animal.id, animalQuantity: animal.quantity}]
        }
        this.$emit('cardToParent', animalsArray)
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
