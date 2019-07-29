<template>
    <div class="ludus">

        <b-modal id="bonus-confirmation" title="Do you want to add Animal(s)?" body-class="p-0">
            <b-img rounded src="https://i.ibb.co/5K0bHRf/Animal.jpg" fluid alt="Responsive image"></b-img>

            <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
                <b-button size="sm" variant="outline-secondary" @click="$bvModal.hide('bonus-confirmation')">
                    Cancel
                </b-button>
                <b-button size="sm" variant="outline-danger" @click="validate()">
                    NO
                </b-button>
                <b-button id="with-animal" size="sm" variant="success" @click="validate(true)">
                    YES
                </b-button>
            </template>

        </b-modal>

        <div style="margin-left: 8rem; margin-right: 8rem;">
            <h1 class="mt-4">Select 2 types of gladiators</h1>
            <p>The Ludus have to choose two classes of opponents out of the 4 made available.</p>
        </div>

        <b-row align-h="center">
            <div :class="'m-3 card ' + (selected[type.name] ? 'card-selected' : '')" v-for="(type, index) in types"
                 :key="index">
                <figure>
                    <img :src="type.img">
                </figure>
                <div class="container m-2">
                    <h4><b>{{type.name}}</b></h4>
                    <b-button v-if="selected[type.name]" variant="success" @click="unselectType(type.name)">Selected
                    </b-button>
                    <b-button v-else-if="numberOfSelected() === 2" disabled>Select</b-button>
                    <b-button v-else variant="primary" @click="selectType(type.name)">Select</b-button>
                </div>
            </div>
        </b-row>

        <div v-if="numberOfSelected() === 2" style="border-top: 1px solid lightgrey; margin-left: 8rem; margin-right: 8rem; margin-top: 2rem; margin-bottom: 2rem"/>

        <b-row align-h="center">
            <div v-if="numberOfSelected() === 2" :class="'m-3 card ' + (selected[option.name] ? 'card-selected' : '')"
                 :key="index">
                <figure>
                    <img :src="option.img">
                </figure>
                <div class="container m-2">
                    <h4><b>{{option.name}}</b></h4>
                    <b-button v-if="selected[option.name]" variant="success" @click="unselectType(option.name)">Selected
                    </b-button>
                    <b-button v-else variant="primary" @click="selectType(option.name)">Select</b-button>
                </div>
            </div>
        </b-row>

        <div v-if="numberOfSelected() === 2" style="border-top: 1px solid lightgrey; margin-left: 8rem; margin-right: 8rem; margin-top: 2rem; margin-bottom: 2rem"/>

        <b-row align-h="center mt-4">
            <b-button v-if="numberOfSelected() === 2" v-b-modal.bonus-confirmation variant="success">Confirm Selection
            </b-button>
        </b-row>

    </div>
</template>

<script>
  export default {
    name: 'ludus',

    data() {
      return {
        selected: {},

        types: [
          {
            name: 'Swordsmen',
            img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg'
          },
          {
            name: 'Spearmen',
            img: 'https://i.ibb.co/QYF18qs/Lancier.jpg'
          },
          {
            name: 'Horsemen',
            img: 'https://i.ibb.co/phCRZ9n/Cavalier.jpg'
          },
          {
            name: 'Bowmen',
            img: 'https://i.ibb.co/MsMnvnd/Archer.jpg'
          },
        ],

        option: {
          name: 'Animal',
          img: 'https://i.ibb.co/5K0bHRf/Animal.jpg'
        }
      }
    },

    methods: {
      selectType(type) {
        if (this.numberOfSelected() < 2) {
          this.$set(this.selected, type, true)
        }
      },

      unselectType(type) {
        this.$set(this.selected, type, false)
      },

      numberOfSelected() {
        return Object.entries(this.selected).reduce((acc, [_, value]) => value ? acc + 1 : acc, 0)
      },

      validate(withAnimal = false) {
        // handle insert emperor-queue query
      },
    },
  }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 20rem;
        height: 15rem;
        border-radius: 5px;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .card-selected {
        box-shadow: 0 0 0 0.1rem rgba(94, 242, 16, 0.24) !important;
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

    .container {
        padding: 2px 16px;
        text-align: center;
    }
</style>
