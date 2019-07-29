<template>
    <div class="main">

        <div style="margin-left: 8rem; margin-right: 8rem;">
            <h1 class="mt-4">{{title}}</h1>
            <p>{{comment}}</p>
        </div>

        <div class="row">

            <!--            <b-container class="col" fluid>-->
            <!--                <div id="listgroup-ex" style="position:relative; overflow-y:auto; height: 75%">-->
            <!--                    <p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                        the ludus.</p>-->
            <!--                    <p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                        the ludus.</p>-->
            <!--                    <p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                        the ludus.</p><p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                    the ludus.</p>-->
            <!--                    <p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                        the ludus.</p>-->
            <!--                    <p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                        the ludus.</p>-->
            <!--                    <p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                        the ludus.</p><p>The emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by-->
            <!--                    the ludus.</p>-->
            <!--                </div>-->
            <!--            </b-container>-->

            <b-container class="col-8">
                <b-row align-h="center">
                    <div class="m-3 card" v-for="(type, index) in types" :key="index">
                        <figure>
                            <img :src="type.img" style="width:100%">
                        </figure>

                        <div style="padding: 1rem; align-self: center;">
                            <h4><b>{{type.name}}</b></h4>
                        </div>

                        <div class="card-separator"/>
                        <b-card-text class="character-selection" style="padding: 1rem; margin: 0;">
                            <p>Select a character</p>
                            <b-form-select v-model="selected" :options="type.characters"></b-form-select>
                        </b-card-text>

                        <div style="margin: 1rem; align-self: center;">
                            <b-button variant="success">Selected</b-button>
                        </div>
                    </div>
                </b-row>
            </b-container>

        </div>

    </div>
</template>

<script>
  export default {
    name: 'emperor',

    data() {
      return {
        selected: {},

        title: `Select 2 characters`,

        comment: `The Emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by
                the Ludus.`,

        types: [
          {
            name: 'Swordsmen',
            characters: ['Maximus', 'Spartacus', 'Priscus', 'Puollux'],
            img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg'
          },
          {
            name: 'Spearmen',
            characters: ['Ganicus', 'Crixus'],
            img: 'https://i.ibb.co/QYF18qs/Lancier.jpg'
          },
          // {
          //   name: 'Horsemen',
          //   characters: ['Jeanclaudedus', 'Spiculus'],
          //   img: 'https://i.ibb.co/phCRZ9n/Cavalier.jpg'
          // },
          // {
          //   name: 'Bowmen',
          //   characters: ['Commodus', 'Flamma'],
          //   img: 'https://i.ibb.co/MsMnvnd/Archer.jpg'
          // },
          // {
          //   name: 'Animals',
          //   characters: ['Black Sheep', 'Tiger', 'Lion'],
          //   img: 'https://i.ibb.co/5K0bHRf/Animal.jpg'
          // }
        ],

        method: {}
      }
    },
  }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
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

    .container {
        padding: 2px 16px;
        text-align: center;
    }

    .character-selection p {
        margin-top: 0;
    }
</style>
