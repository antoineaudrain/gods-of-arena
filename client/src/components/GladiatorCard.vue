<template>
    <div :class="'m-3 card ' + (confirmed ? 'card-selected' : '')">
        <figure>
            <img :src="type.img" style="width:100%">
        </figure>

        <div style="margin: 1rem; align-self: center;">
            <h4><b>{{type.name}}</b></h4>
        </div>

        <div class="card-separator"/>

        <b-card-text v-if="type.id === 'ANIMALS'" class="character-selection" style="padding: 1rem;">
            <b-form-select v-if="confirmed" disabled v-model="gladiator" :options="type.characters"></b-form-select>
            <b-form-select v-else v-model="gladiator" :options="type.characters.map(e => e.name)">
                <template slot="first">
                    <option :value="null" disabled>none</option>
                </template>
            </b-form-select>
        </b-card-text>

        <b-card-text v-else class="character-selection" style="padding: 1rem;">
            <b-form-select v-if="confirmed" disabled v-model="gladiator" :options="type.characters"></b-form-select>
            <b-form-select v-else v-model="gladiator" :options="type.characters.map(e => e.name)">
                <template slot="first">
                    <option :value="null" disabled>-- Please select a gladiator --</option>
                </template>
            </b-form-select>
        </b-card-text>

        <div style="position: absolute; bottom: 6rem;" class="card-separator"/>

<!--        <div style="margin-top: 1rem; align-self: center;" v-if="gladiator === 'Maximus' || gladiator === 'Spartacus'">-->
<!--            <b-button v-if="confirmed" disabled>Confirmed</b-button>-->
<!--            <div v-else class="row">-->
<!--                <b-button class="col" variant="success" @click="emitToParent('one handed')" style="padding: 0; margin-left: 1rem; margin-right: 1rem; min-width: 8rem; min-height: 2rem;">one-handed</b-button>-->
<!--                <b-button class="col" variant="success" @click="emitToParent('two handed')" style="padding: 0; margin-left: 1rem; margin-right: 1rem; min-width: 8rem; min-height: 2rem;">two-handed</b-button>-->
<!--            </div>-->
<!--        </div>-->

        <div style="position: absolute; bottom: 0; margin: 2rem; width: 80%;">
            <b-button v-if="confirmed" disabled>Confirmed</b-button>
            <b-button v-else-if="gladiator" block variant="success" @click="emitToParent(null)">Confirm</b-button>
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
        option: null,
        confirmed: false
      }
    },
    methods: {
      emitToParent (gladiatorOption) {
        this.confirmed = true
        const gladiatorId = this.type.characters.find(obj => obj.name == this.gladiator).id
        const typeId = this.type.id
        this.$emit('cardToParent', {typeId, gladiatorId, gladiatorOption})
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
