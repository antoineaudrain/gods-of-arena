<template>
    <div class="home">

        <b-modal id="bonus-confirmation" title="Want to add Animal?">
            <b-img rounded src="https://i.ibb.co/5K0bHRf/Animal.jpg" fluid alt="Responsive image"></b-img>

            <!--            <div class="d-block text-center">-->
            <!--                <h3>You can add animals to the arena to spice things up!</h3>-->
            <!--            </div>-->

            <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
                <b-button size="sm" variant="success" @click="validate(true)">
                    OK
                </b-button>
                <b-button size="sm" variant="danger" @click="validate()">
                    Cancel
                </b-button>
                <!-- Button with custom close trigger value -->
                <b-button size="sm" variant="outline-secondary" @click="$bvModal.hide('bonus-confirmation')">
                    Forget it
                </b-button>
            </template>

        </b-modal>

        <h1 class="mt-4">Select 2 types of gladiators</h1>

        <b-row align-h="center">

            <div :class="'m-3 card ' + (selected[type.name] ? 'card-selected' : '')" v-for="(type, index) in types" :key="index">
                <figure>
                    <img :src="type.img" style="width:100%">
                </figure>
                <div class="container m-2">
                    <h4><b>{{type.name}}</b></h4>
                    <b-button v-if="selected[type.name]" variant="success" @click="unselectType(type.name)">Selected</b-button>
                    <b-button v-else-if="numberOfSelected() === 2" disabled>Select</b-button>
                    <b-button v-else variant="primary" @click="selectType(type.name)">Select</b-button>
                </div>
            </div>

        </b-row>

        <b-button v-if="numberOfSelected() === 2" v-b-modal.bonus-confirmation block variant="success">Confirm
        </b-button>

    </div>
</template>

<script>
  import { ModalAnimal } from '../components/index'

  export default {
    name: 'ludus',

    data() {
      return {
        selected: {},

        types: [
          {
            name: 'Swordsman',
            img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg'
          },
          {
            name: 'Spearman',
            img: 'https://i.ibb.co/QYF18qs/Lancier.jpg'
          },
          {
            name: 'Horseman',
            img: 'https://i.ibb.co/phCRZ9n/Cavalier.jpg'
          },
          {
            name: 'Bowman',
            img: 'https://i.ibb.co/MsMnvnd/Archer.jpg'
          },
        ],
      }
    },

    components: {
      ModalAnimal,
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

      },
    },
  }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 40%;
        border-radius: 5px;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .card-selected {
        box-shadow: 0 0 0 0.1rem rgba(94, 242, 16, 0.24) !important;
    }

    figure{
        height:175px;
        overflow:hidden;
        margin:0;
    }

    figure img{
        display:block;
        border-radius: 5px 5px 0 0;
        width:100%;
    }
    .container {
        padding: 2px 16px;
        text-align: center;
    }
</style>
