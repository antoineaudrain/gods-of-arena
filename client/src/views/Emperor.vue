<template>
    <div class="home">

        <h1 class="mt-4">Select 2 characters</h1>
        <p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by
            the ludus.</p>

        <!--        <b-container fluid>-->
        <!--            <b-row>-->
        <!--                <b-col cols="8">-->
        <!--                    <div id="listgroup-ex" style="position:relative; overflow-y:auto; height:300px">-->
        <!--                        <b-card v-for="(type, index) in types" :key="index"-->
        <!--                                :title="type.name"-->
        <!--                                :img-src="type.img"-->
        <!--                                img-alt="Image"-->
        <!--                                img-top-->
        <!--                                tag="article"-->
        <!--                                :class="'m-3 card-default ' + (selected[type.name] ? 'card-selected' : '')"-->
        <!--                        >-->

        <!--                            <em slot="footer">-->
        <!--                                <b-button v-if="selected[type.name]" variant="success" @click="unselectType(type.name)">Selected</b-button>-->
        <!--                                <b-button v-else variant="primary" @click="selectType(type.name)">Select</b-button>-->
        <!--                            </em>-->

        <!--                        </b-card>-->
        <!--                    </div>-->
        <!--                </b-col>-->
        <!--            </b-row>-->
        <!--        </b-container>-->

        <b-row align-h="center">
            <div class="m-3 card" v-for="(type, index) in types" :key="index">
                <figure>
                    <img :src="type.img" style="width:100%">
                </figure>

                <div class="container m-2">
                    <h4><b>{{type.name}}</b></h4>
                </div>

                <b-card-text style="border-top: 1px solid lightgrey; padding-top: 20px; width: 90%; align-self: center"/>

                <b-card-text style="align-self: center; padding-left: 3rem; padding-right: 3rem; padding-bottom: 3rem;">
                    <b-form-select v-model="selected" :options="type.group === 'swordsmen' ? swordsmen : (type.group === 'bowmen' ? bowmen : animal)"></b-form-select>
                </b-card-text>

                <div class="container m-2" style="bottom: 0">
                    <b-button variant="success">Selected</b-button>
                </div>
            </div>
        </b-row>

    </div>
</template>

<script>
  export default {
    name: 'emperor',

    data() {
      return {
        selected: {},

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
          },
          {
            name: 'Animal',
            group: 'animal',
            img: 'https://i.ibb.co/5K0bHRf/Animal.jpg'
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

        animal: [
          {
            text: 'Black Sheep',
          },
          {
            text: 'Tiger',
          },
          {
            text: 'Lion',
          }
        ],

      }
    },
  }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 25%;
        height: 40rem;
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
