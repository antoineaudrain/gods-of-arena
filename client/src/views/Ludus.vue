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

        <h1 class="m-2">Select 2 types of gladiators</h1>

        <b-row class="m-4 mt-5" align-h="center">

            <b-card v-for="(type, index) in types" :key="index"
                    :title="type.name"
                    :img-src="type.img"
                    img-alt="Image"
                    img-top
                    tag="article"
                    :class="'m-3 card-default ' + (selected[type.name] ? 'card-selected' : '')"
            >
                <em slot="footer">
                    <b-button v-if="selected[type.name]" variant="success" @click="unselectType(type.name)">Selected</b-button>
                    <b-button v-else variant="primary" @click="selectType(type.name)">Select</b-button>
                </em>

            </b-card>
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
    .card-default {
        max-width: 20rem;
        min-width: 30rem;
        text-align: center;
    }

    .card-selected {
        box-shadow: 0 0 0 0.1rem rgba(94, 242, 16, 0.24);
    }
</style>
