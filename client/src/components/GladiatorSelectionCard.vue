<template>
  <div :class="'m-3 card ' + (isSelected() ? 'card-selected' : '')">
    <figure>
      <img :src="type.img" style="width:100%">
    </figure>

    <b-row class="justify-content-md-center m-3">
      <h4><b>{{type.name}}</b></h4>
    </b-row>

    <b-row class="card-separator"/>

    <b-col class="character-selection p-4">

      <b-form-select v-model="gladiator" :options="type.characters.map(e => e.name)" :disabled="isSelected()">
        <option slot="first" :value="null" disabled>-- Please select a gladiator --</option>
      </b-form-select>

      <b-col class="mt-4" v-if="gladiator === 'Maximus' || gladiator === 'Spartacus'">
        <b-form-group :disabled="isSelected()">
          <b-form-radio v-model="gladiatorOption" value="ONE">One Handed Sword</b-form-radio>
          <b-form-radio v-model="gladiatorOption" value="TWO">Two Handed Sword</b-form-radio>
        </b-form-group>
      </b-col>

    </b-col>

    <b-row style="position: absolute; bottom: 5rem;" class="card-separator"/>

    <b-row style="position: absolute; bottom: 0; margin: 1rem; width: 90%;">
      <b-button v-if="isSelected()" block disabled>Confirmed</b-button>
      <b-button v-else-if="(gladiator === 'Maximus' || gladiator === 'Spartacus') && gladiatorOption" block
                variant="success" @click="emitToParent(gladiatorOption)">Confirm
      </b-button>
      <b-button v-else-if="gladiator && gladiator !== 'Maximus' && gladiator !== 'Spartacus'" block variant="success"
                @click="emitToParent(null)">Confirm
      </b-button>
    </b-row>
  </div>
</template>


<script>
  export default {
    name: 'GladiatorCard',
    props: ['type', 'selected'],
    data() {
      return {
        gladiator: null,
        gladiatorOption: null,
      }
    },
    methods: {
      isSelected() {
        return this.selected.some(selected => selected.typeId === this.type.id)
      },
      emitToParent(gladiatorOption) {
        const gladiatorId = this.type.characters.find(obj => obj.name == this.gladiator).id
        const typeId = this.type.id
        this.$emit('cardToParent', {typeId, gladiatorId, gladiatorOption: gladiatorOption || 'NONE'})
        this.gladiator = null
      },
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
