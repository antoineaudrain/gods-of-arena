<template>
    <div class="home">

        <h1>This is an about page</h1>

        <b-container fluid>
            <b-row>
                <b-col cols="8">
                    <div id="listgroup-ex" style="position:relative; overflow-y:auto; height:300px">
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
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <b-row class="m-4 mt-5" align-h="center">

            <b-card v-for="(type, index) in types" :key="index"
                    :title="type.name"
                    :img-src="type.img"
                    img-alt="Image"
                    img-top
                    tag="article"
                    :class="'m-3 card-default ' + (selected[type.name] ? 'card-selected' : '')"
            >
                <b-card-text style="border-top: 2px solid lightgrey; padding-top: 20px;">
                    <b-form-radio-group
                            v-model="selected"
                            :options="type.group === 'swordsmen' ? swordsmen : bowmen"
                            plain
                            stacked
                    ></b-form-radio-group>
                </b-card-text>

                <em slot="footer">
                    <b-button v-if="selected[type.name]" variant="success" @click="unselectType(type.name)">Selected</b-button>
                    <b-button v-else variant="primary" @click="selectType(type.name)">Select</b-button>
                </em>

            </b-card>
        </b-row>

    </div>
</template>

<script>
  export default {
    name: 'emperor',

    data() {
      return {
        selected: {},

        text: `
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.
        `,

        types: [
          {
            name: 'Swordsman',
            group: 'swordsmen',
            img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg'
          },
          {
            name: 'Bowman',
            group: 'bowmen',
            img: 'https://i.ibb.co/MsMnvnd/Archer.jpg'
          }
        ],

        swordsmen: [
          {
            text: 'Maximus',
          },
          {
            text: 'Spartacus',
          },
          {
            text: 'Priscus',
          },
          {
            text: 'Puollux',
          },
        ],

        bowmen: [
          {
            text: 'Commodus',
          },
          {
            text: 'Flamma',
          },
        ],

      }
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
