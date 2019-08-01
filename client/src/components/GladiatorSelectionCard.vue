<template>
  <div :class="'m-3 card ' + (confirmed ? 'card-selected' : '')">
    <figure>
      <img :src="type.img" style="width:100%">
    </figure>

    <b-row class="justify-content-md-center m-3">
      <h4><b>{{type.name}}</b></h4>
    </b-row>

    <b-row class="card-separator"/>

    <b-col class="character-selection p-4">

      <b-form-select v-model="gladiator" :options="type.characters.map(e => e.name)" :disabled="confirmed">
        <option slot="first" :value="null" disabled>-- Please select a gladiator --</option>
      </b-form-select>

      <b-col class="mt-4" v-if="gladiator === 'Maximus' || gladiator === 'Spartacus'">
        <b-form-group :disabled="confirmed">
          <b-form-radio v-model="option" value="ONE">One Handed Sword</b-form-radio>
          <b-form-radio v-model="option" value="TWO">Two Handed Sword</b-form-radio>
        </b-form-group>
      </b-col>

    </b-col>

    <b-row style="position: absolute; bottom: 5rem;" class="card-separator"/>

    <b-row style="position: absolute; bottom: 0; margin: 1rem; width: 90%;">
      <b-button v-if="confirmed" block disabled>Confirmed</b-button>
      <b-button v-else-if="(gladiator === 'Maximus' || gladiator === 'Spartacus') && option" block
                variant="success" @click="emitToParent(option)">Confirm
      </b-button>
      <b-button v-else-if="gladiator && gladiator !== 'Maximus' && gladiator !== 'Spartacus'" block variant="success"
                @click="emitToParent(null)">Confirm
      </b-button>
      <b-button v-else block disabled variant="success">Confirm
      </b-button>
    </b-row>
  </div>
</template>


<script>
  export default {
    name: 'GladiatorCard',

    props: ['type', 'selected'],

    async beforeMount() {
      const dataFromStorage = JSON.parse(localStorage.getItem(this.type.name))
      if (dataFromStorage && this.gladiator == null) {
        this.confirmed = dataFromStorage.confirmed
        this.gladiator = dataFromStorage.gladiator
        this.option = dataFromStorage.option
      }
    },

    data() {
      return {
        confirmed: this.selected.some(selected => selected.typeId === this.type.id),
        gladiator: null,
        option: null,
      }
    },

    watch: {
      confirmed() {
        this.updateLocalStorage()
      },
      gladiator() {
        this.updateLocalStorage()
      },
      option() {
        this.updateLocalStorage()
      },
    },

    methods: {
      updateLocalStorage() {
        localStorage.setItem(this.type.name, JSON.stringify({
          gladiator: this.gladiator,
          option: this.option,
          confirmed: this.confirmed
        }))
      },

      emitToParent(gladiatorOption) {
        this.confirmed = true
        const gladiatorId = this.type.characters.find(obj => obj.name === this.gladiator).id
        const typeId = this.type.id
        this.$emit('cardToParent', {typeId, gladiatorId, option: gladiatorOption || 'NONE'})
      },
    },

    mounted() {
      const self = this
      this.$root.$on('resetSelectionsCards', function () {
        self.confirmed = false
        self.gladiator = null
        self.option = null

        self.$forceUpdate()
      })
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
