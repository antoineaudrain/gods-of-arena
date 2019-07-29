<template>
    <div class="main">

        <div style="margin-left: 8rem; margin-right: 8rem;">
            <h1 class="mt-4">{{title}}</h1>
            <p>{{comment}}</p>
        </div>

        <b-row align-h="center">
            <div :class="'m-3 card ' + (selected[type.id] ? 'card-selected' : '')" v-for="(type, index) in types"
                 :key="index">
                <figure>
                    <img :src="type.img">
                </figure>
                <div class="container m-2">
                    <h4><b>{{type.name}}</b></h4>
                    <b-button v-if="selected[type.id]" variant="success" @click="unselectType(type.id)">Selected
                    </b-button>
                    <b-button v-else-if="numberOfSelected() === 2" disabled>Select</b-button>
                    <b-button v-else variant="primary" @click="selectType(type.id)">Select</b-button>
                </div>
            </div>
        </b-row>

        <div class="separator"/>
        <b-row align-h="center">
            <div :class="'m-3 card ' + (option ? 'card-selected' : '')">
                <figure>
                    <img src="https://i.ibb.co/5K0bHRf/Animal.jpg">
                </figure>
                <div class="container m-2">
                    <h4><b>Animal</b></h4>
                    <b-button v-if="option" variant="success" @click="unselectOption()">Selected
                    </b-button>
                    <b-button v-else variant="primary" @click="selectOption()">Select</b-button>
                </div>
            </div>
        </b-row>
        <div class="separator"/>

        <b-row align-h="center mt-4">
            <b-button v-if="numberOfSelected() === 2" variant="success" @click="validate(option)">Confirm Selection
            </b-button>
        </b-row>

    </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'ludus',

    data() {
      return {
        selected: {},

        option: false,

        title: `Select 2 types of gladiators`,

        comment: `The Ludus have to choose two classes of opponents out of the 4 made available, Animals are optional.`,

        types: [
          {
            id: 'SWORDSMEN',
            name: 'Swordsmen',
            img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg'
          },
          {
            id: 'SPEARMEN',
            name: 'Spearmen',
            img: 'https://i.ibb.co/QYF18qs/Lancier.jpg'
          },
          {
            id: 'HORSEMEN',
            name: 'Horsemen',
            img: 'https://i.ibb.co/phCRZ9n/Cavalier.jpg'
          },
          {
            id: 'BOWMEN',
            name: 'Bowmen',
            img: 'https://i.ibb.co/MsMnvnd/Archer.jpg'
          },
        ],
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

      selectOption() {
        this.option = true
      },

      unselectOption() {
        this.option = false
      },

      numberOfSelected() {
        return Object.entries(this.selected).reduce((acc, [_, value]) => value ? acc + 1 : acc, 0)
      },

      insertTypes(types, withAnimal) {
        let [first, second] = Object.keys(types).filter((k) => types[k])

        return this.$apollo.mutate({
          mutation: gql`mutation($first: Type!, $second: Type!, $withAnimal: Boolean!) {
                                 ludusSelection(first: $first, second: $second, withAnimal: $withAnimal)
                                }`,
          variables: {
            first,
            second,
            withAnimal
          },
        });
      },

      validate(withAnimal = false) {
        this.insertTypes(this.selected, withAnimal).then(this.notifySuccess).catch(this.notifyFailure)
      },

      notifySuccess() {
        this.$bvToast.toast('Your selection has been send to the Emperor', {
          title: 'Success!',
          variant: 'success',
          solid: true
        })
      },

      notifyFailure() {
        this.$bvToast.toast('Something went wrong.', {
          title: 'Ooops!',
          variant: 'danger',
          solid: true
        })
      }
    }
  }
</script>

<style scoped>
    .card {
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        transition: 0.3s;
        width: 20rem;
        height: 15rem;
        border-radius: 5px;
    }

    .card:hover {
        box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
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

    .separator {
        border-top: 1px solid lightgrey;
        margin-left: 8rem;
        margin-right: 8rem;
        margin-top: 2rem;
        margin-bottom: 2rem
    }

    .container {
        padding: 2px 16px;
        text-align: center;
    }
</style>
