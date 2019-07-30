<template>
    <div :class="'m-3 card ' + (confirmed ? 'card-selected' : '')">
        <figure>
            <img :src="type.img" style="width:100%">
        </figure>

        <div style="padding: 1rem; align-self: center;">
            <h4><b>{{type.name}}</b></h4>
        </div>

        <div class="card-separator"/>
        <div v-if="confirmed" style="padding: 1rem; align-self: center; margin-top: 2rem">
            <h4>{{selected}}</h4>
        </div>
        <b-card-text v-else class="character-selection" style="padding: 1rem; margin-top: 1rem;">
            <b-form-select v-model="selected" :options="type.characters">
                <template slot="first">
                    <option :value="null" disabled>-- Please select a gladiator --</option>
                </template>
            </b-form-select>
        </b-card-text>

        <div style="margin: 1rem; align-self: center;">
            <b-button v-if="confirmed" disabled>Confirmed</b-button>
            <b-button v-else-if="selected" variant="success" @click="emitToParent">Confirm</b-button>
            <b-button v-else disabled>Waiting ...</b-button>
        </div>
    </div>
</template>


<script>
  export default {
    name: 'EmperorCard',
    props: {
      type: Object
    },
    data() {
      return {
        selected: null,
        confirmed: false
      }
    },
    methods: {
      emitToParent (event) {
        this.confirmed = true
        this.$emit('cardToParent', this.selected)
      }
    }
  }
</script>

<style scoped>
    .card {
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        transition: 0.3s;
        width: 20rem;
        height: 27.5rem;
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
</style>
